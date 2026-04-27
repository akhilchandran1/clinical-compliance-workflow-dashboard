<template>
  <AppCard>
    <div class="mb-4 flex items-start justify-between gap-3">
      <h3 class="text-base font-semibold text-slate-900">{{ title }}</h3>
      <button v-if="filterLabel" type="button" class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600" aria-label="Chart filter">
        {{ filterLabel }}
        <ChevronDown class="h-3.5 w-3.5" />
      </button>
    </div>

    <div v-if="!hasData" class="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">No chart data available.</div>
    <div v-else class="relative h-[240px] w-full md:h-[280px]">
      <component :is="chartType" :data="data" :options="chartOptions" class="h-full w-full" />
    </div>

    <p v-if="footerText" class="mt-3 text-xs text-slate-500">{{ footerText }}</p>
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
import { ChevronDown } from 'lucide-vue-next'
import AppCard from '../common/AppCard.vue'

ChartJS.register(ArcElement, BarElement, CategoryScale, Filler, Legend, LinearScale, LineElement, PointElement, Tooltip)

const props = defineProps({
  title: { type: String, required: true },
  type: { type: String, default: 'bar' },
  data: { type: Object, default: () => ({ labels: [], datasets: [] }) },
  options: { type: Object, default: () => ({}) },
  filterLabel: { type: String, default: '' },
  footerText: { type: String, default: '' },
})

const chartType = computed(() => {
  if (props.type === 'line') return Line
  if (props.type === 'doughnut') return Doughnut
  return Bar
})

const isCircularChart = computed(() => props.type === 'doughnut')

const chartOptions = computed(() => {
  const { plugins = {}, scales = {}, ...restOptions } = props.options || {}

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 150,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#475569',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      ...plugins,
    },
  }

  if (isCircularChart.value) {
    return {
      ...baseOptions,
      ...restOptions,
    }
  }

  return {
    ...baseOptions,
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          autoSkip: true,
          color: '#64748b',
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
        ...(scales.x || {}),
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          color: '#64748b',
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#e2e8f0',
        },
        ...(scales.y || {}),
      },
      ...scales,
    },
    ...restOptions,
  }
})

const hasData = computed(() => (props.data?.datasets || []).some((set) => (set.data || []).some((value) => Number(value) > 0)))
</script>
