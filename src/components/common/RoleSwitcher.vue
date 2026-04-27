<template>
  <div ref="rootRef" class="relative" :class="fullWidth ? 'w-full' : ''">
    <button
      type="button"
      class="focus-ring inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
      :class="[fullWidth ? 'w-full justify-between' : '', triggerClass]"
      aria-haspopup="menu"
      :aria-expanded="open ? 'true' : 'false'"
      @click="toggle"
    >
      <slot name="trigger" :label="currentLabel" :role="roleStore.selectedRole">
        <span class="font-medium text-slate-500">Role</span>
        <span class="font-semibold text-slate-900">{{ currentLabel }}</span>
      </slot>
      <ChevronDown class="h-4 w-4 text-slate-500" />
    </button>

    <div
      v-if="open"
      class="absolute z-[80] mt-2 min-w-[220px] rounded-xl border border-slate-200 bg-white p-1 shadow-lg"
      :class="menuClass"
      role="menu"
      aria-label="Switch role"
    >
      <button
        v-for="role in roleOptions"
        :key="role"
        type="button"
        class="focus-ring flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm"
        :class="roleStore.selectedRole === role ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'"
        role="menuitemradio"
        :aria-checked="roleStore.selectedRole === role ? 'true' : 'false'"
        @click="onSelect(role)"
      >
        <span>{{ roleLabels[role] }}</span>
        <Check v-if="roleStore.selectedRole === role" class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { Check, ChevronDown } from 'lucide-vue-next'
import { roleLabels, roleOptions } from '../../constants/roles'
import { useRoleStore } from '../../stores/roleStore'
import { useToast } from '../../composables/useToast'

const props = defineProps({
  fullWidth: { type: Boolean, default: false },
  align: { type: String, default: 'right' },
  triggerClass: { type: String, default: '' },
})

const roleStore = useRoleStore()
const { showToast } = useToast()

const open = ref(false)
const rootRef = ref(null)

const currentLabel = computed(() => roleLabels[roleStore.selectedRole] || roleStore.selectedRole)

const menuClass = computed(() => {
  if (props.align === 'left') return 'left-0'
  return 'right-0'
})

function close() {
  open.value = false
}

function toggle() {
  open.value = !open.value
}

function onOutsideClick(event) {
  if (!open.value) return
  if (!rootRef.value?.contains(event.target)) close()
}

function onEscape(event) {
  if (event.key === 'Escape') close()
}

function onSelect(role) {
  const previousRole = roleStore.selectedRole
  if (previousRole === role) {
    close()
    return
  }

  const switched = roleStore.setRole(role)
  if (!switched) return

  showToast({
    type: 'success',
    title: 'Role switched',
    message: `Role switched to ${roleLabels[role]}.`,
  })

  close()
}

onMounted(() => {
  document.addEventListener('mousedown', onOutsideClick)
  document.addEventListener('keydown', onEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onOutsideClick)
  document.removeEventListener('keydown', onEscape)
})
</script>
