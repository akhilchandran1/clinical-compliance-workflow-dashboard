import { defineStore } from 'pinia'
import { loadOrSeed, saveToStorage } from '../composables/useLocalStorage'
import { seedStudies } from '../data/seedStudies'
import { storageKeys } from '../utils/storageKeys'

const isStudyArray = (value) => Array.isArray(value)

export const useStudyStore = defineStore('studyStore', {
  state: () => ({
    studies: loadOrSeed(storageKeys.studies, seedStudies, isStudyArray),
  }),
  getters: {
    getStudyById: (state) => (id) => state.studies.find((study) => study.id === id),
    activeStudies: (state) => state.studies.filter((study) => study.status === 'Active'),
    highRiskStudies: (state) => state.studies.filter((study) => study.riskLevel === 'High'),
  },
  actions: {
    persist() {
      saveToStorage(storageKeys.studies, this.studies)
    },
    replaceStudies(studies = []) {
      this.studies = Array.isArray(studies) ? studies : []
      this.persist()
    },
    updateStudy(studyId, changes = {}) {
      const index = this.studies.findIndex((study) => study.id === studyId)
      if (index === -1) return null
      const updated = {
        ...this.studies[index],
        ...changes,
        updatedAt: new Date().toISOString(),
      }
      this.studies[index] = updated
      this.persist()
      return updated
    },
  },
})
