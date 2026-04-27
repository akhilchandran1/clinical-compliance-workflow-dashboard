<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-label="ariaLabel || label"
    class="focus-ring inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold transition duration-150 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
    :class="variantClass"
    @click="$emit('click', $event)"
  >
    <span v-if="loading">Processing...</span>
    <span v-else>{{ label }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, default: 'Action' },
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  ariaLabel: { type: String, default: '' },
})

defineEmits(['click'])

const variantClass = computed(() => {
  if (props.variant === 'secondary') {
    return 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
  }
  if (props.variant === 'danger') {
    return 'border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700'
  }
  if (props.variant === 'ghost') {
    return 'border-transparent bg-transparent text-slate-700 hover:bg-slate-100'
  }
  return 'border-blue-600 bg-blue-600 text-white hover:border-blue-700 hover:bg-blue-700'
})
</script>
