<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" @click.self="$emit('close')">
      <div class="w-full max-w-2xl rounded-xl bg-white p-5 shadow-2xl" role="dialog" aria-modal="true" :aria-label="title">
        <header class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-900">{{ title }}</h2>
          <button class="focus-ring rounded p-1 text-slate-500 hover:bg-slate-100" aria-label="Close dialog" @click="$emit('close')">×</button>
        </header>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup>
defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Dialog' },
})

defineEmits(['close'])
</script>
