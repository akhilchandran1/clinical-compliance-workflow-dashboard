<template>
  <section class="surface-card min-w-0 overflow-hidden p-5 sm:p-6" :class="paddingClass">
    <slot />
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  compact: { type: Boolean, default: false },
})

const paddingClass = computed(() => (props.compact ? 'p-4 sm:p-5' : ''))
</script>
