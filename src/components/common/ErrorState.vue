<template>
  <div class="rounded-xl border border-rose-200 bg-rose-50 p-4">
    <h3 class="font-semibold text-rose-800">{{ title }}</h3>
    <p class="text-sm text-rose-700">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Error' },
  message: { type: String, default: 'Something went wrong. Please try again.' },
})
</script>
