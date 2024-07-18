<template>
  <LoadingSpinner v-if="keyStore.isLoading" />

  <div v-else-if="keyStore.error" class="error-message">
    {{ keyStore.error }}
  </div>

  <div v-else>
    <div class="bg-red-300">{{ keyStore.keyId }}</div>
    <div class="bg-yellow-300">Rimasti: {{ keyStore.speciesCount }}</div>
    <div class="container mx-auto px-4">
      <ul>
        <li
          v-for="species in keyStore.uniqueSpeciesWithImages"
          :key="species.name"
          class="flex flex-col"
        >
          <span
            class="mt-2 text-center text-xs sm:text-sm xl:text-base font-medium text-gray-800 line-clamp-2"
          >
            {{ species.name }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useKeyStore } from '@/stores/keyStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const keyStore = useKeyStore()
const specieswithrecords = keyStore.getUniqueSpeciesWithRecords()
console.log(specieswithrecords)
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
