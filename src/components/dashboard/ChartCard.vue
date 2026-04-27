<template>
  <AppCard>
    <div class="mb-4 flex items-start justify-between gap-3">
      <h3 class="text-base font-semibold text-slate-900">{{ title }}</h3>
    </div>
    <div v-if="!hasData" class="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">No chart data available.</div>
    <div v-else class="relative h-[260px] w-full md:h-[300px] lg:h-[320px]">
      <component :is="chartType" :data="data" :options="chartOptions" class="h-full w-full" />
    </div>
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
  options: { type: Object, default: () => ({}) },
})

const chartType = computed(() => {
  if (props.type === 'line') return Line
  if (props.type === 'doughnut') return Doughnut
  return Bar
})

const chartOptions = computed(() => ({
  ...props.options,
  responsive: true,
  maintainAspectRatio: false,
  resizeDelay: 150,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        boxWidth: 12,
        boxHeight: 12,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
    ...(props.options?.plugins || {}),
  },
  scales: {
    x: {
      ticks: {
        maxRotation: 0,
        minRotation: 0,
        autoSkip: true,
      },
      ...(props.options?.scales?.x || {}),
    },
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0,
      },
      ...(props.options?.scales?.y || {}),
    },
    ...(props.options?.scales || {}),
  },
}))

const hasData = computed(() => (props.data?.datasets || []).some((set) => (set.data || []).some((value) => Number(value) > 0)))
</script>
