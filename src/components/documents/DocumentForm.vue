<template>
  <form class="grid gap-3" @submit.prevent="$emit('submit')">
    <AppInput id="doc-name" label="Document Name" :model-value="form.name" :error="errors.name" @update:model-value="$emit('update', { key: 'name', value: $event })" />
    <div class="grid gap-3 md:grid-cols-2">
      <AppSelect id="doc-type-form" label="Type" :model-value="form.type" :options="typeOptions" :error="errors.type" @update:model-value="$emit('update', { key: 'type', value: $event })" />
      <AppSelect id="doc-study-form" label="Study" :model-value="form.studyId" :options="studyOptions" :error="errors.studyId" @update:model-value="$emit('update', { key: 'studyId', value: $event })" />
    </div>
    <div class="grid gap-3 md:grid-cols-2">
      <AppInput id="doc-version" label="Version" :model-value="form.version" :error="errors.version" placeholder="1.0" @update:model-value="$emit('update', { key: 'version', value: $event })" />
      <AppInput id="doc-due" label="Due Date" type="date" :model-value="form.dueDate" :error="errors.dueDate" @update:model-value="$emit('update', { key: 'dueDate', value: $event })" />
    </div>
    <div class="flex justify-end gap-2">
      <AppButton label="Cancel" variant="secondary" @click="$emit('cancel')" />
      <AppButton type="submit" label="Create Document" />
    </div>
  </form>
</template>

<script setup>
import AppInput from '../common/AppInput.vue'
import AppSelect from '../common/AppSelect.vue'
import AppButton from '../common/AppButton.vue'

defineProps({
  form: { type: Object, required: true },
  errors: { type: Object, default: () => ({}) },
  typeOptions: { type: Array, default: () => [] },
  studyOptions: { type: Array, default: () => [] },
})

defineEmits(['submit', 'update', 'cancel'])
</script>
