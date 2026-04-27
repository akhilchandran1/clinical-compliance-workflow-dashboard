<template>
  <AppCard compact>
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-[13px] font-medium text-slate-500">{{ label }}</p>
        <p class="mt-2 text-3xl font-bold tracking-tight text-slate-900">{{ value }}</p>
        <p class="mt-1 text-xs" :class="trendClass">{{ trend }}</p>
      </div>
      <div class="inline-flex h-10 w-10 items-center justify-center rounded-lg" :class="iconWrapClass">
        <component :is="iconComponent" class="h-5 w-5" :class="iconClass" />
      </div>
    </div>
  </AppCard>
</template>

<script setup>
import { computed } from 'vue'
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  FileText,
  FolderKanban,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from 'lucide-vue-next'
import AppCard from '../common/AppCard.vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  trend: { type: String, default: '0% from last month' },
  icon: { type: String, default: 'studies' },
  tone: { type: String, default: 'primary' },
})

const iconMap = {
  studies: FolderKanban,
  active: ShieldCheck,
  pending: Clock3,
  approved: CheckCircle2,
  rejected: XCircle,
  alerts: ShieldAlert,
  expiring: AlertTriangle,
  progress: FileText,
}

const iconComponent = computed(() => iconMap[props.icon] || FolderKanban)

const toneMap = {
  primary: {
    wrap: 'bg-blue-50',
    icon: 'text-blue-600',
    trend: 'text-slate-500',
  },
  success: {
    wrap: 'bg-green-50',
    icon: 'text-green-600',
    trend: 'text-green-600',
  },
  warning: {
    wrap: 'bg-amber-50',
    icon: 'text-amber-600',
    trend: 'text-amber-600',
  },
  danger: {
    wrap: 'bg-red-50',
    icon: 'text-red-600',
    trend: 'text-red-600',
  },
  info: {
    wrap: 'bg-cyan-50',
    icon: 'text-cyan-600',
    trend: 'text-cyan-600',
  },
}

const palette = computed(() => toneMap[props.tone] || toneMap.primary)
const iconWrapClass = computed(() => palette.value.wrap)
const iconClass = computed(() => palette.value.icon)
const trendClass = computed(() => palette.value.trend)
</script>
