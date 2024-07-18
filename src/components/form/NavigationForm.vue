<template>
  <div class="flex justify-around my-4">
    <RouterLink
      :to="previousRoute ? previousRoute : actualRoute"
      :class="[
        'lg:w-32  px-2 py-2 bg-gray-200 border border-gray-300 rounded-md  flex items-center justify-center gap-2',
        { 'opacity-50 cursor-not-allowed': previousRoute === null }
      ]"
      :disabled="previousRoute === null"
      :aria-disabled="previousRoute === null"
    >
      <i class="pi pi-arrow-left"></i>
      Previous
    </RouterLink>

    <button
      type="submit"
      form="filter-form"
      :disabled="isLoading"
      class="lg:w-32 px-2 py-2 flex items-center justify-center bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Submit
    </button>

    <RouterLink
      :to="nextRoute ? nextRoute : actualRoute"
      :class="[
        'lg:w-32 px-2 py-2 bg-gray-200 border border-gray-300 rounded-md text-black flex items-center justify-center gap-2',
        { 'opacity-50 cursor-not-allowed': nextRoute === null }
      ]"
      :disabled="nextRoute === null"
      :aria-disabled="nextRoute === null"
    >
      Next
      <i class="pi pi-arrow-right"></i>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const formRoutes = ['/filter-area', '/filter-ecology', '/filter-traits']
const actualRoute = computed(() => route.fullPath)
const actualRouteIndex = computed(() => formRoutes.indexOf(actualRoute.value))
const nextRoute = computed(() =>
  actualRouteIndex.value === 2 ? null : formRoutes[actualRouteIndex.value + 1]
)
const previousRoute = computed(() =>
  actualRouteIndex.value === 0 ? null : formRoutes[actualRouteIndex.value - 1]
)

defineProps<{
  isLoading: boolean
}>()
</script>
