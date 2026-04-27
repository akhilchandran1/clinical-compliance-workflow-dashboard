<template>
  <div class="space-y-1.5">
    <label :for="id" class="text-[13px] font-semibold text-slate-700">{{ label }}</label>
    <select
      :id="id"
      :value="modelValue"
      :disabled="disabled"
      class="focus-ring w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 disabled:cursor-not-allowed disabled:bg-slate-100"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value ?? option" :value="option.value ?? option">
        {{ option.label ?? option }}
      </option>
    </select>
    <p v-if="error" class="text-xs text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Select' },
  disabled: { type: Boolean, default: false },
  error: { type: String, default: '' },
})

defineEmits(['update:modelValue'])
</script>
