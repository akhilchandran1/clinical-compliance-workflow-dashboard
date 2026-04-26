<template>
  <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table class="min-w-full divide-y divide-slate-200 text-sm">
      <thead class="bg-slate-50">
        <tr>
          <th class="px-4 py-3 text-left font-semibold">Study</th>
          <th class="px-4 py-3 text-left font-semibold">Sponsor</th>
          <th class="px-4 py-3 text-left font-semibold">Status</th>
          <th class="px-4 py-3 text-left font-semibold">Risk</th>
          <th class="px-4 py-3 text-left font-semibold">Site</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr v-for="study in studies" :key="study.id" class="hover:bg-slate-50">
          <td class="px-4 py-3"><RouterLink class="text-blue-700 hover:underline" :to="`/studies/${study.id}`">{{ study.title }}</RouterLink></td>
          <td class="px-4 py-3">{{ study.sponsor }}</td>
          <td class="px-4 py-3"><StatusBadge :value="study.status" /></td>
          <td class="px-4 py-3"><StatusBadge :value="study.riskLevel" /></td>
          <td class="px-4 py-3">{{ study.site }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import StatusBadge from '../common/StatusBadge.vue'

defineProps({
  studies: { type: Array, default: () => [] },
})
</script>
