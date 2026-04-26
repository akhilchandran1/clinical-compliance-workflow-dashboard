<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 p-4">
    <AppCard class="w-full max-w-xl text-center">
      <h1 class="text-2xl font-semibold text-slate-900">Page Not Found</h1>
      <p class="mt-2 text-sm text-slate-600">The route you requested does not exist. Use navigation to return to a valid page.</p>
      <div class="mt-5">
        <RouterLink to="/dashboard" class="focus-ring inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Back to Dashboard</RouterLink>
      </div>
    </AppCard>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import AppCard from '../components/common/AppCard.vue'
</script>
