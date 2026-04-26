<template>
  <AppLayout>
    <PageHeader title="Compliance Alerts" subtitle="Dynamically generated workflow and data integrity warnings" />
    <AlertList v-if="alerts.length" :alerts="alerts" />
    <EmptyState v-else title="No active alerts" description="All monitored checks currently pass." />
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'
import PageHeader from '../components/common/PageHeader.vue'
import EmptyState from '../components/common/EmptyState.vue'
import AlertList from '../components/alerts/AlertList.vue'
import { useAlertStore } from '../stores/alertStore'
import { useStudyStore } from '../stores/studyStore'
import { useDocumentStore } from '../stores/documentStore'

const alertStore = useAlertStore()
const studyStore = useStudyStore()
const documentStore = useDocumentStore()

const alerts = computed(() => alertStore.generateAlerts(studyStore.studies, documentStore.documents))
</script>
