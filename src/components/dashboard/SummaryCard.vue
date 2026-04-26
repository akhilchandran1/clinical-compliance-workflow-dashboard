<template>
  <AppCard compact>
    <p class="text-sm text-slate-500">{{ label }}</p>
    <p class="mt-1 text-2xl font-semibold text-slate-900">{{ value }}</p>
  </AppCard>
</template>

<script setup>
import AppCard from '../common/AppCard.vue'

defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
})
</script>
