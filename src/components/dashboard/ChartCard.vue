<template>
  <AppCard>
    <h3 class="mb-3 text-base font-semibold text-slate-900">{{ title }}</h3>
    <div v-if="!hasData" class="rounded-md bg-slate-50 p-5 text-sm text-slate-600">No chart data available.</div>
    <component v-else :is="chartType" :data="data" :options="options" class="h-72" />
  </AppCard>
</template>

<script setup>
import { computed } from 'vue'
import { Bar, Doughnut, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import AppCard from '../common/AppCard.vue'

ChartJS.register(ArcElement, BarElement, CategoryScale, Filler, Legend, LinearScale, LineElement, PointElement, Tooltip)

const props = defineProps({
  title: { type: String, required: true },
  type: { type: String, default: 'bar' },
  data: { type: Object, default: () => ({ labels: [], datasets: [] }) },
  options: { type: Object, default: () => ({ responsive: true, maintainAspectRatio: false }) },
})

const chartType = computed(() => {
  if (props.type === 'line') return Line
  if (props.type === 'doughnut') return Doughnut
  return Bar
})

const hasData = computed(() => (props.data?.datasets || []).some((set) => (set.data || []).some((value) => Number(value) > 0)))
</script>
