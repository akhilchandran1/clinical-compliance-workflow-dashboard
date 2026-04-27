<template>
  <aside>
    <div class="fixed inset-y-0 left-0 z-40 hidden w-[260px] border-r border-slate-200 bg-white p-4 lg:block">
      <div class="flex h-full flex-col">
        <div class="mb-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
            <ShieldCheck class="h-5 w-5" />
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-900">Clinical Compliance</p>
            <p class="text-xs text-slate-500">Workflow Dashboard</p>
          </div>
        </div>

        <div>
          <p class="px-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">Navigation</p>
          <nav class="mt-2 space-y-1" aria-label="Primary navigation">
            <SidebarNavItem
              v-for="item in navItems"
              :key="item.label"
              :label="item.label"
              :to="item.to"
              :icon="item.icon"
              :badge="item.badge"
              :active="isActive(item.to)"
            />
          </nav>
        </div>

        <div class="mt-5">
          <p class="px-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">Other</p>
          <div class="mt-2 space-y-1">
            <SidebarNavItem label="Reports" icon="reports" disabled />
            <SidebarNavItem label="Settings" icon="settings" disabled />
          </div>
        </div>

        <div class="mt-auto">
          <UserRoleCard :role="roleStore.selectedRole" />
        </div>
      </div>
    </div>

    <div v-if="open" class="fixed inset-0 z-50 lg:hidden" aria-label="Mobile navigation">
      <div class="absolute inset-0 bg-slate-900/40" @click="$emit('close')"></div>
      <div class="absolute inset-y-0 left-0 w-[280px] border-r border-slate-200 bg-white p-4 shadow-2xl">
        <div class="flex h-full flex-col">
          <div class="mb-6 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <ShieldCheck class="h-5 w-5 text-blue-700" />
              <span class="text-sm font-semibold text-slate-900">Clinical Compliance</span>
            </div>
            <button class="focus-ring rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-600" aria-label="Close navigation" @click="$emit('close')">Close</button>
          </div>

          <nav class="space-y-1" aria-label="Mobile primary navigation">
            <SidebarNavItem
              v-for="item in navItems"
              :key="item.label"
              :label="item.label"
              :to="item.to"
              :icon="item.icon"
              :badge="item.badge"
              :active="isActive(item.to)"
            />
          </nav>

          <div class="mt-auto pt-4">
            <UserRoleCard :role="roleStore.selectedRole" />
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ShieldCheck } from 'lucide-vue-next'
import SidebarNavItem from './SidebarNavItem.vue'
import UserRoleCard from './UserRoleCard.vue'
import { useDocumentStore } from '../../stores/documentStore'
import { useAlertStore } from '../../stores/alertStore'
import { useStudyStore } from '../../stores/studyStore'
import { useRoleStore } from '../../stores/roleStore'

const route = useRoute()
const documentStore = useDocumentStore()
const alertStore = useAlertStore()
const studyStore = useStudyStore()
const roleStore = useRoleStore()

defineProps({
  open: { type: Boolean, default: false },
})

defineEmits(['close'])

const reviewQueueCount = computed(() => documentStore.reviewQueue.length)
const alertsCount = computed(() => alertStore.generateAlerts(studyStore.studies, documentStore.documents).length)

const navItems = computed(() => [
  { label: 'Dashboard', to: '/dashboard', icon: 'dashboard' },
  { label: 'Studies', to: '/studies', icon: 'studies' },
  { label: 'Documents', to: '/documents', icon: 'documents' },
  { label: 'Review Queue', to: '/review-queue', icon: 'review', badge: reviewQueueCount.value > 0 ? reviewQueueCount.value : null },
  { label: 'Audit Trail', to: '/audit-trail', icon: 'audit' },
  { label: 'Compliance Alerts', to: '/compliance-alerts', icon: 'alerts', badge: alertsCount.value > 0 ? alertsCount.value : null },
])

const isActive = (path) => route.path === path || route.path.startsWith(`${path}/`)
</script>
