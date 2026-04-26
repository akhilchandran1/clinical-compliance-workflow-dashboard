<template>
  <AppLayout>
    <PageHeader title="Audit Trail" subtitle="Append-only log of workflow actions and status transitions">
      <template #actions>
        <div class="flex gap-2">
          <AppButton label="Export CSV" @click="exportCsv" />
          <AppButton v-if="roleStore.isAdmin" label="Reset Demo Data" variant="danger" @click="openReset = true" />
        </div>
      </template>
    </PageHeader>

    <AppCard>
      <AuditFilters :filters="filters" :role-options="roleOptions" @update="onFilterUpdate" />
    </AppCard>

    <div class="mt-4" v-if="filteredLogs.length">
      <AuditLogTable :logs="filteredLogs" />
    </div>
    <EmptyState v-else title="No matching audit logs" description="Try broadening filter conditions." />

    <ConfirmDialog
      :open="openReset"
      title="Reset Demo Dataset"
      message="This resets studies, documents, and logs to seed state and records an audit entry."
      confirm-label="Reset"
      @cancel="openReset = false"
      @confirm="resetData"
    />
  </AppLayout>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'
import PageHeader from '../components/common/PageHeader.vue'
import AppButton from '../components/common/AppButton.vue'
import AppCard from '../components/common/AppCard.vue'
import EmptyState from '../components/common/EmptyState.vue'
import ConfirmDialog from '../components/common/ConfirmDialog.vue'
import AuditFilters from '../components/audit/AuditFilters.vue'
import AuditLogTable from '../components/audit/AuditLogTable.vue'
import { useAuditStore } from '../stores/auditStore'
import { useRoleStore } from '../stores/roleStore'
import { useStudyStore } from '../stores/studyStore'
import { useDocumentStore } from '../stores/documentStore'
import { useToast } from '../composables/useToast'
import { resetDemoData } from '../composables/useLocalStorage'
import { useCsvExport } from '../composables/useCsvExport'

const auditStore = useAuditStore()
const roleStore = useRoleStore()
const studyStore = useStudyStore()
const documentStore = useDocumentStore()
const { showToast } = useToast()
const { exportRowsToCsv } = useCsvExport()

const openReset = ref(false)
const filters = reactive({ search: '', role: '', action: '', fromDate: '', toDate: '' })

const roleOptions = ['Researcher', 'Reviewer', 'Admin']

const filteredLogs = computed(() => auditStore.sortedLogs.filter((log) => {
  const haystack = `${log.action} ${log.entityId} ${log.entityName} ${log.comment}`.toLowerCase()
  const searchOk = !filters.search || haystack.includes(filters.search.toLowerCase())
  const roleOk = !filters.role || log.role === filters.role
  const actionOk = !filters.action || log.action.toLowerCase().includes(filters.action.toLowerCase())
  const fromOk = !filters.fromDate || new Date(log.timestamp) >= new Date(filters.fromDate)
  const toOk = !filters.toDate || new Date(log.timestamp) <= new Date(`${filters.toDate}T23:59:59`)
  return searchOk && roleOk && actionOk && fromOk && toOk
}))

function onFilterUpdate({ key, value }) {
  filters[key] = value
}

function exportCsv() {
  try {
    exportRowsToCsv({ filename: `audit-trail-${new Date().toISOString().slice(0, 10)}.csv`, rows: filteredLogs.value })
    showToast({ type: 'success', title: 'Export completed', message: 'Audit log CSV exported.' })
  } catch (error) {
    showToast({ type: 'error', title: 'Export failed', message: 'Unable to export CSV file.' })
  }
}

function resetData() {
  if (!roleStore.isAdmin) {
    showToast({ type: 'error', title: 'Access denied', message: 'Only Admin can reset demo data.' })
    openReset.value = false
    return
  }

  const seeded = resetDemoData()
  studyStore.replaceStudies(seeded.studies)
  documentStore.replaceDocuments(seeded.documents)
  auditStore.replaceLogs(seeded.auditLogs)

  auditStore.addLog({
    user: 'Demo Admin',
    role: 'Admin',
    action: 'Reset Demo Data',
    entityType: 'System',
    entityId: 'DEMO-DATA',
    entityName: 'Demo Dataset',
    comment: 'Demo dataset reset to seed values',
  })

  openReset.value = false
  showToast({ type: 'success', title: 'Data reset', message: 'Demo data has been reset.' })
}
</script>
