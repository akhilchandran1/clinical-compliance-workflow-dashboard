<template>
  <AppLayout>
    <PageHeader title="Documents" subtitle="Manage document lifecycle, submissions, and review outcomes">
      <template #actions>
        <AppButton label="Create Document" :disabled="!canCreate" aria-label="Create document" @click="openCreateForm" />
      </template>
    </PageHeader>

    <AppCard>
      <DocumentFilters
        :filters="filters"
        :status-options="documentStatuses"
        :type-options="documentTypes"
        :study-options="studyOptions"
        @update="onFilterUpdate"
        @reset="resetFilters"
      />
    </AppCard>

    <div class="mt-4" v-if="filteredDocuments.length">
      <DocumentTable
        :documents="filteredDocuments"
        :studies="studyStore.studies"
        :role="roleStore.selectedRole"
        @edit="openEditForm"
        @submit="submit"
        @under-review="markUnderReview"
        @approve="approve"
        @open-reject="openReject"
      />
    </div>
    <EmptyState v-else title="No documents matched" description="Adjust filters to locate documents." />

    <AppModal :open="formModalOpen" :title="isEditing ? 'Edit Document' : 'Create New Document'" @close="closeForm">
      <DocumentForm
        :form="form"
        :errors="formErrors"
        :type-options="documentTypes"
        :study-options="studyOptions"
        :submit-label="isEditing ? 'Save Changes' : 'Create Document'"
        @update="updateForm"
        @submit="submitForm"
        @cancel="closeForm"
      />
    </AppModal>

    <DocumentReviewPanel
      :open="rejectDialogOpen"
      :comment="rejectComment"
      :error="rejectError"
      @update:comment="rejectComment = $event"
      @close="closeReject"
      @confirm="confirmReject"
    />
  </AppLayout>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'
import PageHeader from '../components/common/PageHeader.vue'
import AppButton from '../components/common/AppButton.vue'
import AppCard from '../components/common/AppCard.vue'
import AppModal from '../components/common/AppModal.vue'
import EmptyState from '../components/common/EmptyState.vue'
import DocumentFilters from '../components/documents/DocumentFilters.vue'
import DocumentTable from '../components/documents/DocumentTable.vue'
import DocumentForm from '../components/documents/DocumentForm.vue'
import DocumentReviewPanel from '../components/documents/DocumentReviewPanel.vue'
import { documentStatuses } from '../constants/statuses'
import { documentTypes } from '../constants/documentTypes'
import { useRoleStore } from '../stores/roleStore'
import { useStudyStore } from '../stores/studyStore'
import { useDocumentStore } from '../stores/documentStore'
import { useToast } from '../composables/useToast'
import { canCreateDocument, canEditDocument } from '../utils/workflowRules'

const roleStore = useRoleStore()
const studyStore = useStudyStore()
const documentStore = useDocumentStore()
const { showToast } = useToast()

const formModalOpen = ref(false)
const editingDocumentId = ref('')
const rejectDialogOpen = ref(false)
const rejectComment = ref('')
const rejectError = ref('')
const rejectTargetId = ref('')

const form = reactive({
  name: '',
  type: '',
  studyId: '',
  version: '',
  dueDate: '',
})
const formErrors = reactive({})

const filters = reactive({ search: '', status: '', type: '', studyId: '' })

const canCreate = computed(() => canCreateDocument(roleStore.selectedRole))
const isEditing = computed(() => Boolean(editingDocumentId.value))
const studyOptions = computed(() => studyStore.studies.map((study) => ({ label: study.title, value: study.id })))

const filteredDocuments = computed(() => {
  const records = [...documentStore.documents]
  const filtered = records.filter((doc) => {
    const haystack = `${doc.name} ${doc.type} ${doc.owner}`.toLowerCase()
    const matchesSearch = !filters.search || haystack.includes(filters.search.toLowerCase())
    const matchesStatus = !filters.status || doc.status === filters.status
    const matchesType = !filters.type || doc.type === filters.type
    const matchesStudy = !filters.studyId || doc.studyId === filters.studyId
    return matchesSearch && matchesStatus && matchesType && matchesStudy
  })

  return filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
})

