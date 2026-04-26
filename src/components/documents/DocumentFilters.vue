<template>
  <div class="grid gap-3 md:grid-cols-5">
    <AppInput id="doc-search" label="Search" :model-value="filters.search" placeholder="Name, type, owner" @update:model-value="emitUpdate('search', $event)" />
    <AppSelect id="doc-status" label="Status" :model-value="filters.status" :options="statusOptions" placeholder="All statuses" @update:model-value="emitUpdate('status', $event)" />
    <AppSelect id="doc-type" label="Type" :model-value="filters.type" :options="typeOptions" placeholder="All document types" @update:model-value="emitUpdate('type', $event)" />
    <AppSelect id="doc-study" label="Study" :model-value="filters.studyId" :options="studyOptions" placeholder="All studies" @update:model-value="emitUpdate('studyId', $event)" />
    <div class="flex items-end"><AppButton label="Reset" variant="secondary" @click="$emit('reset')" /></div>
  </div>
</template>

<script setup>
import AppButton from '../common/AppButton.vue'
import AppInput from '../common/AppInput.vue'
import AppSelect from '../common/AppSelect.vue'

defineProps({
  filters: { type: Object, required: true },
  statusOptions: { type: Array, default: () => [] },
  typeOptions: { type: Array, default: () => [] },
  studyOptions: { type: Array, default: () => [] },
})

const emit = defineEmits(['update', 'reset'])

function emitUpdate(key, value) {
  emit('update', { key, value })
}
</script>
