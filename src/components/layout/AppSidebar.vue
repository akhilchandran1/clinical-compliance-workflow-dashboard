<template>
  <aside>
    <div class="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white px-4 py-6 lg:block">
      <nav class="space-y-1">
        <RouterLink v-for="item in items" :key="item.to" :to="item.to" class="block rounded-md px-3 py-2 text-sm"
          :class="route.path.startsWith(item.to) ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100'">
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>

    <div v-if="open" class="fixed inset-0 z-50 lg:hidden" aria-label="Mobile navigation">
      <div class="absolute inset-0 bg-slate-900/50" @click="$emit('close')"></div>
      <div class="absolute inset-y-0 left-0 w-72 bg-white p-4 shadow-2xl">
        <div class="mb-3 flex justify-between">
          <strong>Navigation</strong>
          <button class="focus-ring rounded px-2 py-1" @click="$emit('close')">Close</button>
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
</script>
