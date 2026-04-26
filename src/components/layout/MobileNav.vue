<template>
  <nav class="space-y-1">
    <RouterLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
      @click="$emit('navigate')"
    >
      {{ item.label }}
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  items: { type: Array, default: () => [] },
})

defineEmits(['navigate'])
</script>
