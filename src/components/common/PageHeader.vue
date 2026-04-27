<template>
  <div class="mb-6 flex flex-wrap items-start justify-between gap-4">
    <div class="max-w-3xl">
      <h1 class="text-[28px] font-bold leading-[1.2] tracking-tight text-slate-900">{{ title }}</h1>
      <p v-if="subtitle" class="mt-1 text-[14px] text-slate-600">{{ subtitle }}</p>
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
