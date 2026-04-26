<template>
  <teleport to="body">
    <div v-if="toastState.visible" class="fixed bottom-4 right-4 z-[100] max-w-sm rounded-lg border p-4 shadow-xl"
      :class="toastClass" role="status" aria-live="polite">
      <p class="text-sm font-semibold">{{ toastState.title }}</p>
      <p class="text-sm">{{ toastState.message }}</p>
    </div>
  </teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useToast } from '../../composables/useToast'

const { toastState } = useToast()

const toastClass = computed(() => {
  if (toastState.value.type === 'error') return 'border-rose-200 bg-rose-50 text-rose-900'
  if (toastState.value.type === 'success') return 'border-emerald-200 bg-emerald-50 text-emerald-900'
  return 'border-blue-200 bg-blue-50 text-blue-900'
})
</script>
