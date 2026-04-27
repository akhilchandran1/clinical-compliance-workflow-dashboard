<template>
  <ul class="space-y-3">
    <li v-for="log in items" :key="log.id" class="flex items-start justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <div class="flex items-start gap-3">
        <div class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
          <Activity class="h-4 w-4" />
        </div>
        <div>
          <p class="text-sm font-semibold text-slate-900">{{ log.action }}</p>
          <p class="mt-1 text-xs text-slate-600">{{ log.role }} · {{ log.entityId }}</p>
        </div>
      </div>
      <p class="whitespace-nowrap text-xs text-slate-500">{{ formatDateTime(log.timestamp) }}</p>
    </li>
  </ul>
</template>

<script setup>
import { Activity } from 'lucide-vue-next'
import { formatDateTime } from '../../utils/dateUtils'

defineProps({
  items: { type: Array, default: () => [] },
})
</script>
