import { defineStore } from 'pinia'
import { generateNextId } from '../utils/idGenerator'
import { daysBetween, toIsoDate } from '../utils/dateUtils'

const requiredTypes = ['Protocol', 'Informed Consent Form', 'Ethics Approval Letter']

export const useAlertStore = defineStore('alertStore', {
  state: () => ({
    alerts: [],
  }),
  actions: {
    generateAlerts(studies = [], documents = []) {
      const newAlerts = []

      documents.forEach((doc) => {
        const overdueDays = daysBetween(doc.dueDate, new Date())
        if (overdueDays !== null && overdueDays > 0 && ['Submitted', 'Under Review'].includes(doc.status)) {
          newAlerts.push({
            severity: 'High',
            type: 'Overdue Review',
            message: `${doc.name} has been waiting for review beyond due date.`,
            relatedEntityType: 'Document',
            relatedEntityId: doc.id,
          })
        }

        const daysToDue = daysBetween(new Date(), doc.dueDate)
        if (daysToDue !== null && daysToDue >= 0 && daysToDue <= 7) {
          newAlerts.push({
            severity: 'Medium',
            type: 'Expiring Document',
            message: `${doc.name} is due within ${daysToDue} day(s).`,
            relatedEntityType: 'Document',
            relatedEntityId: doc.id,
          })
        }

        if (doc.status === 'Rejected') {
          newAlerts.push({
            severity: 'Medium',
            type: 'Rejected Pending Resubmission',
            message: `${doc.name} was rejected and awaits resubmission.`,
            relatedEntityType: 'Document',
            relatedEntityId: doc.id,
          })
        }
      })

      studies
        .filter((study) => study.riskLevel === 'High')
        .forEach((study) => {
          const studyDocs = documents.filter((doc) => doc.studyId === study.id)
          const hasPending = studyDocs.some((doc) => ['Draft', 'Submitted', 'Under Review', 'Rejected'].includes(doc.status))
          if (hasPending) {
            newAlerts.push({
              severity: 'High',
              type: 'High Risk Pending Items',
              message: `${study.title} is high risk with pending documents.`,
              relatedEntityType: 'Study',
              relatedEntityId: study.id,
            })
          }

          const docTypes = new Set(studyDocs.map((doc) => doc.type))
          requiredTypes.forEach((type) => {
            if (study.status === 'Active' && !docTypes.has(type)) {
              newAlerts.push({
                severity: 'High',
                type: 'Missing Required Document',
                message: `${study.title} is missing required ${type}.`,
                relatedEntityType: 'Study',
                relatedEntityId: study.id,
              })
            }
          })
        })

      const alertsWithIds = []
      newAlerts.forEach((alert) => {
        alertsWithIds.push({
          id: generateNextId('ALT', alertsWithIds),
          ...alert,
          createdAt: toIsoDate(),
          resolved: false,
        })
      })

      return alertsWithIds
    },
    refreshAlerts(studies = [], documents = []) {
      this.alerts = this.generateAlerts(studies, documents)
      return this.alerts
    },
  },
})
