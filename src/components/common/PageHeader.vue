<template>
  <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
    <div>
      <h1 class="text-2xl font-semibold text-slate-900">{{ title }}</h1>
      <p v-if="subtitle" class="text-sm text-slate-600">{{ subtitle }}</p>
    </div>
    <slot name="actions" />
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>
