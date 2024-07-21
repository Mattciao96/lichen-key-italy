<template>
  <div class="container mx-auto px-4 py-8">
    <LoadingSpinner v-if="keyStore.isLoading" />

    <div v-else-if="keyStore.error" class="error-message">
      {{ keyStore.error }}
    </div>

    <div v-else>
      <div class="bg-red-300">{{ keyStore.keyId }}</div>
      <div class="bg-yellow-300 mb-4">Rimasti: {{ keyStore.speciesCount }}</div>
      <ul class="space-y-2">
        <li
          v-for="species in displayedData"
          :key="species.name"
          class="text-center text-sm sm:text-base font-medium text-gray-800"
        >
          {{ species.name }}
        </li>
      </ul>
      <div v-if="!allLoaded" ref="loadMoreTrigger" class="h-10"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useKeyStore } from '@/stores/keyStore'
import { useRoute } from 'vue-router'
import { usePaginatedData } from '@/composables/usePaginatedData'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const keyStore = useKeyStore()

const { displayedData, allLoaded, loadMoreTrigger, setupIntersectionObserver } = usePaginatedData(
  () => keyStore.currentUniqueSpeciesList
)

onMounted(() => {
  keyStore.setUniqueSpeciesListFromNodeId(route.params.nodeId as string)
  setupIntersectionObserver()
})
</script>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
  padding: 20px;
  text-align: center;
}
</style>
