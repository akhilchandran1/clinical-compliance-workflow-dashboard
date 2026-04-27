<template>
  <div class="table-wrap">
    <table class="table-base min-w-[1100px]">
      <thead class="table-head">
        <tr>
          <th class="table-th">Timestamp</th>
          <th class="table-th">Role</th>
          <th class="table-th">Action</th>
          <th class="table-th">Entity</th>
          <th class="table-th">Status Change</th>
          <th class="table-th">Comment</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in logs" :key="log.id" class="border-t border-slate-100 odd:bg-white even:bg-slate-50/40 hover:bg-slate-50">
          <td class="table-td whitespace-nowrap">{{ formatDateTime(log.timestamp) }}</td>
          <td class="table-td">{{ log.role }}</td>
          <td class="table-td font-medium">{{ log.action }}</td>
          <td class="table-td">{{ log.entityType }} · {{ log.entityId }}</td>
          <td class="table-td">{{ log.previousStatus || '—' }} ? {{ log.newStatus || '—' }}</td>
          <td class="table-td">{{ log.comment || '—' }}</td>
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
