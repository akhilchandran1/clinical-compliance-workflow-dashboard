<template>
  <AppLayout>
    <PageHeader title="Documents" subtitle="Manage document lifecycle, submissions, and review outcomes">
      <template #actions>
        <AppButton label="Create Document" :disabled="!canCreate" aria-label="Create document" @click="openCreate = true" />
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
        @submit="submit"
        @under-review="markUnderReview"
        @approve="approve"
        @open-reject="openReject"
      />
    </div>
    <EmptyState v-else title="No documents matched" description="Adjust filters to locate documents." />

    <AppModal :open="openCreate" title="Create New Document" @close="closeCreate">
      <DocumentForm
        :form="form"
        :errors="formErrors"
        :type-options="documentTypes"
        :study-options="studyOptions"
        @update="updateForm"
        @submit="createDocument"
        @cancel="closeCreate"
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
import { canCreateDocument } from '../utils/workflowRules'

const roleStore = useRoleStore()
const studyStore = useStudyStore()
const documentStore = useDocumentStore()
const { showToast } = useToast()

const openCreate = ref(false)
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

function closeCreate() {
  openCreate.value = false
}

function createDocument() {
  const response = documentStore.createDocument(form, roleStore.selectedRole, `Demo ${roleStore.selectedRole}`)
  Object.keys(formErrors).forEach((key) => delete formErrors[key])

  if (!response.ok) {
    if (response.fieldErrors) Object.assign(formErrors, response.fieldErrors)
    showToast({ type: 'error', title: 'Unable to create document', message: response.error })
    return
  }

  form.name = ''
  form.type = ''
  form.studyId = ''
  form.version = ''
  form.dueDate = ''
  openCreate.value = false
  showToast({ type: 'success', title: 'Document created', message: `${response.document.id} added as draft.` })
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
