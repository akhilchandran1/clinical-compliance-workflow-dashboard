<template>
  <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 sm:p-6">
    <AppCard class="w-full max-w-3xl">
      <div class="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-blue-700">Role Selection</p>
          <h1 class="mt-2 text-[28px] font-bold leading-[1.2] text-slate-900">Clinical Compliance Workflow Dashboard</h1>
          <p class="mt-2 text-[15px] text-slate-600">Select a role to simulate role-based workflow permissions in a clinical research environment.</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p class="font-semibold text-slate-900">Demo mode</p>
          <p class="mt-1">No real authentication, patient records, or confidential data are used.</p>
        </div>
      </div>

      <div class="mt-6 grid gap-3 sm:grid-cols-3">
        <button
          v-for="role in roles"
          :key="role"
          class="focus-ring rounded-xl border px-4 py-4 text-left text-sm font-semibold transition"
          :class="selectedRole === role ? 'border-blue-200 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50'"
          @click="selectedRole = role"
        >
          {{ roleLabels[role] }}
        </button>
      </div>
      <div class="mt-6 flex justify-end">
        <AppButton label="Continue to Dashboard" @click="continueToApp" />
      </div>
    </AppCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppCard from '../components/common/AppCard.vue'
import AppButton from '../components/common/AppButton.vue'
import { roleLabels, roleOptions } from '../constants/roles'
import { useRoleStore } from '../stores/roleStore'

const router = useRouter()
const roleStore = useRoleStore()
const roles = roleOptions
const selectedRole = ref(roleStore.selectedRole)

function continueToApp() {
  roleStore.setRole(selectedRole.value)
  router.push('/dashboard')
}
</script>
