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
        <div v-for="species in displayedSpecies" :key="species.name" class="flex flex-col">
          <div class="relative pb-3/4 w-full overflow-hidden rounded-md">
            <LazyImage
              :src="getSpeciesUrl(species.image)"
              :alt="species.name"
              :placeholder="placeholderImage"
            />
          </div>
          <p
            class="mt-2 text-center text-xs sm:text-sm xl:text-base font-medium text-gray-800 line-clamp-2"
          >
            {{ species.name }}
          </p>
        </div>
      </div>
      <div v-if="!allLoaded" ref="loadMoreTrigger" class="h-10"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useKeyStore } from '@/stores/keyStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import LazyImage from '@/components/LazyImage.vue'
import placeholderImage from '@/assets/placeholder.svg'
import { useRoute } from 'vue-router'

const route = useRoute()
const keyStore = useKeyStore()
const itemsPerPage = 20
const currentPage = ref(1)
const allLoaded = ref(false)
const loadMoreTrigger = ref(null)

/*const displayedSpecies = computed(() => {
  return keyStore.uniqueSpeciesWithImages.slice(0, currentPage.value * itemsPerPage)
})*/

const displayedSpecies = computed(() => {
  return keyStore.currentUniqueSpeciesWithImages.slice(0, currentPage.value * itemsPerPage)
})

const getSpeciesUrl = (imagePath: string) => {
  if (!imagePath) {
    return placeholderImage
  }
  const path = imagePath.split('/')
  path.splice(2, 1, 'thumbnails')
  return `https://italic.units.it/flora/${path.join('/')}`
}

const loadMore = () => {
  if (currentPage.value * itemsPerPage >= keyStore.uniqueSpeciesWithImages.length) {
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
  keyStore.setUniqueSpeciesWithImagesFromNodeId(route.params.nodeId)
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

watch(
  () => keyStore.uniqueSpeciesWithImages,
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
