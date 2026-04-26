<template>
  <AppCard>
    <h3 class="mb-2 text-base font-semibold text-slate-900">Compliance Summary</h3>
    <ul class="space-y-2 text-sm text-slate-700">
      <li>Pending Reviews: <strong>{{ metrics.pendingReviews }}</strong></li>
      <li>Rejected Documents: <strong>{{ metrics.rejectedDocuments }}</strong></li>
      <li>High Risk Alerts: <strong>{{ metrics.highRiskAlerts }}</strong></li>
      <li>Expiring Soon: <strong>{{ metrics.expiringSoon }}</strong></li>
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
