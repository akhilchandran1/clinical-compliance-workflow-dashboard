<template>
  <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table class="min-w-full text-sm">
      <thead class="bg-slate-50">
        <tr>
          <th class="px-4 py-3 text-left">Document</th>
          <th class="px-4 py-3 text-left">Type</th>
          <th class="px-4 py-3 text-left">Study</th>
          <th class="px-4 py-3 text-left">Status</th>
          <th class="px-4 py-3 text-left">Due</th>
          <th class="px-4 py-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="document in documents" :key="document.id" class="border-t border-slate-100">
          <td class="px-4 py-3">{{ document.name }}</td>
          <td class="px-4 py-3">{{ document.type }}</td>
          <td class="px-4 py-3">{{ getStudyTitle(document.studyId) }}</td>
          <td class="px-4 py-3"><StatusBadge :value="document.status" /></td>
          <td class="px-4 py-3">{{ document.dueDate }}</td>
          <td class="px-4 py-3">
            <div class="flex flex-wrap gap-2">
              <AppButton label="Submit" variant="secondary" :disabled="!canSubmit(document)" @click="$emit('submit', document.id)" />
              <AppButton label="Review" variant="secondary" :disabled="!canReview(document)" @click="$emit('under-review', document.id)" />
              <AppButton label="Approve" :disabled="!canApprove(document)" @click="$emit('approve', document.id)" />
              <AppButton label="Reject" variant="danger" :disabled="!canReject(document)" @click="$emit('open-reject', document)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import AppButton from '../common/AppButton.vue'
import StatusBadge from '../common/StatusBadge.vue'
import { canApproveDocument, canMarkUnderReview, canRejectDocument, canSubmitDocument } from '../../utils/workflowRules'

const props = defineProps({
  documents: { type: Array, default: () => [] },
  studies: { type: Array, default: () => [] },
  role: { type: String, required: true },
})

defineEmits(['submit', 'under-review', 'approve', 'open-reject'])

const getStudyTitle = (studyId) => props.studies.find((study) => study.id === studyId)?.title || 'Unknown study'
const canSubmit = (document) => canSubmitDocument(props.role, document.status)
const canReview = (document) => canMarkUnderReview(props.role, document.status)
const canApprove = (document) => canApproveDocument(props.role, document.status)
const canReject = (document) => canRejectDocument(props.role, document.status)
</script>
