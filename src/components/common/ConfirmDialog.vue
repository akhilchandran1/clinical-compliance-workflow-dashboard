<template>
  <AppModal :open="open" :title="title" @close="$emit('cancel')">
    <p class="text-sm text-slate-700">{{ message }}</p>
    <div class="mt-4 flex justify-end gap-2">
      <AppButton label="Cancel" variant="secondary" @click="$emit('cancel')" />
      <AppButton :label="confirmLabel" variant="danger" @click="$emit('confirm')" />
    </div>
  </AppModal>
</template>

<script setup>
import AppModal from './AppModal.vue'
import AppButton from './AppButton.vue'

defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Confirm action' },
  message: { type: String, default: 'Please confirm this action.' },
  confirmLabel: { type: String, default: 'Confirm' },
})

defineEmits(['cancel', 'confirm'])
</script>
