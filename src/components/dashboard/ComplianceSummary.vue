<template>
  <AppCard>
    <h3 class="text-base font-semibold text-slate-900">Compliance Summary</h3>
    <ul class="mt-4 space-y-2 text-sm text-slate-700">
      <li class="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>Pending Reviews</span><strong>{{ metrics.pendingReviews }}</strong></li>
      <li class="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>Rejected Documents</span><strong>{{ metrics.rejectedDocuments }}</strong></li>
      <li class="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>High Risk Alerts</span><strong>{{ metrics.highRiskAlerts }}</strong></li>
      <li class="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>Expiring Soon</span><strong>{{ metrics.expiringSoon }}</strong></li>
    </ul>
  </AppCard>
</template>

<script setup>
import AppCard from '../common/AppCard.vue'

defineProps({
  metrics: {
    type: Object,
    required: true,
  },
})
</script>
