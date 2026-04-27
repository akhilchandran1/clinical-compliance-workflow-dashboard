<template>
  <span class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold" :class="statusClass">
    <span aria-hidden="true">{{ statusIcon }}</span>
    <span>{{ label }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { statusColors } from '../../constants/statuses'

const props = defineProps({
  value: { type: String, required: true },
})

const label = computed(() => props.value)
const statusClass = computed(() => statusColors[props.value] || 'bg-slate-100 text-slate-700 border-slate-300')

const statusIcon = computed(() => {
  if (props.value === 'Approved' || props.value === 'Active' || props.value === 'Low') return '?'
  if (props.value === 'Rejected' || props.value === 'High') return '!'
  if (props.value === 'Under Review' || props.value === 'Medium') return '•'
  if (props.value === 'Submitted') return '?'
  if (props.value === 'Expired') return '?'
  return '?'
})
</script>
