<template>
  <div class="min-h-screen bg-slate-50">
    <AppSidebar :open="sidebarOpen" @close="sidebarOpen = false" />
    <div class="lg:pl-[260px]">
      <AppHeader @toggle-mobile-nav="sidebarOpen = !sidebarOpen" />
      <main class="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-6">
        <div class="page-container">
          <slot />
        </div>
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
