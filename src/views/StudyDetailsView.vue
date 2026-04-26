<template>
  <AppLayout>
    <PageHeader title="Study Details" subtitle="Study metadata, linked documents, and recent activity" />
    <ErrorState v-if="!study" title="Study not found" message="The requested study record is missing or invalid." />
    <template v-else>
      <StudyDetailsPanel :study="study" />
      <div class="mt-4 grid gap-4 xl:grid-cols-2">
        <AppCard>
          <h2 class="mb-3 text-lg font-semibold">Linked Documents</h2>
          <EmptyState v-if="studyDocuments.length === 0" title="No documents linked" description="No documents are currently associated with this study." />
          <ul v-else class="space-y-2 text-sm">
            <li v-for="doc in studyDocuments" :key="doc.id" class="flex items-center justify-between rounded-md border border-slate-200 p-3">
              <span>{{ doc.name }}</span>
              <StatusBadge :value="doc.status" />
            </li>
          </ul>
        </AppCard>
        <AppCard>
          <h2 class="mb-3 text-lg font-semibold">Recent Audit Activity</h2>
          <EmptyState v-if="relatedLogs.length === 0" title="No activity logs" description="No recent actions were recorded for this study." />
          <ul v-else class="space-y-2 text-sm">
            <li v-for="log in relatedLogs" :key="log.id" class="rounded-md border border-slate-200 p-3">
              <p class="font-semibold">{{ log.action }}</p>
              <p class="text-xs text-slate-600">{{ formatDateTime(log.timestamp) }} · {{ log.role }}</p>
            </li>
          </ul>
        </AppCard>
      </div>
    </template>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import PageHeader from '../components/common/PageHeader.vue'
import AppCard from '../components/common/AppCard.vue'
import EmptyState from '../components/common/EmptyState.vue'
import ErrorState from '../components/common/ErrorState.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import StudyDetailsPanel from '../components/studies/StudyDetailsPanel.vue'
import { useStudyStore } from '../stores/studyStore'
import { useDocumentStore } from '../stores/documentStore'
import { useAuditStore } from '../stores/auditStore'
import { formatDateTime } from '../utils/dateUtils'

const route = useRoute()
const studyStore = useStudyStore()
const documentStore = useDocumentStore()
const auditStore = useAuditStore()

const study = computed(() => studyStore.getStudyById(route.params.id))
const studyDocuments = computed(() => documentStore.getDocumentsByStudyId(route.params.id))
const relatedLogs = computed(() => {
  const docIds = new Set(studyDocuments.value.map((doc) => doc.id))
  return auditStore.sortedLogs.filter((log) => log.entityId === route.params.id || docIds.has(log.entityId)).slice(0, 6)
})
</script>
