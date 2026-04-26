<template>
  <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 p-4">
    <AppCard class="w-full max-w-xl">
      <h1 class="text-2xl font-semibold text-slate-900">Clinical Compliance Workflow Dashboard</h1>
      <p class="mt-2 text-sm text-slate-600">Select a role to simulate role-based workflow permissions in a clinical research environment.</p>
      <div class="mt-5 grid gap-3 sm:grid-cols-3">
        <button
          v-for="role in roles"
          :key="role"
          class="focus-ring rounded-lg border px-4 py-3 text-left text-sm font-semibold transition hover:border-blue-400 hover:bg-blue-50"
          :class="selectedRole === role ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-300 text-slate-800'"
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
