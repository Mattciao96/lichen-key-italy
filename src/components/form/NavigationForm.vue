<template>
  <div>
    <!-- Desktop view -->
    <div class="mx-auto mt-4 hidden w-full max-w-4xl px-16 md:block">
      <div class="grid h-10 grid-cols-3 place-items-center">
        <div class="justify-self-start">
          <button
            v-if="actualRouteIndex > 0"
            @click="goToPrevious"
            class="flex h-10 items-center justify-center rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
          >
            <i class="pi pi-chevron-left mr-2 text-sm"></i>
            Previous step
          </button>
        </div>

        <div class="flex space-x-4 justify-self-center">
          <FilterModal
            v-if="Object.keys(formStore.formData).length !== 0 && actualRouteIndex === 2"
          />
        </div>

        <div class="justify-self-end">
          <button
            v-if="actualRouteIndex < 2"
            @click="goToNext"
            class="flex h-10 items-center justify-center rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
          >
            Next step
            <i class="pi pi-chevron-right ml-1 text-sm"></i>
          </button>
          <button
            v-else
            type="submit"
            form="filter-form"
            :disabled="isLoading"
            class="flex h-10 items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Make key
            <i class="pi pi-key ml-2 text-sm"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile view (unchanged) -->
    <div
      v-if="hasMobileMenu"
      class="fixed bottom-0 left-0 right-0 border-t border-surface-300 bg-white md:hidden"
    >
      <div class="flex h-16 items-center justify-between px-6">
        <button
          v-if="actualRouteIndex > 0"
          @click="goToPrevious"
          class="flex flex-col items-center justify-center"
        >
          <i class="pi pi-chevron-left mb-1 text-base text-primary-500"></i>
          <span class="text-sm font-medium text-primary-500">Previous</span>
        </button>
        <div v-else class="w-16"></div>

        <!--        <button
          v-if="Object.keys(formStore.formData).length !== 0 && actualRouteIndex === 2"
          @click="showFilterModal"
          class="flex flex-col items-center justify-center"
        >
          <i class="pi pi-list mb-1 text-base text-surface-600"></i>
          <span class="text-sm font-medium text-black">Your query</span>
        </button>-->
        <FilterModal
          v-if="Object.keys(formStore.formData).length !== 0 && actualRouteIndex === 2"
          buttonStyle="alternative"
        />

        <button
          v-if="actualRouteIndex < 2"
          @click="goToNext"
          class="flex flex-col items-center justify-center"
        >
          <i class="pi pi-chevron-right mb-1 text-base text-primary-500"></i>
          <span class="text-sm font-medium text-primary-500">Next</span>
        </button>
        <button
          v-else
          type="submit"
          form="filter-form"
          :disabled="isLoading"
          class="flex flex-col items-center justify-center"
        >
          <i class="pi pi-key mb-1 text-base text-blue-500"></i>
          <span class="text-sm font-medium text-blue-500">Make key</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import FilterModal from '@/components/form/FilterModal.vue'
import { useFormStore } from '@/stores/formStore'
import { clearKeyStoreData } from '@/utils/indexedDB'

const router = useRouter()
const route = useRoute()
const formStore = useFormStore()

const formRoutes = ['/filters/general', '/filters/traits', '/filters/ecology']
const actualRoute = computed(() => route.fullPath)
const actualRouteIndex = computed(() => formRoutes.indexOf(actualRoute.value))

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

const showQuery = () => {
  // Implement the logic to show the query
  console.log('Show query')
}

defineProps<{
  isLoading: boolean
  hasMobileMenu: boolean
}>()
</script>
