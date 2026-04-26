import { defineStore } from 'pinia'
import { loadOrSeed, saveToStorage } from '../composables/useLocalStorage'
import { seedDocuments } from '../data/seedDocuments'
import { storageKeys } from '../utils/storageKeys'
import { generateNextId } from '../utils/idGenerator'
import { validateDocument, validateRejectionComment } from '../utils/validators'
import {
  canApproveDocument,
  canEditDocument,
  canMarkUnderReview,
  canRejectDocument,
  canSubmitDocument,
  assertValidTransition,
} from '../utils/workflowRules'
import { useAuditStore } from './auditStore'

const isDocumentArray = (value) => Array.isArray(value)

export const useDocumentStore = defineStore('documentStore', {
  state: () => ({
    documents: loadOrSeed(storageKeys.documents, seedDocuments, isDocumentArray),
  }),
  getters: {
    getDocumentById: (state) => (id) => state.documents.find((document) => document.id === id),
    getDocumentsByStudyId: (state) => (studyId) => state.documents.filter((document) => document.studyId === studyId),
    reviewQueue: (state) => state.documents.filter((document) => ['Submitted', 'Under Review'].includes(document.status)),
  },
  actions: {
    persist() {
      saveToStorage(storageKeys.documents, this.documents)
    },
    replaceDocuments(documents = []) {
      this.documents = Array.isArray(documents) ? documents : []
      this.persist()
    },
    createDocument(payload, actorRole = 'Researcher', actor = 'Demo Researcher') {
      const validation = validateDocument(payload)
      if (!validation.isValid) {
        return { ok: false, error: 'Validation failed', fieldErrors: validation.errors }
      }

      const now = new Date().toISOString()
      const document = {
        id: generateNextId('DOC', this.documents),
        studyId: payload.studyId,
        name: payload.name.trim(),
        type: payload.type,
        version: payload.version.trim(),
        owner: actorRole,
        status: 'Draft',
        dueDate: payload.dueDate,
        lastUpdated: now,
        submittedAt: null,
        reviewedAt: null,
        reviewerComment: '',
        createdAt: now,
        updatedAt: now,
      }
      this.documents.push(document)
      this.persist()

      const auditStore = useAuditStore()
      auditStore.addLog({
        user: actor,
        role: actorRole,
        action: 'Created Document',
        entityType: 'Document',
        entityId: document.id,
        entityName: document.name,
        previousStatus: '',
        newStatus: 'Draft',
        comment: 'Draft created',
      })

      return { ok: true, document }
    },
    editDocument(documentId, changes, actorRole = 'Researcher', actor = 'Demo Researcher') {
      const index = this.documents.findIndex((document) => document.id === documentId)
      if (index === -1) return { ok: false, error: 'Document not found' }
      const current = this.documents[index]

      if (!canEditDocument(actorRole, current.status)) {
        return { ok: false, error: 'Invalid workflow transition for edit' }
      }

      const merged = { ...current, ...changes }
      const validation = validateDocument(merged)
      if (!validation.isValid) {
        return { ok: false, error: 'Validation failed', fieldErrors: validation.errors }
      }

      const now = new Date().toISOString()
      const updated = {
        ...current,
        ...changes,
        updatedAt: now,
        lastUpdated: now,
      }
      this.documents[index] = updated
      this.persist()

      const auditStore = useAuditStore()
      auditStore.addLog({
        user: actor,
        role: actorRole,
        action: 'Edited Document',
        entityType: 'Document',
        entityId: updated.id,
        entityName: updated.name,
        previousStatus: current.status,
        newStatus: updated.status,
        comment: 'Document metadata updated',
      })

      return { ok: true, document: updated }
    },
    submitDocument(documentId, actorRole = 'Researcher', actor = 'Demo Researcher') {
      const index = this.documents.findIndex((document) => document.id === documentId)
      if (index === -1) return { ok: false, error: 'Document not found' }
      const current = this.documents[index]

      if (!canSubmitDocument(actorRole, current.status) || !assertValidTransition(current.status, 'Submitted')) {
        return { ok: false, error: 'Invalid workflow transition for submit' }
      }

      const now = new Date().toISOString()
      const updated = {
        ...current,
        status: 'Submitted',
        submittedAt: now,
        updatedAt: now,
        lastUpdated: now,
      }
      this.documents[index] = updated
      this.persist()

      useAuditStore().addLog({
        user: actor,
        role: actorRole,
        action: 'Submitted Document',
        entityType: 'Document',
        entityId: updated.id,
        entityName: updated.name,
        previousStatus: current.status,
        newStatus: 'Submitted',
        comment: 'Submitted for review',
      })

      return { ok: true, document: updated }
    },
    markUnderReview(documentId, actorRole = 'Reviewer', actor = 'Demo Reviewer') {
      const index = this.documents.findIndex((document) => document.id === documentId)
      if (index === -1) return { ok: false, error: 'Document not found' }
      const current = this.documents[index]

      if (!canMarkUnderReview(actorRole, current.status) || !assertValidTransition(current.status, 'Under Review')) {
        return { ok: false, error: 'Invalid workflow transition for review start' }
      }

      const now = new Date().toISOString()
      const updated = {
        ...current,
        status: 'Under Review',
        updatedAt: now,
        lastUpdated: now,
      }
      this.documents[index] = updated
      this.persist()

      useAuditStore().addLog({
        user: actor,
        role: actorRole,
        action: 'Moved Document to Under Review',
        entityType: 'Document',
        entityId: updated.id,
        entityName: updated.name,
        previousStatus: current.status,
        newStatus: 'Under Review',
        comment: 'Review started',
      })

      return { ok: true, document: updated }
    },
    approveDocument(documentId, actorRole = 'Reviewer', actor = 'Demo Reviewer', comment = 'Approved after review') {
      const index = this.documents.findIndex((document) => document.id === documentId)
      if (index === -1) return { ok: false, error: 'Document not found' }
      const current = this.documents[index]

      if (!canApproveDocument(actorRole, current.status)) {
        return { ok: false, error: 'Invalid workflow transition for approval' }
      }

      const startStatus = current.status === 'Submitted' ? 'Under Review' : current.status
      if (startStatus !== current.status) {
        this.documents[index] = {
          ...current,
          status: 'Under Review',
        }
      }

      if (!assertValidTransition('Under Review', 'Approved')) {
        return { ok: false, error: 'Invalid workflow transition for approval' }
      }

      const now = new Date().toISOString()
      const updated = {
        ...this.documents[index],
        status: 'Approved',
        reviewedAt: now,
        reviewerComment: comment,
        updatedAt: now,
        lastUpdated: now,
      }
      this.documents[index] = updated
      this.persist()

      useAuditStore().addLog({
        user: actor,
        role: actorRole,
        action: 'Approved Document',
        entityType: 'Document',
        entityId: updated.id,
        entityName: updated.name,
        previousStatus: current.status,
        newStatus: 'Approved',
        comment,
      })

      return { ok: true, document: updated }
    },
    rejectDocument(documentId, comment, actorRole = 'Reviewer', actor = 'Demo Reviewer') {
      const validationError = validateRejectionComment(comment)
      if (validationError) return { ok: false, error: validationError }

      const index = this.documents.findIndex((document) => document.id === documentId)
      if (index === -1) return { ok: false, error: 'Document not found' }
      const current = this.documents[index]

      if (!canRejectDocument(actorRole, current.status)) {
        return { ok: false, error: 'Invalid workflow transition for rejection' }
      }

      const currentStatus = current.status === 'Submitted' ? 'Under Review' : current.status
      if (!assertValidTransition(currentStatus, 'Rejected')) {
        return { ok: false, error: 'Invalid workflow transition for rejection' }
      }

      const now = new Date().toISOString()
      const updated = {
        ...current,
        status: 'Rejected',
        reviewedAt: now,
        reviewerComment: comment.trim(),
        updatedAt: now,
        lastUpdated: now,
      }
      this.documents[index] = updated
      this.persist()

      useAuditStore().addLog({
        user: actor,
        role: actorRole,
        action: 'Rejected Document',
        entityType: 'Document',
        entityId: updated.id,
        entityName: updated.name,
        previousStatus: current.status,
        newStatus: 'Rejected',
        comment: comment.trim(),
      })

      return { ok: true, document: updated }
    },
  },
})