function onFilterUpdate({ key, value }) {
  filters[key] = value
}

function resetFilters() {
  filters.search = ''
  filters.status = ''
  filters.type = ''
  filters.studyId = ''
}

function updateForm({ key, value }) {
  form[key] = value
}

function resetForm() {
  form.name = ''
  form.type = ''
  form.studyId = ''
  form.version = ''
  form.dueDate = ''
  editingDocumentId.value = ''
  Object.keys(formErrors).forEach((key) => delete formErrors[key])
}

function openCreateForm() {
  if (!canCreate.value) return
  resetForm()
  formModalOpen.value = true
}

function openEditForm(document) {
  if (!canEditDocument(roleStore.selectedRole, document.status)) {
    showToast({ type: 'error', title: 'Edit blocked', message: 'Only Draft or Rejected documents can be edited by this role.' })
    return
  }
  editingDocumentId.value = document.id
  form.name = document.name
  form.type = document.type
  form.studyId = document.studyId
  form.version = document.version
  form.dueDate = document.dueDate
  Object.keys(formErrors).forEach((key) => delete formErrors[key])
  formModalOpen.value = true
}

function closeForm() {
  formModalOpen.value = false
  resetForm()
}

function submitForm() {
  Object.keys(formErrors).forEach((key) => delete formErrors[key])
  const actor = `Demo ${roleStore.selectedRole}`
  const payload = {
    name: form.name,
    type: form.type,
    studyId: form.studyId,
    version: form.version,
    dueDate: form.dueDate,
  }
  const response = isEditing.value
    ? documentStore.editDocument(editingDocumentId.value, payload, roleStore.selectedRole, actor)
    : documentStore.createDocument(payload, roleStore.selectedRole, actor)

  if (!response.ok) {
    if (response.fieldErrors) Object.assign(formErrors, response.fieldErrors)
    showToast({
      type: 'error',
      title: isEditing.value ? 'Unable to save document' : 'Unable to create document',
      message: response.error,
    })
    return
  }

  const isUpdate = isEditing.value
  closeForm()
  showToast({
    type: 'success',
    title: isUpdate ? 'Document updated' : 'Document created',
    message: isUpdate ? `${response.document.id} changes saved.` : `${response.document.id} added as draft.`,
  })
}

function submit(documentId) {
  const response = documentStore.submitDocument(documentId, roleStore.selectedRole, `Demo ${roleStore.selectedRole}`)
  if (!response.ok) {
    showToast({ type: 'error', title: 'Submission blocked', message: response.error })
    return
  }
  showToast({ type: 'success', title: 'Submitted', message: `${response.document.name} submitted.` })
}

function markUnderReview(documentId) {
  const response = documentStore.markUnderReview(documentId, roleStore.selectedRole, `Demo ${roleStore.selectedRole}`)
  if (!response.ok) {
    showToast({ type: 'error', title: 'Review transition blocked', message: response.error })
    return
  }
  showToast({ type: 'success', title: 'Under review', message: `${response.document.name} moved to under review.` })
}

function approve(documentId) {
  const response = documentStore.approveDocument(documentId, roleStore.selectedRole, `Demo ${roleStore.selectedRole}`)
  if (!response.ok) {
    showToast({ type: 'error', title: 'Approval blocked', message: response.error })
    return
  }
  showToast({ type: 'success', title: 'Approved', message: `${response.document.name} approved.` })
}

function openReject(document) {
  rejectTargetId.value = document.id
  rejectComment.value = ''
  rejectError.value = ''
  rejectDialogOpen.value = true
}

function closeReject() {
  rejectDialogOpen.value = false
}

function confirmReject() {
  const response = documentStore.rejectDocument(rejectTargetId.value, rejectComment.value, roleStore.selectedRole, `Demo ${roleStore.selectedRole}`)
  if (!response.ok) {
    rejectError.value = response.error
    showToast({ type: 'error', title: 'Rejection blocked', message: response.error })
    return
  }
  rejectDialogOpen.value = false
  showToast({ type: 'success', title: 'Rejected', message: `${response.document.name} rejected with comment.` })
}
</script>
