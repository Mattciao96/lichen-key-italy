<template>
  <header class="min-h-[4rem] top-0 z-20 border-b border-surface-300 shadow-sm flex items-center">
    <NavigationBar />
  </header>
  <main class="p-2 md:p-3 lg:p-4">
    <RouterView />
  </main>
  <ScrollTop />
  <Footer />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
import Footer from '@/components/Footer.vue'
import ScrollTop from 'primevue/scrolltop'
</script>

<style scoped>
main {
  min-height: calc(100vh - 64px - 14rem);
  max-width: 1280px;
  margin: 0 auto;
}
</style>
