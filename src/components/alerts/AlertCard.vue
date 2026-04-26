<template>
  <article class="rounded-xl border bg-white p-4 shadow-card" :class="alert.severity === 'High' ? 'border-rose-300' : 'border-amber-300'">
    <div class="mb-1 flex items-center justify-between">
      <StatusBadge :value="alert.severity" />
      <span class="text-xs text-slate-500">{{ formatDateTime(alert.createdAt) }}</span>
    </div>
    <h3 class="text-sm font-semibold text-slate-900">{{ alert.type }}</h3>
    <p class="mt-1 text-sm text-slate-700">{{ alert.message }}</p>
    <p class="mt-2 text-xs text-slate-500">{{ alert.relatedEntityType }} · {{ alert.relatedEntityId }}</p>
  </article>
</template>

<script setup>
import StatusBadge from '../common/StatusBadge.vue'
import { formatDateTime } from '../../utils/dateUtils'

defineProps({
  alert: { type: Object, required: true },
})
</script>
