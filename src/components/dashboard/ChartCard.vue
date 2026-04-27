<template>
  <AppCard class="chart-card">
    <div class="mb-4 flex min-w-0 items-start justify-between gap-3">
      <h3 class="text-base font-semibold text-slate-900">{{ title }}</h3>
      <button v-if="filterLabel" type="button" class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600" aria-label="Chart filter">
        {{ filterLabel }}
        <ChevronDown class="h-3.5 w-3.5" />
      </button>
    </div>

    <div v-if="!hasData" class="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">No chart data available.</div>
    <div v-else class="chart-container relative w-full max-w-full min-w-0 overflow-hidden" :style="chartContainerStyle">
      <component :is="chartType" :data="data" :options="chartOptions" class="h-full w-full" />
    </div>

    <p v-if="footerText" class="mt-3 text-xs text-slate-500">{{ footerText }}</p>
  </AppCard>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
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
  mobileHeight: { type: Number, default: 220 },
  desktopHeight: { type: Number, default: 260 },
})

const chartType = computed(() => {
  if (props.type === 'line') return Line
  if (props.type === 'doughnut') return Doughnut
  return Bar
})

const isCircularChart = computed(() => props.type === 'doughnut')
const isMobile = ref(false)

const chartContainerStyle = computed(() => ({
  height: `${isMobile.value ? props.mobileHeight : props.desktopHeight}px`,
}))

const abbreviatedStatusLabel = {
  Submitted: 'Submit',
  'Under Review': 'Review',
  Approved: 'Approved',
  Rejected: 'Reject',
  Expired: 'Expired',
  Draft: 'Draft',
}

function updateViewportFlag() {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  updateViewportFlag()
  window.addEventListener('resize', updateViewportFlag)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewportFlag)
})

const chartOptions = computed(() => {
  const { plugins = {}, scales = {}, ...restOptions } = props.options || {}
  const { legend: providedLegend = {}, ...otherPlugins } = plugins
  const { x: scaleX = {}, y: scaleY = {}, ...otherScales } = scales
  const { ticks: providedXTicks = {}, ...otherScaleX } = scaleX
  const { ticks: providedYTicks = {}, ...otherScaleY } = scaleY

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 150,
    plugins: {
      legend: {
        ...providedLegend,
        position: isMobile.value && isCircularChart.value ? 'bottom' : (providedLegend.position || 'top'),
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#475569',
          font: {
            size: isMobile.value ? 10 : 12,
          },
          ...(providedLegend.labels || {}),
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      ...otherPlugins,
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
          maxTicksLimit: isMobile.value ? 4 : props.type === 'line' ? 6 : 8,
          color: '#64748b',
          font: {
            size: isMobile.value ? 10 : 12,
          },
          callback(value, index, ticks) {
            if (typeof providedXTicks.callback === 'function') {
              return providedXTicks.callback.call(this, value, index, ticks)
            }
            const raw = this.getLabelForValue(value)
            if (props.type === 'bar' && isMobile.value) {
              return abbreviatedStatusLabel[raw] || raw
            }
            return raw
          },
          ...providedXTicks,
        },
        grid: {
          display: false,
        },
        ...otherScaleX,
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          color: '#64748b',
          font: {
            size: isMobile.value ? 10 : 12,
          },
          ...providedYTicks,
        },
        grid: {
          color: '#e2e8f0',
        },
        ...otherScaleY,
      },
      ...otherScales,
    },
    ...restOptions,
  }
})

const hasData = computed(() => (props.data?.datasets || []).some((set) => (set.data || []).some((value) => Number(value) > 0)))
</script>
