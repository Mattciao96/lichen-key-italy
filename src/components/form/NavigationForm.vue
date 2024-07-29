<template>
  <div>
    <div class="hidden lg:block mt-8 mb-12">
      <div class="max-w-4xl mx-auto px-8">
        <div class="grid grid-cols-3 items-center h-20">
          <div class="justify-self-start">
            <button
              v-if="actualRouteIndex > 0"
              @click="goToPrevious"
              class="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <i class="pi pi-chevron-left mr-2"></i>
              Previous
            </button>
          </div>

          <div class="justify-self-center flex space-x-4">
            <button
              v-if="actualRouteIndex === 2"
              type="submit"
              form="filter-form"
              :disabled="isLoading"
              class="px-6 py-2 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors"
            >
              Submit
            </button>
            <button
              v-if="actualRouteIndex === 2"
              type="submit"
              form="filter-form"
              @click="clearKeyStoreData"
              :disabled="isLoading"
              class="px-6 py-2 bg-secondary-500 text-white rounded-full text-sm font-medium hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-opacity-50 transition-colors"
            >
              Submit and refresh
            </button>
            <button
              v-if="actualRouteIndex !== 2"
              @click="toggleFilters"
              class="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              See Filters
            </button>
          </div>

          <div class="justify-self-end">
            <button
              v-if="actualRouteIndex < 2"
              @click="goToNext"
              class="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Next
              <i class="pi pi-chevron-right ml-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile view -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div class="grid grid-cols-3 items-center h-16 px-4">
        <div class="justify-self-start">
          <button
            v-if="actualRouteIndex > 0"
            @click="goToPrevious"
            class="w-10 h-10 flex items-center justify-center text-gray-600"
          >
            <i class="pi pi-chevron-left text-xl"></i>
          </button>
        </div>

        <div class="justify-self-center">
          <button
            @click="toggleFilters"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
          >
            See Filters
          </button>
        </div>

        <div class="justify-self-end">
          <button
            v-if="actualRouteIndex < 2"
            @click="goToNext"
            class="w-10 h-10 flex items-center justify-center text-gray-600"
          >
            <i class="pi pi-chevron-right text-xl"></i>
          </button>
          <button
            v-else
            type="submit"
            form="filter-form"
            :disabled="isLoading"
            class="px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { clearKeyStoreData } from '@/utils/indexedDB'

const router = useRouter()
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

const goToPrevious = () => {
  if (actualRouteIndex.value > 0) {
    router.push(formRoutes[actualRouteIndex.value - 1])
  }
}

const goToNext = () => {
  if (actualRouteIndex.value < 2) {
    router.push(formRoutes[actualRouteIndex.value + 1])
  }
}

const toggleFilters = () => {
  // Implement your filter toggle logic here
  console.log('Toggle filters')
}

defineProps<{
  isLoading: boolean
}>()
</script>
