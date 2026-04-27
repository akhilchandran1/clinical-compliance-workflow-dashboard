<template>
  <header class="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div class="page-container flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
      <button
        class="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
        aria-label="Open navigation"
        @click="$emit('toggle-mobile-nav')"
      >
        <Menu class="h-4 w-4" />
      </button>

      <div class="hidden max-w-md flex-1 lg:block">
        <label class="relative block">
          <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            aria-label="Search"
            placeholder="Search (Ctrl + K)"
            class="focus-ring w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400"
          />
        </label>
      </div>

      <div class="ml-auto flex items-center gap-2 sm:gap-3">
        <button class="focus-ring relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50" aria-label="Notifications">
          <Bell class="h-4 w-4" />
          <span v-if="notificationCount > 0" class="absolute -right-1 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {{ notificationCount > 9 ? '9+' : notificationCount }}
          </span>
        </button>

        <RoleSwitcher class="hidden sm:block" align="right">
          <template #trigger="{ label }">
            <span class="text-slate-500">Role</span>
            <span class="font-semibold text-slate-900">{{ label }}</span>
          </template>
        </RoleSwitcher>

        <RoleSwitcher class="sm:hidden" align="right" trigger-class="h-9 w-9 justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 border-blue-100">
          <template #trigger>
            {{ roleInitials }}
          </template>
        </RoleSwitcher>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { Bell, Menu, Search } from 'lucide-vue-next'
import RoleSwitcher from '../common/RoleSwitcher.vue'
import { useRoleStore } from '../../stores/roleStore'
import { useAlertStore } from '../../stores/alertStore'
import { useStudyStore } from '../../stores/studyStore'
import { useDocumentStore } from '../../stores/documentStore'

defineEmits(['toggle-mobile-nav'])

const roleStore = useRoleStore()
const alertStore = useAlertStore()
const studyStore = useStudyStore()
const documentStore = useDocumentStore()

const notificationCount = computed(() => alertStore.generateAlerts(studyStore.studies, documentStore.documents).length)

const roleInitials = computed(() =>
  String(roleStore.selectedRole || 'R')
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase(),
)
</script>
