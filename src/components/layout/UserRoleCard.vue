<template>
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
    <div class="flex items-center gap-3">
      <div class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
        {{ initials }}
      </div>
      <div>
        <p class="text-xs uppercase tracking-wide text-slate-500">Current Role</p>
        <p class="text-sm font-semibold text-slate-900">{{ role }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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
</script>
