<template>
  <AppLayout>
    <PageHeader title="Studies" subtitle="Search and monitor clinical study lifecycle" />
    <AppCard>
      <StudyFilters :filters="filters" :status-options="studyStatuses" :risk-options="riskLevels" @update="onFilterUpdate" @reset="resetFilters" />
    </AppCard>
    <div class="mt-4" v-if="filteredStudies.length">
      <StudyTable :studies="filteredStudies" />
    </div>
    <EmptyState v-else title="No studies found" description="Update filters or reset search to view studies." />
  </AppLayout>
</template>

<script setup>
import { computed, reactive } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'
import PageHeader from '../components/common/PageHeader.vue'
import AppCard from '../components/common/AppCard.vue'
import EmptyState from '../components/common/EmptyState.vue'
import StudyFilters from '../components/studies/StudyFilters.vue'
import StudyTable from '../components/studies/StudyTable.vue'
import { studyStatuses, riskLevels } from '../constants/statuses'
import { useStudyStore } from '../stores/studyStore'

const studyStore = useStudyStore()

const filters = reactive({
  search: '',
  status: '',
  risk: '',
})

const filteredStudies = computed(() => {
  return studyStore.studies.filter((study) => {
    const haystack = `${study.title} ${study.sponsor} ${study.site}`.toLowerCase()
    const searchOk = !filters.search || haystack.includes(filters.search.toLowerCase())
    const statusOk = !filters.status || study.status === filters.status
    const riskOk = !filters.risk || study.riskLevel === filters.risk
    return searchOk && statusOk && riskOk
  })
})

function onFilterUpdate({ key, value }) {
  filters[key] = value
}

function resetFilters() {
  filters.search = ''
  filters.status = ''
  filters.risk = ''
}
</script>
