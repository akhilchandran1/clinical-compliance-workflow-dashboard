<template>
  <span class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold" :class="statusClass">
    {{ label }}
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
</script>
