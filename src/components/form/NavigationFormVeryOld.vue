<template>
  <div class="my-4 flex justify-around">
    <div class="px-2 py-2 lg:w-32">
      <RouterLink
        v-if="actualRouteIndex > 0"
        :to="previousRoute"
        class="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-gray-200 p-2"
      >
        <i class="pi pi-arrow-left"></i>
        Previous
      </RouterLink>
    </div>

    <div class="flex gap-4 px-2 py-2 lg:[&>button]:min-w-48">
      <button
        v-if="actualRouteIndex === 2"
        type="submit"
        form="filter-form"
        :disabled="isLoading"
        class="flex w-full items-center justify-center rounded-md bg-primary-500 p-2 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Submit
      </button>
      <button
        v-if="actualRouteIndex === 2"
        type="submit"
        form="filter-form"
        @click="clearKeyStoreData"
        :disabled="isLoading"
        class="flex w-full items-center justify-center rounded-md bg-primary-500 p-2 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Submit and refresh
      </button>
    </div>

    <div class="px-2 py-2 lg:w-32">
      <RouterLink
        v-if="actualRouteIndex < 2"
        :to="nextRoute"
        class="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-gray-200 p-2 text-black"
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
