<template>
  <ul class="space-y-3">
    <li v-for="alert in items" :key="alert.id" class="flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
      <div class="flex items-start gap-3">
        <div class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-700">
          <AlertTriangle class="h-4 w-4" />
        </div>
        <div>
          <p class="text-sm font-semibold text-slate-900">{{ alert.type }}</p>
          <p class="mt-1 text-sm text-slate-700">{{ alert.message }}</p>
          <p class="mt-1 text-xs text-slate-600">{{ alert.relatedEntityType }} · {{ alert.relatedEntityId }}</p>
        </div>
      </div>
      <p class="whitespace-nowrap text-xs text-slate-500">{{ formatDateTime(alert.createdAt) }}</p>
    </li>
  </ul>
</template>

<script setup>
import { AlertTriangle } from 'lucide-vue-next'
import { formatDateTime } from '../../utils/dateUtils'

defineProps({
  items: { type: Array, default: () => [] },
})
</script>
