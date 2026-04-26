import { seedStudies } from '../data/seedStudies'
import { seedDocuments } from '../data/seedDocuments'
import { seedAuditLogs } from '../data/seedAuditLogs'
import { storageKeys } from '../utils/storageKeys'

const clone = (value) => JSON.parse(JSON.stringify(value))

export function safeParseJson(rawValue, fallback = null) {
  try {
    if (rawValue == null) return fallback
    return JSON.parse(rawValue)
  } catch (error) {
    return fallback
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    return false
  }
}

export function loadOrSeed(key, seedValue, validator = () => true) {
  try {
    const parsed = safeParseJson(localStorage.getItem(key), null)
    if (validator(parsed)) return parsed
    saveToStorage(key, seedValue)
    return clone(seedValue)
  } catch (error) {
    return clone(seedValue)
  }
}

export function resetDemoData() {
  const studies = clone(seedStudies)
  const documents = clone(seedDocuments)
  const auditLogs = clone(seedAuditLogs)

  saveToStorage(storageKeys.studies, studies)
  saveToStorage(storageKeys.documents, documents)
  saveToStorage(storageKeys.auditLogs, auditLogs)

  return {
    studies,
    documents,
    auditLogs,
  }
}
