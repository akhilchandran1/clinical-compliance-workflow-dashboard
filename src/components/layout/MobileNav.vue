<template>
  <nav class="space-y-1" aria-label="Mobile navigation links">
    <RouterLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="block rounded-lg border px-3 py-2.5 text-sm font-medium transition"
      :class="isActive(item.to) ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50'"
      @click="$emit('navigate')"
    >
      {{ item.label }}
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'

defineProps({
  items: { type: Array, default: () => [] },
})

defineEmits(['navigate'])

const route = useRoute()
const isActive = (path) => route.path === path || route.path.startsWith(`${path}/`)
</script>
