import { roles } from '../constants/roles'

const editableStatuses = new Set(['Draft', 'Rejected'])
const reviewableStatuses = new Set(['Submitted', 'Under Review'])

export function canCreateDocument(role) {
  return role === roles.RESEARCHER || role === roles.ADMIN
}

export function canEditDocument(role, documentStatus) {
  if (role === roles.ADMIN) return true
  return role === roles.RESEARCHER && editableStatuses.has(documentStatus)
}

export function canSubmitDocument(role, documentStatus) {
  if (role === roles.ADMIN) return true
  return role === roles.RESEARCHER && editableStatuses.has(documentStatus)
}

export function canReviewDocument(role, documentStatus) {
  if (role === roles.ADMIN) return true
  return role === roles.REVIEWER && reviewableStatuses.has(documentStatus)
}

export function canMarkUnderReview(role, documentStatus) {
  if (role === roles.ADMIN) return true
  return role === roles.REVIEWER && documentStatus === 'Submitted'
}

export function canApproveDocument(role, documentStatus) {
  if (role === roles.ADMIN) return true
  return role === roles.REVIEWER && reviewableStatuses.has(documentStatus)
}

export function canRejectDocument(role, documentStatus) {
  if (role === roles.ADMIN) return true
  return role === roles.REVIEWER && reviewableStatuses.has(documentStatus)
}

export function assertValidTransition(currentStatus, nextStatus) {
  const transitions = {
    Draft: ['Submitted'],
    Rejected: ['Submitted'],
    Submitted: ['Under Review', 'Approved', 'Rejected'],
    'Under Review': ['Approved', 'Rejected'],
    Approved: [],
    Expired: [],
  }

  const allowed = transitions[currentStatus] || []
  return allowed.includes(nextStatus)
}
