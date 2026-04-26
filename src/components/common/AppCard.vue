<template>
  <section class="rounded-xl border border-slate-200 bg-white p-4 shadow-card" :class="paddingClass">
    <slot />
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  compact: { type: Boolean, default: false },
})

const paddingClass = computed(() => (props.compact ? 'p-3' : 'p-5'))
</script>
