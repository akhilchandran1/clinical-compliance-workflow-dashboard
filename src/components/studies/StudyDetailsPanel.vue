<template>
  <AppCard>
    <h3 class="mb-3 text-lg font-semibold">Study Overview</h3>
    <dl class="grid gap-3 md:grid-cols-2">
      <div><dt class="text-xs text-slate-500">ID</dt><dd class="font-medium">{{ study.id }}</dd></div>
      <div><dt class="text-xs text-slate-500">Phase</dt><dd class="font-medium">{{ study.phase }}</dd></div>
      <div><dt class="text-xs text-slate-500">Principal Investigator</dt><dd class="font-medium">{{ study.principalInvestigator }}</dd></div>
      <div><dt class="text-xs text-slate-500">Site</dt><dd class="font-medium">{{ study.site }}</dd></div>
      <div><dt class="text-xs text-slate-500">Status</dt><dd><StatusBadge :value="study.status" /></dd></div>
      <div><dt class="text-xs text-slate-500">Risk</dt><dd><StatusBadge :value="study.riskLevel" /></dd></div>
      <div><dt class="text-xs text-slate-500">Start Date</dt><dd class="font-medium">{{ study.startDate }}</dd></div>
      <div><dt class="text-xs text-slate-500">Expected End Date</dt><dd class="font-medium">{{ study.expectedEndDate }}</dd></div>
    </dl>
  </AppCard>
</template>

<script setup>
import AppCard from '../common/AppCard.vue'
import StatusBadge from '../common/StatusBadge.vue'

defineProps({
  study: { type: Object, required: true },
})
</script>
