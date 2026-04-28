<template>
  <div class="table-wrap">
    <table class="table-base min-w-[1080px]">
      <thead class="table-head">
        <tr>
          <th class="table-th">Document</th>
          <th class="table-th">Type</th>
          <th class="table-th">Study</th>
          <th class="table-th">Status</th>
          <th class="table-th">Due</th>
          <th class="table-th">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="document in documents" :key="document.id" class="border-t border-slate-100 odd:bg-white even:bg-slate-50/40 hover:bg-slate-50">
          <td class="table-td font-medium">{{ document.name }}</td>
          <td class="table-td">{{ document.type }}</td>
          <td class="table-td">{{ getStudyTitle(document.studyId) }}</td>
          <td class="table-td"><StatusBadge :value="document.status" /></td>
          <td class="table-td whitespace-nowrap">{{ document.dueDate }}</td>
          <td class="table-td">
            <div class="flex flex-wrap gap-2">
              <AppButton v-if="showEdit" label="Edit" variant="secondary" :disabled="!canEdit(document)" @click="$emit('edit', document)" />
              <AppButton v-if="showSubmit" label="Submit" variant="secondary" :disabled="!canSubmit(document)" @click="$emit('submit', document.id)" />
              <AppButton v-if="showReview" label="Review" variant="secondary" :disabled="!canReview(document)" @click="$emit('under-review', document.id)" />
              <AppButton v-if="showApprove" label="Approve" :disabled="!canApprove(document)" @click="$emit('approve', document.id)" />
              <AppButton v-if="showReject" label="Reject" variant="danger" :disabled="!canReject(document)" @click="$emit('open-reject', document)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AppButton from '../common/AppButton.vue'
import StatusBadge from '../common/StatusBadge.vue'
import { roles } from '../../constants/roles'
import { canApproveDocument, canEditDocument, canMarkUnderReview, canRejectDocument, canSubmitDocument } from '../../utils/workflowRules'

const props = defineProps({
  documents: { type: Array, default: () => [] },
  studies: { type: Array, default: () => [] },
  role: { type: String, required: true },
})

defineEmits(['edit', 'submit', 'under-review', 'approve', 'open-reject'])

const getStudyTitle = (studyId) => props.studies.find((study) => study.id === studyId)?.title || 'Unknown study'
const canEdit = (document) => canEditDocument(props.role, document.status)
const canSubmit = (document) => canSubmitDocument(props.role, document.status)
const canReview = (document) => canMarkUnderReview(props.role, document.status)
const canApprove = (document) => canApproveDocument(props.role, document.status)
const canReject = (document) => canRejectDocument(props.role, document.status)

const showEdit = computed(() => props.role === roles.RESEARCHER || props.role === roles.ADMIN)
const showSubmit = computed(() => props.role === roles.RESEARCHER || props.role === roles.ADMIN)
const showReview = computed(() => props.role === roles.REVIEWER || props.role === roles.ADMIN)
const showApprove = computed(() => props.role === roles.REVIEWER || props.role === roles.ADMIN)
const showReject = computed(() => props.role === roles.REVIEWER || props.role === roles.ADMIN)
</script>
