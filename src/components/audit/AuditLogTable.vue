<template>
  <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table class="min-w-full text-sm">
      <thead class="bg-slate-50">
        <tr>
          <th class="px-4 py-3 text-left">Timestamp</th>
          <th class="px-4 py-3 text-left">Role</th>
          <th class="px-4 py-3 text-left">Action</th>
          <th class="px-4 py-3 text-left">Entity</th>
          <th class="px-4 py-3 text-left">Status Change</th>
          <th class="px-4 py-3 text-left">Comment</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in logs" :key="log.id" class="border-t border-slate-100">
          <td class="px-4 py-3">{{ formatDateTime(log.timestamp) }}</td>
          <td class="px-4 py-3">{{ log.role }}</td>
          <td class="px-4 py-3">{{ log.action }}</td>
          <td class="px-4 py-3">{{ log.entityType }} · {{ log.entityId }}</td>
          <td class="px-4 py-3">{{ log.previousStatus || '—' }} → {{ log.newStatus || '—' }}</td>
          <td class="px-4 py-3">{{ log.comment || '—' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { formatDateTime } from '../../utils/dateUtils'

defineProps({
  logs: { type: Array, default: () => [] },
})
</script>
