<template>
  <component
    :is="componentType"
    v-bind="componentProps"
    class="group flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-medium transition"
    :class="itemClass"
    :aria-disabled="disabled ? 'true' : null"
    @click="emit('select')"
  >
    <span class="flex items-center gap-2.5">
      <component :is="resolvedIcon" class="h-4 w-4" />
      <span>{{ label }}</span>
    </span>
    <span v-if="badge !== null && badge !== undefined" class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold" :class="active ? 'bg-blue-100 text-blue-700' : 'text-slate-600'">
      {{ badge }}
    </span>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  AlertTriangle,
  BarChart3,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  Search,
  Settings,
} from 'lucide-vue-next'

const props = defineProps({
  label: { type: String, required: true },
  to: { type: String, default: '' },
  icon: { type: String, default: 'dashboard' },
  active: { type: Boolean, default: false },
  badge: { type: [String, Number], default: null },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['select'])

const iconMap = {
  dashboard: LayoutDashboard,
  studies: Search,
  documents: FileText,
  review: ClipboardCheck,
  audit: BarChart3,
  alerts: AlertTriangle,
  reports: BarChart3,
  settings: Settings,
}

const resolvedIcon = computed(() => iconMap[props.icon] || LayoutDashboard)

const componentType = computed(() => (props.to && !props.disabled ? RouterLink : 'button'))
const componentProps = computed(() => {
  if (props.to && !props.disabled) return { to: props.to }
  return { type: 'button', disabled: props.disabled }
})

const itemClass = computed(() => {
  if (props.disabled) {
    return 'cursor-not-allowed border-transparent text-slate-400'
  }
  if (props.active) {
    return 'border-blue-200 bg-blue-50 text-blue-700'
  }
  return 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900'
})
</script>
