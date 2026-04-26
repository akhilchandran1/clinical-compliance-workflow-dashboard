<template>
  <AppLayout>
    <PageHeader title="Review Queue" subtitle="Documents requiring reviewer or QA action" />
    <EmptyState v-if="queue.length === 0" title="Review queue is clear" description="No documents currently require reviewer action." />
    <DocumentTable
      v-else
      :documents="queue"
      :studies="studyStore.studies"
      :role="roleStore.selectedRole"
      @submit="noop"
      @under-review="markUnderReview"
      @approve="approve"
      @open-reject="openReject"
    />

    <DocumentReviewPanel
      :open="rejectOpen"
      :comment="rejectComment"
      :error="rejectError"
      @update:comment="rejectComment = $event"
      @close="rejectOpen = false"
      @confirm="reject"
    />
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'
import PageHeader from '../components/common/PageHeader.vue'
import EmptyState from '../components/common/EmptyState.vue'
import DocumentTable from '../components/documents/DocumentTable.vue'
import DocumentReviewPanel from '../components/documents/DocumentReviewPanel.vue'
import { useDocumentStore } from '../stores/documentStore'
import { useRoleStore } from '../stores/roleStore'
import { useStudyStore } from '../stores/studyStore'
import { useToast } from '../composables/useToast'

const documentStore = useDocumentStore()
const studyStore = useStudyStore()
const roleStore = useRoleStore()
const { showToast } = useToast()

const rejectOpen = ref(false)
const rejectComment = ref('')
const rejectError = ref('')
const targetId = ref('')

const queue = computed(() => documentStore.reviewQueue)

const noop = () => {}

function markUnderReview(documentId) {
  const response = documentStore.markUnderReview(documentId, roleStore.selectedRole, `Demo ${roleStore.selectedRole}`)
  if (!response.ok) {
    showToast({ type: 'error', title: 'Transition blocked', message: response.error })
    return
  }
  showToast({ type: 'success', title: 'Updated', message: `${response.document.id} moved to under review.` })
}

function approve(documentId) {
  const response = documentStore.approveDocument(documentId, roleStore.selectedRole, `Demo ${roleStore.selectedRole}`)
  if (!response.ok) {
    showToast({ type: 'error', title: 'Approval blocked', message: response.error })
    return
  }
  showToast({ type: 'success', title: 'Approved', message: `${response.document.id} approved.` })
}

function openReject(document) {
  targetId.value = document.id
  rejectComment.value = ''
  rejectError.value = ''
  rejectOpen.value = true
}

function reject() {
  const response = documentStore.rejectDocument(targetId.value, rejectComment.value, roleStore.selectedRole, `Demo ${roleStore.selectedRole}`)
  if (!response.ok) {
    rejectError.value = response.error
    return
  }
  rejectOpen.value = false
  showToast({ type: 'success', title: 'Rejected', message: `${response.document.id} rejected.` })
}
</script>
