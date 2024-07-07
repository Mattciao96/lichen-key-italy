<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <header class="bg-green-600">
    <nav class="space-x-10">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/filter-area">Filter</RouterLink>
      <RouterLink to="/filter-taxa/a">Select species</RouterLink>
    </nav>
  </header>
  <RouterView />
  <VueQueryDevtools />
</template>
