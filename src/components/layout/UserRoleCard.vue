<template>
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
    <div class="mb-3 flex items-center gap-3">
      <div class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
        {{ initials }}
      </div>
      <div>
        <p class="text-xs uppercase tracking-wide text-slate-500">Current Role</p>
        <p class="text-sm font-semibold text-slate-900">{{ roleLabel }}</p>
      </div>
    </div>

    <RoleSwitcher full-width align="left" trigger-class="w-full justify-between">
      <template #trigger="{ label }">
        <span class="text-slate-500">Switch role</span>
        <span class="font-semibold text-slate-900">{{ label }}</span>
      </template>
    </RoleSwitcher>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RoleSwitcher from '../common/RoleSwitcher.vue'
import { roleLabels } from '../../constants/roles'

const props = defineProps({
  role: { type: String, default: 'Researcher' },
})

const initials = computed(() =>
  String(props.role || 'R')
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase(),
)

const roleLabel = computed(() => roleLabels[props.role] || props.role)
</script>
