<template>
  <AppCard>
    <h3 class="text-lg font-semibold text-slate-900">Compliance Summary</h3>
    <ul class="mt-4 space-y-2 text-sm">
      <li v-for="row in rows" :key="row.key" class="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
        <span class="flex items-center gap-2 text-slate-700">
          <component :is="row.icon" class="h-4 w-4" :class="row.iconClass" />
          <span>{{ row.label }}</span>
        </span>
        <span class="flex items-center gap-2">
          <strong class="text-slate-900">{{ row.value }}</strong>
          <ChevronRight class="h-4 w-4 text-slate-400" />
        </span>
      </li>
    </ul>
  </AppCard>
</template>

<script setup>
import { computed } from 'vue'
import { AlertTriangle, ChevronRight, Clock3, FileWarning, XCircle } from 'lucide-vue-next'
import AppCard from '../common/AppCard.vue'

const props = defineProps({
  metrics: {
    type: Object,
    required: true,
  },
})

const rows = computed(() => [
  { key: 'pendingReviews', label: 'Pending Reviews', value: props.metrics.pendingReviews, icon: Clock3, iconClass: 'text-amber-600' },
  { key: 'rejectedDocuments', label: 'Rejected Documents', value: props.metrics.rejectedDocuments, icon: XCircle, iconClass: 'text-red-600' },
  { key: 'highRiskAlerts', label: 'High Risk Alerts', value: props.metrics.highRiskAlerts, icon: AlertTriangle, iconClass: 'text-red-600' },
  { key: 'expiringSoon', label: 'Expiring Soon', value: props.metrics.expiringSoon, icon: FileWarning, iconClass: 'text-cyan-600' },
])
</script>
