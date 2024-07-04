<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <header class="bg-green-600">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/components">Components</RouterLink>
      <RouterLink to="/filter-area">Filter</RouterLink>
    </nav>
  </header>
  <!--  <FormStepper />-->
  <RouterView />
  <VueQueryDevtools />
</template>
