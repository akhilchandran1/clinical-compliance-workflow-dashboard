import { defineStore } from 'pinia'
import { loadOrSeed, saveToStorage } from '../composables/useLocalStorage'
import { seedAuditLogs } from '../data/seedAuditLogs'
import { generateNextId } from '../utils/idGenerator'
import { storageKeys } from '../utils/storageKeys'
import { toIsoDate } from '../utils/dateUtils'

const isAuditArray = (value) => Array.isArray(value)

export const useAuditStore = defineStore('auditStore', {
  state: () => ({
    logs: loadOrSeed(storageKeys.auditLogs, seedAuditLogs, isAuditArray),
  }),
  getters: {
    sortedLogs(state) {
      return [...state.logs].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    },
  },
  actions: {
    persist() {
      saveToStorage(storageKeys.auditLogs, this.logs)
    },
    addLog({
      user = 'System',
      role = 'Admin',
      action,
      entityType,
      entityId,
      entityName,
      previousStatus = '',
      newStatus = '',
      comment = '',
    }) {
      const next = {
        id: generateNextId('LOG', this.logs),
        timestamp: toIsoDate(),
        user,
        role,
        action,
        entityType,
        entityId,
        entityName,
        previousStatus,
        newStatus,
        comment,
      }
      this.logs.push(next)
      this.persist()
      return next
    },
    replaceLogs(logs = []) {
      this.logs = Array.isArray(logs) ? logs : []
      this.persist()
    },
  },
})
