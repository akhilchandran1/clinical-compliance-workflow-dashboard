<template>
  <AppModal :open="open" title="Reject Document" @close="$emit('close')">
    <p class="mb-2 text-sm text-slate-700">Provide reason for rejection (minimum 10 characters).</p>
    <textarea
      :value="comment"
      class="focus-ring h-28 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
      @input="$emit('update:comment', $event.target.value)"
    ></textarea>
    <p v-if="error" class="mt-1 text-xs text-rose-600">{{ error }}</p>
    <div class="mt-4 flex justify-end gap-2">
      <AppButton label="Cancel" variant="secondary" @click="$emit('close')" />
      <AppButton label="Reject" variant="danger" @click="$emit('confirm')" />
    </div>
  </AppModal>
</template>

<script setup>
import AppModal from '../common/AppModal.vue'
import AppButton from '../common/AppButton.vue'

defineProps({
  open: { type: Boolean, default: false },
  comment: { type: String, default: '' },
  error: { type: String, default: '' },
})

defineEmits(['close', 'confirm', 'update:comment'])
</script>
