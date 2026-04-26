<template>
  <div class="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
    <h3 class="text-base font-semibold text-slate-800">{{ title }}</h3>
    <p class="mt-1 text-sm text-slate-600">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'No data available' },
  description: { type: String, default: 'There is no information to display yet.' },
})
</script>
