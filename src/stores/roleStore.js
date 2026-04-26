import { defineStore } from 'pinia'
import { roles } from '../constants/roles'
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
      const previousRole = this.selectedRole
      this.selectedRole = role
      saveToStorage(storageKeys.role, role)

      const auditStore = useAuditStore()
      auditStore.addLog({
        user: `Demo ${role}`,
        role,
        action: 'Changed Role',
        entityType: 'User Session',
        entityId: 'ROLE-SELECTOR',
        entityName: 'Role Selector',
        previousStatus: previousRole,
        newStatus: role,
        comment: 'Role switched from selector',
      })

      return true
    },
  },
})
