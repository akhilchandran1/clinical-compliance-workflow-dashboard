import { documentStatuses, riskLevels, studyStatuses } from '../constants/statuses'

export function isRequired(value) {
  return value !== undefined && value !== null && String(value).trim().length > 0
}

export function isValidDate(value) {
  if (!value) return false
  const date = new Date(value)
  return !Number.isNaN(date.getTime())
}

export function isValidStudyStatus(value) {
  return studyStatuses.includes(value)
}

export function isValidDocumentStatus(value) {
  return documentStatuses.includes(value)
}

export function isValidRiskLevel(value) {
  return riskLevels.includes(value)
}

export function validateStudy(study) {
  const errors = {}
  if (!isRequired(study?.title)) errors.title = 'Title is required'
  if (!isRequired(study?.sponsor)) errors.sponsor = 'Sponsor is required'
  if (!isValidStudyStatus(study?.status)) errors.status = 'Status is invalid'
  if (!isValidRiskLevel(study?.riskLevel)) errors.riskLevel = 'Risk level is invalid'
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateDocument(document) {
  const errors = {}
  if (!isRequired(document?.name)) errors.name = 'Name is required'
  if (!isRequired(document?.type)) errors.type = 'Type is required'
  if (!isRequired(document?.studyId)) errors.studyId = 'Study is required'
  if (!isRequired(document?.version)) errors.version = 'Version is required'
  if (!isRequired(document?.dueDate)) errors.dueDate = 'Due date is required'
  if (document?.dueDate && !isValidDate(document?.dueDate)) errors.dueDate = 'Due date is invalid'
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateRejectionComment(comment) {
  if (!isRequired(comment)) return 'Rejection comment is required'
  if (String(comment).trim().length < 10) return 'Rejection comment must be at least 10 characters'
  return ''
}
