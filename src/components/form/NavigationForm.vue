<template>
  <div class="flex justify-around my-4">
    <div class="lg:w-32 px-2 py-2">
      <RouterLink
        v-if="actualRouteIndex > 0"
        :to="previousRoute"
        class="p-2 w-full bg-gray-200 border border-gray-300 rounded-md flex items-center justify-center gap-2"
      >
        <i class="pi pi-arrow-left"></i>
        Previous
      </RouterLink>
    </div>

    <div class="flex lg:[&>button]:min-w-48 gap-4 px-2 py-2">
      <button
        v-if="actualRouteIndex === 2"
        type="submit"
        form="filter-form"
        :disabled="isLoading"
        class="p-2 w-full bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
      >
        Submit
      </button>
      <button
        v-if="actualRouteIndex === 2"
        type="submit"
        form="filter-form"
        @click="clearKeyStoreData"
        :disabled="isLoading"
        class="p-2 w-full bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
      >
        Submit and refresh
      </button>
    </div>

    <div class="lg:w-32 px-2 py-2">
      <RouterLink
        v-if="actualRouteIndex < 2"
        :to="nextRoute"
        class="p-2 w-full bg-gray-200 border border-gray-300 rounded-md text-black flex items-center justify-center gap-2"
      >
        Next
        <i class="pi pi-arrow-right"></i>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { clearKeyStoreData } from '@/utils/indexedDB'

const route = useRoute()
const formRoutes = ['/filters/general', '/filters/traits', '/filters/ecology']
const actualRoute = computed(() => route.fullPath)
const actualRouteIndex = computed(() => formRoutes.indexOf(actualRoute.value))
const nextRoute = computed(() =>
  actualRouteIndex.value < 2 ? formRoutes[actualRouteIndex.value + 1] : formRoutes[2]
)
const previousRoute = computed(() =>
  actualRouteIndex.value > 0 ? formRoutes[actualRouteIndex.value - 1] : formRoutes[0]
)

defineProps<{
  isLoading: boolean
}>()
</script>
