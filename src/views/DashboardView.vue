<template>
  <AppLayout>
    <PageHeader title="Dashboard" subtitle="Clinical compliance overview and KPI monitoring" />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard label="Total Studies" :value="metrics.totalStudies" />
      <SummaryCard label="Active Studies" :value="metrics.activeStudies" />
      <SummaryCard label="Pending Reviews" :value="metrics.pendingReviews" />
      <SummaryCard label="Approved Documents" :value="metrics.approvedDocuments" />
      <SummaryCard label="Rejected Documents" :value="metrics.rejectedDocuments" />
      <SummaryCard label="High Risk Alerts" :value="metrics.highRiskAlerts" />
      <SummaryCard label="Documents Expiring Soon" :value="metrics.expiringSoon" />
    </div>

    <div class="mt-5 grid gap-4 xl:grid-cols-3">
      <ChartCard class="xl:col-span-2" title="Documents by Status" type="bar" :data="documentsByStatusData" />
      <ComplianceSummary :metrics="metrics" />
    </div>

    <div class="mt-5 grid gap-4 xl:grid-cols-2">
      <ChartCard title="Studies by Risk Level" type="doughnut" :data="riskChartData" />
      <ChartCard title="Monthly Review Activity" type="line" :data="reviewActivityData" />
    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'
import PageHeader from '../components/common/PageHeader.vue'
import SummaryCard from '../components/dashboard/SummaryCard.vue'
import ChartCard from '../components/dashboard/ChartCard.vue'
import ComplianceSummary from '../components/dashboard/ComplianceSummary.vue'
import { useStudyStore } from '../stores/studyStore'
import { useDocumentStore } from '../stores/documentStore'
import { useAlertStore } from '../stores/alertStore'

const studyStore = useStudyStore()
const documentStore = useDocumentStore()
const alertStore = useAlertStore()

const alerts = computed(() => alertStore.generateAlerts(studyStore.studies, documentStore.documents))

const metrics = computed(() => {
  const docs = documentStore.documents
  return {
    totalStudies: studyStore.studies.length,
    activeStudies: studyStore.activeStudies.length,
    pendingReviews: docs.filter((doc) => ['Submitted', 'Under Review'].includes(doc.status)).length,
    approvedDocuments: docs.filter((doc) => doc.status === 'Approved').length,
    rejectedDocuments: docs.filter((doc) => doc.status === 'Rejected').length,
    highRiskAlerts: alerts.value.filter((alert) => alert.severity === 'High').length,
    expiringSoon: alerts.value.filter((alert) => alert.type === 'Expiring Document').length,
  }
})

const documentsByStatusData = computed(() => {
  const statuses = ['Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected', 'Expired']
  const counts = statuses.map((status) => documentStore.documents.filter((doc) => doc.status === status).length)
  return {
    labels: statuses,
    datasets: [{ label: 'Documents', data: counts, backgroundColor: '#2563eb' }],
  }
})

const riskChartData = computed(() => {
  const levels = ['Low', 'Medium', 'High']
  const counts = levels.map((level) => studyStore.studies.filter((study) => study.riskLevel === level).length)
  return {
    labels: levels,
    datasets: [{ data: counts, backgroundColor: ['#10b981', '#f59e0b', '#e11d48'] }],
  }
})

const reviewActivityData = computed(() => {
  const monthMap = new Map()
  for (let i = 5; i >= 0; i -= 1) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    monthMap.set(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`, 0)
  }

  documentStore.documents.forEach((doc) => {
    if (!doc.reviewedAt) return
    const reviewDate = new Date(doc.reviewedAt)
    const key = `${reviewDate.getFullYear()}-${String(reviewDate.getMonth() + 1).padStart(2, '0')}`
    if (monthMap.has(key)) monthMap.set(key, monthMap.get(key) + 1)
  })

  return {
    labels: Array.from(monthMap.keys()),
    datasets: [{ label: 'Reviews Completed', data: Array.from(monthMap.values()), borderColor: '#0f766e', backgroundColor: 'rgba(15,118,110,.15)', fill: true }],
  }
})
</script>
