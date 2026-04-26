<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-label="ariaLabel || label"
    class="focus-ring inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
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
  if (props.variant === 'secondary') return 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50'
  if (props.variant === 'danger') return 'bg-rose-600 text-white hover:bg-rose-700'
  if (props.variant === 'ghost') return 'bg-transparent text-slate-700 hover:bg-slate-100'
  return 'bg-blue-600 text-white hover:bg-blue-700'
})
</script>
