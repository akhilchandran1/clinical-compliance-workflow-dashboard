import { defineStore } from 'pinia'
import { roleLabels, roles } from '../constants/roles'
import { storageKeys } from '../utils/storageKeys'
import { loadOrSeed, saveToStorage } from '../composables/useLocalStorage'
import { useAuditStore } from './auditStore'

const allowedRoles = Object.values(roles)

export const useRoleStore = defineStore('roleStore', {
  state: () => ({
    selectedRole: loadOrSeed(storageKeys.role, roles.RESEARCHER, (value) => allowedRoles.includes(value)),
  }),
  getters: {
    isResearcher: (state) => state.selectedRole === roles.RESEARCHER,
    isReviewer: (state) => state.selectedRole === roles.REVIEWER,
    isAdmin: (state) => state.selectedRole === roles.ADMIN,
  },
  actions: {
    setRole(role) {
      if (!allowedRoles.includes(role)) return false
      if (this.selectedRole === role) return true

      const previousRole = this.selectedRole
      this.selectedRole = role
      saveToStorage(storageKeys.role, role)

      const message = `Role changed from ${roleLabels[previousRole]} to ${roleLabels[role]}`

      const auditStore = useAuditStore()
      auditStore.addLog({
        user: `Demo ${role}`,
        role,
        action: message,
        entityType: 'User Session',
        entityId: 'ROLE-SELECTOR',
        entityName: 'Role Selector',
        previousStatus: previousRole,
        newStatus: role,
        comment: message,
      })

      return true
    },
  },
})
