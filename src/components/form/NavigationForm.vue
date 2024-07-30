<template>
  <div>
    <div class="hidden md:block w-full max-w-4xl mt-4 px-2 mx-auto">
      <div class="grid grid-cols-3 place-items-center h-10">
        <div class="justify-self-start">
          <button
            v-if="actualRouteIndex > 0"
            @click="goToPrevious"
            class="w-32 h-10 bg-surface-100 text-surface-700 rounded-full text-sm font-medium hover:bg-surface-200 transition-colors"
          >
            <i class="pi pi-chevron-left mr-2"></i>
            Previous
          </button>
        </div>

        <div class="justify-self-center flex space-x-4">
          <div class="justify-self-center">
            <FilterModal v-if="Object.keys(formStore.formData).length !== 0" />
          </div>
        </div>

        <div class="justify-self-end">
          <button
            v-if="actualRouteIndex < 2"
            @click="goToNext"
            class="w-32 h-10 bg-surface-100 text-surface-700 rounded-full text-sm font-medium hover:bg-surface-200 transition-colors"
          >
            Next
            <i class="pi pi-chevron-right ml-2"></i>
          </button>
          <div v-if="actualRouteIndex === 2" class="flex gap-2">
            <button
              type="submit"
              form="filter-form"
              :disabled="isLoading"
              class="w-32 h-10 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors"
            >
              Submit
            </button>
            <button
              type="submit"
              form="filter-form"
              :disabled="isLoading"
              class="w-32 h-10 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors"
            >
              Submit / refresh
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile view -->
    <div
      v-if="hasMobileMenu"
      class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-surface-300"
    >
      <div class="grid grid-cols-3 items-center h-14 px-4">
        <div class="justify-self-start">
          <button
            v-if="actualRouteIndex > 0"
            @click="goToPrevious"
            class="w-10 h-10 flex items-center justify-center text-surface-600"
          >
            <i class="pi pi-chevron-left text-xl"></i>
          </button>
        </div>

        <div class="justify-self-center">
          <FilterModal v-if="Object.keys(formStore.formData).length !== 0" />
        </div>

        <div class="justify-self-end">
          <button
            v-if="actualRouteIndex < 2"
            @click="goToNext"
            class="w-10 h-10 flex items-center justify-center text-surface-600"
          >
            <i class="pi pi-chevron-right text-xl"></i>
          </button>
          <button
            v-if="actualRouteIndex === 2"
            type="submit"
            form="filter-form"
            :disabled="isLoading"
            class="w-20 h-10 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors"
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
import { useRouter, useRoute } from 'vue-router'
import FilterModal from '@/components/form/FilterModal.vue'
import { useFormStore } from '@/stores/formStore'

const router = useRouter()
const route = useRoute()
const formStore = useFormStore()

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
  hasMobileMenu: boolean
}>()
</script>
