<template>
  <header class="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-3">
        <button class="focus-ring rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden" aria-label="Open navigation" @click="$emit('toggle-mobile-nav')">
          ☰
        </button>
        <RouterLink to="/dashboard" class="text-sm font-semibold text-slate-900">Clinical Compliance Workflow Dashboard</RouterLink>
      </div>
      <div class="text-sm text-slate-600">
        Role: <span class="font-semibold text-slate-900">{{ roleStore.selectedRole }}</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useRoleStore } from '../../stores/roleStore'

defineEmits(['toggle-mobile-nav'])

const roleStore = useRoleStore()
</script>
