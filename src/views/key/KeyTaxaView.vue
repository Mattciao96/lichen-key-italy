<template>
  <div class="container mx-auto px-4 py-8">
    <LoadingSpinner v-if="keyStore.isLoading" />

    <div v-else-if="keyStore.error" class="error-message">
      {{ keyStore.error }}
    </div>

    <div v-else>
      <div
        class="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <div v-for="species in displayedData" :key="species.name" class="flex flex-col">
          <div class="pb-3/4 relative w-full overflow-hidden rounded-md">
            <LazyImage
              :src="imageUrlToThumbNailUrl(species.image)"
              :alt="species.name"
              :placeholder="placeholderImage"
            />
          </div>
          <p
            class="mt-2 line-clamp-2 text-center text-xs font-medium text-gray-800 sm:text-sm xl:text-base"
          >
            <a
              class="text-sm text-blue-600 hover:underline"
              :href="`${paths.taxonPagePath}${species.italicId}`"
              target="_blank"
              >{{ species.name }}</a
            >
          </p>
        </div>
      </div>
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
import LazyImage from '@/components/LazyImage.vue'
import placeholderImage from '@/assets/placeholder.svg'
import { paths } from '@/config/endpoints'
import { imageUrlToThumbNailUrl } from '@/utils/imageUtils'

const route = useRoute()
const keyStore = useKeyStore()

const { displayedData, allLoaded, loadMoreTrigger, setupIntersectionObserver } = usePaginatedData(
  () => keyStore.currentUniqueSpeciesWithImages
)

onMounted(() => {
  keyStore.setUniqueSpeciesWithImagesFromNodeId(route.params.nodeId as string)
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
