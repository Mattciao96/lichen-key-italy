<template>
  <LoadingSpinner v-if="keyStore.isLoading" />

  <div v-else-if="keyStore.error" class="error-message">
    {{ keyStore.error }}
  </div>

  <div v-else>
    <div class="bg-red-300">{{ keyStore.keyId }}</div>
    <div class="bg-yellow-300">Rimasti: {{ keyStore.speciesCount }}</div>
    <div class="container mx-auto px-4">
      <div
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <div
          v-for="species in keyStore.uniqueSpeciesWithImages"
          :key="species.name"
          class="flex flex-col"
        >
          <div class="relative pb-3/4 w-full overflow-hidden rounded-md">
            <img
              loading="lazy"
              v-if="species.image"
              :src="`https://italic.units.it/flora/${species.image}`"
              :alt="species.name"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div
              v-else
              class="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center"
            >
              <span class="text-gray-500">No Image</span>
            </div>
          </div>
          <p
            class="mt-2 text-center text-xs sm:text-sm xl:text-base font-medium text-gray-800 line-clamp-2"
          >
            {{ species.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useKeyStore } from '@/stores/keyStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const keyStore = useKeyStore()
</script>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
  padding: 20px;
  text-align: center;
}
.pb-3\/4 {
  padding-bottom: 75%;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
