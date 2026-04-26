<template>
  <div class="min-h-screen bg-slate-100">
    <AppSidebar :open="sidebarOpen" @close="sidebarOpen = false" />
    <div class="lg:pl-64">
      <AppHeader @toggle-mobile-nav="sidebarOpen = !sidebarOpen" />
      <main class="px-4 py-5 sm:px-6 lg:px-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'

const sidebarOpen = ref(false)
</script>
