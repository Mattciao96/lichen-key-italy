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
        <li v-for="species in displayedSpecies" :key="species.name" class="flex flex-col">
          <span
            class="mt-2 text-center text-xs sm:text-sm xl:text-base font-medium text-gray-800 line-clamp-2"
          >
            {{ species.name }}
          </span>
        </li>
      </ul>
      <div v-if="!allLoaded" ref="loadMoreTrigger" class="h-10"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useKeyStore } from '@/stores/keyStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const keyStore = useKeyStore()
const itemsPerPage = 50
const currentPage = ref(1)
const allLoaded = ref(false)
const loadMoreTrigger = ref(null)

const displayedSpecies = computed(() => {
  return keyStore.currentUniqueSpeciesList.slice(0, currentPage.value * itemsPerPage)
})

const loadMore = () => {
  if (currentPage.value * itemsPerPage >= keyStore.currentUniqueSpeciesList.length) {
    allLoaded.value = true
    return
  }
  currentPage.value++
}

let observer: IntersectionObserver | null = null

const setupIntersectionObserver = () => {
  if (observer) {
    observer.disconnect()
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !allLoaded.value) {
        loadMore()
      }
    },
    { rootMargin: '200px' }
  )

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
}

onMounted(() => {
  keyStore.setUniqueSpeciesListFromNodeId(route.params.nodeId as string)
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

watch(
  () => keyStore.currentUniqueSpeciesList,
  () => {
    allLoaded.value = false
    currentPage.value = 1
    setupIntersectionObserver()
  }
)
</script>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
  padding: 20px;
  text-align: center;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
