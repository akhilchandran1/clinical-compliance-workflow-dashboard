<template>
  <ul class="space-y-3">
    <li v-for="alert in alerts" :key="alert.id">
      <AlertCard :alert="alert" />
    </li>
  </ul>
</template>

<script setup>
import AlertCard from './AlertCard.vue'

defineProps({
  alerts: { type: Array, default: () => [] },
})
</script>
