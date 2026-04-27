<template>
  <div class="table-wrap">
    <table class="table-base min-w-[820px]">
      <thead class="table-head">
        <tr>
          <th class="table-th">Study</th>
          <th class="table-th">Sponsor</th>
          <th class="table-th">Status</th>
          <th class="table-th">Risk</th>
          <th class="table-th">Site</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="study in studies" :key="study.id" class="border-t border-slate-100 odd:bg-white even:bg-slate-50/40 hover:bg-slate-50">
          <td class="table-td font-medium"><RouterLink class="text-blue-700 hover:text-blue-800 hover:underline" :to="`/studies/${study.id}`">{{ study.title }}</RouterLink></td>
          <td class="table-td">{{ study.sponsor }}</td>
          <td class="table-td"><StatusBadge :value="study.status" /></td>
          <td class="table-td"><StatusBadge :value="study.riskLevel" /></td>
          <td class="table-td">{{ study.site }}</td>
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
