<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold">Key ID: {{ keyStore.keyId }}</h1>
        <p class="text-lg">Species Count: {{ keyStore.speciesCount }}</p>
      </div>
      <div class="space-x-4">
        <router-link
          :to="`/${keyStore.keyId}/key`"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          :class="{ 'bg-blue-700': $route.name === 'key' }"
        >
          Key Steps
        </router-link>
        <router-link
          :to="`/${keyStore.keyId}/species`"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          :class="{ 'bg-green-700': $route.name === 'species' }"
        >
          Species
        </router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useKeyStore } from '@/stores/keyStore'

const keyStore = useKeyStore()
</script>
