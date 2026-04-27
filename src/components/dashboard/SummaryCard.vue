<template>
  <AppCard compact>
    <p class="text-[13px] font-medium text-slate-500">{{ label }}</p>
    <p class="mt-2 text-3xl font-bold tracking-tight text-slate-900">{{ value }}</p>
  </AppCard>
</template>

<script setup>
import AppCard from '../common/AppCard.vue'

defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
})
</script>
