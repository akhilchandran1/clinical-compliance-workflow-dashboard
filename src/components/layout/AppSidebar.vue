<template>
  <aside>
    <div class="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white px-4 py-6 lg:block">
      <div class="mb-6 px-2">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Clinical Workflow</p>
        <p class="mt-1 text-sm font-semibold text-slate-900">Navigation</p>
      </div>
      <nav class="space-y-1" aria-label="Primary">
        <RouterLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="block rounded-lg border px-3 py-2.5 text-sm font-medium transition"
          :class="isActive(item.to) ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50'"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>

    <div v-if="open" class="fixed inset-0 z-50 lg:hidden" aria-label="Mobile navigation">
      <div class="absolute inset-0 bg-slate-900/50" @click="$emit('close')"></div>
      <div class="absolute inset-y-0 left-0 w-72 border-r border-slate-200 bg-white p-4 shadow-2xl">
        <div class="mb-4 flex items-center justify-between">
          <strong class="text-slate-900">Navigation</strong>
          <button class="focus-ring rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-700" @click="$emit('close')">Close</button>
        </div>
        <MobileNav :items="items" @navigate="$emit('close')" />
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute, RouterLink } from 'vue-router'
import MobileNav from './MobileNav.vue'

const route = useRoute()

defineProps({
  open: { type: Boolean, default: false },
})

defineEmits(['close'])

const items = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Studies', to: '/studies' },
  { label: 'Documents', to: '/documents' },
  { label: 'Review Queue', to: '/review-queue' },
  { label: 'Audit Trail', to: '/audit-trail' },
  { label: 'Compliance Alerts', to: '/compliance-alerts' },
]

const isActive = (path) => route.path === path || route.path.startsWith(`${path}/`)
</script>
