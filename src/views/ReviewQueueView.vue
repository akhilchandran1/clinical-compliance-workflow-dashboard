<template>
  <AppLayout>
    <PageHeader title="Review Queue" subtitle="Documents requiring reviewer or QA action" />

    <AppCard>
      <div class="rounded-lg border border-blue-100 bg-blue-50 p-4">
        <p class="text-xs font-semibold uppercase tracking-wide text-blue-700">Current Permissions</p>
        <p class="mt-1 text-sm text-slate-700">{{ permissionSummary }}</p>
      </div>
    </AppCard>

    <div class="mt-4">
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
    </div>

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
import AppCard from '../components/common/AppCard.vue'
import EmptyState from '../components/common/EmptyState.vue'
import DocumentTable from '../components/documents/DocumentTable.vue'
import DocumentReviewPanel from '../components/documents/DocumentReviewPanel.vue'
import { roles } from '../constants/roles'
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
const permissionSummary = computed(() => {
  if (roleStore.selectedRole === roles.ADMIN) {
    return 'Can move documents to Under Review, approve, and reject all review-queue documents.'
  }
  if (roleStore.selectedRole === roles.REVIEWER) {
    return 'Can move Submitted documents to Under Review, then approve or reject review-queue documents.'
  }
  return 'Read-only in this queue. Reviewer or Admin role is required to process review actions.'
})

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
    showToast({ type: 'error', title: 'Rejection blocked', message: response.error })
    return
  }
  rejectOpen.value = false
  showToast({ type: 'success', title: 'Rejected', message: `${response.document.id} rejected.` })
}
</script>
