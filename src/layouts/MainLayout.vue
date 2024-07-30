<template>
  <header class="top-0 z-20 flex min-h-[4rem] items-center border-b border-surface-300 shadow-sm">
    <NavigationBar />
  </header>
  <main class="p-2 md:p-3 lg:p-4">
    <RouterView />
  </main>
  <ScrollTop v-if="showScrollTop" />
  <Footer />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import ScrollTop from 'primevue/scrolltop'
import NavigationBar from '@/components/NavigationBar.vue'
import Footer from '@/components/Footer.vue'
const route = useRoute()

const showScrollTop = computed(() => !route.path.startsWith('/filters/'))
</script>

<style scoped>
main {
  min-height: calc(100vh - 64px - 14rem);
  max-width: 1280px;
  margin: 0 auto;
}
</style>
