<template>
  <div class="container mx-auto px-4 py-8">
    <LoadingSpinner v-if="keyStore.isLoading" />

    <div v-else-if="keyStore.error" class="error-message">
      {{ keyStore.error }}
    </div>

    <div v-else>
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
            Species images
          </router-link>
          <router-link
            :to="`/${keyStore.keyId}/species-list`"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            :class="{ 'bg-green-700': $route.name === 'species' }"
          >
            Species List
          </router-link>
        </div>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useKeyStore } from '@/stores/keyStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const keyStore = useKeyStore()
const route = useRoute()

const fetchData = async () => {
  if (keyStore.keyId) {
    await keyStore.fetchData()
  }
}

onMounted(fetchData)

watch(() => route.params.keyId, fetchData)
</script>
