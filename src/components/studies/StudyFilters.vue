<template>
  <div class="grid gap-3 md:grid-cols-4">
    <AppInput id="study-search" label="Search" :model-value="filters.search" placeholder="Title, sponsor, site" @update:model-value="emitUpdate('search', $event)" />
    <AppSelect id="study-status" label="Status" :model-value="filters.status" :options="statusOptions" placeholder="All statuses" @update:model-value="emitUpdate('status', $event)" />
    <AppSelect id="study-risk" label="Risk" :model-value="filters.risk" :options="riskOptions" placeholder="All risks" @update:model-value="emitUpdate('risk', $event)" />
    <div class="flex items-end">
      <AppButton label="Reset" variant="secondary" @click="$emit('reset')" />
    </div>
  </div>
</template>

<script setup>
import AppInput from '../common/AppInput.vue'
import AppSelect from '../common/AppSelect.vue'
import AppButton from '../common/AppButton.vue'

defineProps({
  filters: { type: Object, required: true },
  statusOptions: { type: Array, default: () => [] },
  riskOptions: { type: Array, default: () => [] },
})

const emit = defineEmits(['update', 'reset'])

function emitUpdate(key, value) {
  emit('update', { key, value })
}
</script>
