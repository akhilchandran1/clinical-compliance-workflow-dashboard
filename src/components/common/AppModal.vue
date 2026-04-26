<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" @click.self="emitClose">
      <div class="w-full max-w-2xl rounded-xl bg-white p-5 shadow-2xl" role="dialog" aria-modal="true" :aria-label="title">
        <header class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-900">{{ title }}</h2>
          <button ref="closeButtonRef" class="focus-ring rounded p-1 text-slate-500 hover:bg-slate-100" aria-label="Close dialog" @click="emitClose">×</button>
        </header>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Dialog' },
})

const emit = defineEmits(['close'])
const closeButtonRef = ref(null)

const emitClose = () => emit('close')

function onKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault()
    emitClose()
  }
}

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      await nextTick()
      closeButtonRef.value?.focus()
      window.addEventListener('keydown', onKeydown)
      return
    }
    window.removeEventListener('keydown', onKeydown)
  },
)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>