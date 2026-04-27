<template>
  <AppLayout>
    <PageHeader title="Dashboard" subtitle="Clinical compliance overview and KPI monitoring" />

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard label="Total Studies" :value="metrics.totalStudies" />
      <SummaryCard label="Active Studies" :value="metrics.activeStudies" />
      <SummaryCard label="Pending Reviews" :value="metrics.pendingReviews" />
      <SummaryCard label="Approved Documents" :value="metrics.approvedDocuments" />
      <SummaryCard label="Rejected Documents" :value="metrics.rejectedDocuments" />
      <SummaryCard label="High Risk Alerts" :value="metrics.highRiskAlerts" />
      <SummaryCard label="Documents Expiring Soon" :value="metrics.expiringSoon" />
    </section>

    <section class="mt-6 grid gap-4 xl:grid-cols-3">
      <ChartCard class="xl:col-span-2" title="Documents by Status" type="bar" :data="documentsByStatusData" :options="barChartOptions" />
      <ComplianceSummary :metrics="metrics" />
    </section>

    <section class="mt-6 grid gap-4 xl:grid-cols-2">
      <ChartCard title="Studies by Risk Level" type="doughnut" :data="riskChartData" :options="doughnutChartOptions" />
      <ChartCard title="Monthly Review Activity" type="line" :data="reviewActivityData" :options="lineChartOptions" />
    </section>

    <section class="mt-6 grid gap-4 xl:grid-cols-2">
      <AppCard>
        <div class="mb-4 flex items-center justify-between gap-2">
          <h2 class="text-[22px] font-semibold text-slate-900">Recent Activity</h2>
          <RouterLink to="/audit-trail" class="text-sm font-medium text-blue-700 hover:underline">View full audit trail</RouterLink>
        </div>
        <EmptyState v-if="recentLogs.length === 0" title="No recent activity" description="Workflow actions will appear here as users submit and review documents." />
        <ul v-else class="space-y-3">
          <li v-for="log in recentLogs" :key="log.id" class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <p class="text-sm font-semibold text-slate-900">{{ log.action }}</p>
            <p class="mt-1 text-xs text-slate-600">{{ formatDateTime(log.timestamp) }} · {{ log.role }} · {{ log.entityId }}</p>
          </li>
        </ul>
      </AppCard>

      <AppCard>
        <div class="mb-4 flex items-center justify-between gap-2">
          <h2 class="text-[22px] font-semibold text-slate-900">High Risk Alerts</h2>
          <RouterLink to="/compliance-alerts" class="text-sm font-medium text-blue-700 hover:underline">View all alerts</RouterLink>
        </div>
        <EmptyState v-if="highRiskAlerts.length === 0" title="No high risk alerts" description="Critical compliance issues will appear here when triggered." />
        <ul v-else class="space-y-3">
          <li v-for="alert in highRiskAlerts" :key="alert.id" class="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <div class="mb-2 flex items-center justify-between gap-2">
              <StatusBadge :value="alert.severity" />
              <span class="text-xs text-slate-600">{{ formatDateTime(alert.createdAt) }}</span>
            </div>
            <p class="text-sm font-semibold text-slate-900">{{ alert.type }}</p>
            <p class="mt-1 text-sm text-slate-700">{{ alert.message }}</p>
          </li>
        </ul>
      </AppCard>
    </section>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import AppCard from '../components/common/AppCard.vue'
import EmptyState from '../components/common/EmptyState.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import PageHeader from '../components/common/PageHeader.vue'
import SummaryCard from '../components/dashboard/SummaryCard.vue'
import ChartCard from '../components/dashboard/ChartCard.vue'
import ComplianceSummary from '../components/dashboard/ComplianceSummary.vue'
import { useStudyStore } from '../stores/studyStore'
import { useDocumentStore } from '../stores/documentStore'
import { useAlertStore } from '../stores/alertStore'
import { useAuditStore } from '../stores/auditStore'
import { formatDateTime } from '../utils/dateUtils'
import { documentStatuses } from '../constants/statuses'

const studyStore = useStudyStore()
const documentStore = useDocumentStore()
const alertStore = useAlertStore()
const auditStore = useAuditStore()

const alerts = computed(() => alertStore.generateAlerts(studyStore.studies, documentStore.documents))
const highRiskAlerts = computed(() => alerts.value.filter((alert) => alert.severity === 'High').slice(0, 4))
const recentLogs = computed(() => auditStore.sortedLogs.slice(0, 6))

const canonicalStatusMap = new Map(documentStatuses.map((status) => [status.toLowerCase(), status]))

function normalizeDocumentStatus(rawStatus) {
  const normalized = String(rawStatus || '').trim().toLowerCase()
  return canonicalStatusMap.get(normalized) || 'Draft'
}

const documentStatusCounts = computed(() => {
  const counts = Object.fromEntries(documentStatuses.map((status) => [status, 0]))
  documentStore.documents.forEach((doc) => {
    const status = normalizeDocumentStatus(doc.status)
    counts[status] += 1
  })
  return counts
})

const barChartOptions = {
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0,
      },
    },
  },
}

const doughnutChartOptions = {
  plugins: {
    legend: {
      position: 'top',
    },
  },
}

const lineChartOptions = {
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0,
      },
    },
  },
}

const metrics = computed(() => ({
  totalStudies: studyStore.studies.length,
  activeStudies: studyStore.activeStudies.length,
  pendingReviews: documentStatusCounts.value.Submitted + documentStatusCounts.value['Under Review'],
  approvedDocuments: documentStatusCounts.value.Approved,
  rejectedDocuments: documentStatusCounts.value.Rejected,
  highRiskAlerts: alerts.value.filter((alert) => alert.severity === 'High').length,
  expiringSoon: alerts.value.filter((alert) => alert.type === 'Expiring Document').length,
}))

const documentsByStatusData = computed(() => {
  const statuses = [...documentStatuses]
  const counts = statuses.map((status) => documentStatusCounts.value[status])
  return {
    labels: statuses,
    datasets: [{
      label: 'Documents',
      data: counts,
      backgroundColor: ['#94a3b8', '#2563eb', '#f59e0b', '#16a34a', '#dc2626', '#7f1d1d'],
      borderRadius: 6,
    }],
  }
})

const riskChartData = computed(() => {
  const levels = ['Low', 'Medium', 'High']
  const counts = levels.map((level) => studyStore.studies.filter((study) => study.riskLevel === level).length)
  return {
    labels: levels,
    datasets: [{ data: counts, backgroundColor: ['#16a34a', '#f59e0b', '#dc2626'] }],
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
    datasets: [{ label: 'Reviews Completed', data: Array.from(monthMap.values()), borderColor: '#0ea5e9', backgroundColor: 'rgba(14, 165, 233, 0.18)', fill: true, tension: 0.3 }],
  }
})
</script>
