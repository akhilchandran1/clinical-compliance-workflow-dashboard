<template>
  <AppLayout>
    <PageHeader title="Dashboard" subtitle="Clinical compliance overview and KPI monitoring">
      <template #actions>
        <div class="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 md:flex">
          <Calendar class="h-4 w-4 text-slate-500" />
          <span>{{ todayLabel }}</span>
        </div>
      </template>
    </PageHeader>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Total Studies" :value="metrics.totalStudies" icon="studies" tone="primary" trend="0% from last month" />
      <MetricCard label="Active Studies" :value="metrics.activeStudies" icon="active" tone="success" trend="Stable portfolio" />
      <MetricCard label="Pending Reviews" :value="metrics.pendingReviews" icon="pending" tone="warning" trend="Awaiting QA actions" />
      <MetricCard label="Approved Documents" :value="metrics.approvedDocuments" icon="approved" tone="success" trend="Ready for execution" />
      <MetricCard label="Rejected Documents" :value="metrics.rejectedDocuments" icon="rejected" tone="danger" trend="Needs resubmission" />
      <MetricCard label="High Risk Alerts" :value="metrics.highRiskAlerts" icon="alerts" tone="danger" trend="Requires attention" />
      <MetricCard label="Documents Expiring Soon" :value="metrics.expiringSoon" icon="expiring" tone="warning" trend="Due within 7 days" />
      <MetricCard label="Review In Progress" :value="metrics.reviewInProgress" icon="progress" tone="info" trend="Currently under review" />
    </section>

    <section class="mt-6 grid gap-4 xl:grid-cols-3">
      <ChartCard class="xl:col-span-2" title="Documents by Status" type="bar" :data="documentsByStatusData" :options="barChartOptions" filter-label="All Studies" :footer-text="`Total documents: ${metrics.totalDocuments}`" />
      <ComplianceSummary :metrics="metrics" />
    </section>

    <section class="mt-6 grid gap-4 xl:grid-cols-2">
      <ChartCard title="Studies by Risk Level" type="doughnut" :data="riskChartData" :options="doughnutChartOptions" />
      <ChartCard title="Monthly Review Activity" type="line" :data="reviewActivityData" :options="lineChartOptions" />
    </section>

    <section class="mt-6 grid gap-4 xl:grid-cols-2">
      <AppCard>
        <div class="mb-4 flex items-center justify-between gap-2">
          <h2 class="text-lg font-semibold text-slate-900">Recent Activity</h2>
          <RouterLink to="/audit-trail" class="text-sm font-medium text-blue-700 hover:underline">View all</RouterLink>
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
          <h2 class="text-lg font-semibold text-slate-900">High Risk Alerts</h2>
          <RouterLink to="/compliance-alerts" class="text-sm font-medium text-blue-700 hover:underline">View all</RouterLink>
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
import { Calendar } from 'lucide-vue-next'
import AppLayout from '../components/layout/AppLayout.vue'
import AppCard from '../components/common/AppCard.vue'
import EmptyState from '../components/common/EmptyState.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import PageHeader from '../components/common/PageHeader.vue'
import MetricCard from '../components/dashboard/MetricCard.vue'
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
const todayLabel = computed(() => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }))

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
  reviewInProgress: documentStatusCounts.value['Under Review'],
  totalDocuments: documentStore.documents.length,
}))

const documentsByStatusData = computed(() => {
  const statuses = [...documentStatuses]
  const counts = statuses.map((status) => documentStatusCounts.value[status])
  return {
    labels: statuses,
    datasets: [{
      label: 'Documents',
      data: counts,
      backgroundColor: ['#94a3b8', '#2563eb', '#f59e0b', '#16a34a', '#ef4444', '#475569'],
      borderRadius: 6,
      maxBarThickness: 36,
    }],
  }
})

const riskChartData = computed(() => {
  const levels = ['Low', 'Medium', 'High']
  const counts = levels.map((level) => studyStore.studies.filter((study) => study.riskLevel === level).length)
  return {
    labels: levels,
    datasets: [{ data: counts, backgroundColor: ['#16a34a', '#f59e0b', '#ef4444'] }],
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
    datasets: [{ label: 'Reviews Completed', data: Array.from(monthMap.values()), borderColor: '#06b6d4', backgroundColor: 'rgba(6, 182, 212, 0.16)', fill: true, tension: 0.35 }],
  }
})
</script>
