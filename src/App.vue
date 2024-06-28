<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-green-600">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/components">Components</RouterLink>
    </nav>
  </header>
  <!--  <FormStepper />-->
  <RouterView />
</template>
