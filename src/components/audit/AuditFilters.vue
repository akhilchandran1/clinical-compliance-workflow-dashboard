<template>
  <div class="grid gap-3 md:grid-cols-5">
    <AppInput id="audit-search" label="Search" :model-value="filters.search" placeholder="Action, entity, comment" @update:model-value="emitUpdate('search', $event)" />
    <AppSelect id="audit-role" label="Role" :model-value="filters.role" :options="roleOptions" placeholder="All roles" @update:model-value="emitUpdate('role', $event)" />
    <AppInput id="audit-action" label="Action" :model-value="filters.action" placeholder="Action contains" @update:model-value="emitUpdate('action', $event)" />
    <AppInput id="audit-from" label="From Date" type="date" :model-value="filters.fromDate" @update:model-value="emitUpdate('fromDate', $event)" />
    <AppInput id="audit-to" label="To Date" type="date" :model-value="filters.toDate" @update:model-value="emitUpdate('toDate', $event)" />
  </div>
</template>

<script setup>
import AppInput from '../common/AppInput.vue'
import AppSelect from '../common/AppSelect.vue'

defineProps({
  filters: { type: Object, required: true },
  roleOptions: { type: Array, default: () => [] },
})

const emit = defineEmits(['update'])

function emitUpdate(key, value) {
  emit('update', { key, value })
}
</script>
