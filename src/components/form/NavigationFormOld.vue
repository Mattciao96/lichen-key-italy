<template>
  <div>
    <div class="mx-auto mt-4 hidden w-full max-w-4xl px-2 md:block">
      <div class="grid h-10 grid-cols-3 place-items-center">
        <div class="justify-self-start">
          <button
            v-if="actualRouteIndex > 0"
            @click="goToPrevious"
            class="flex h-8 w-8 items-center justify-center rounded-full bg-surface-100 text-surface-700 transition-colors hover:bg-surface-200"
          >
            <i class="pi pi-chevron-left text-sm"></i>
          </button>
        </div>

        <div class="flex space-x-4 justify-self-center">
          <FilterModal v-if="Object.keys(formStore.formData).length !== 0" />
          <button
            type="submit"
            form="filter-form"
            :disabled="isLoading"
            class="w h-10 rounded-full bg-surface-100 px-4 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-200 focus:outline-none focus:ring-2 focus:ring-surface-300 focus:ring-opacity-50"
          >
            Make key
          </button>
        </div>

        <div class="justify-self-end">
          <button
            v-if="actualRouteIndex < 2"
            @click="goToNext"
            class="flex h-8 w-8 items-center justify-center rounded-full bg-surface-100 text-surface-700 transition-colors hover:bg-surface-200"
          >
            <i class="pi pi-chevron-right text-sm"></i>
          </button>
          <button
            v-if="actualRouteIndex === 2"
            @click="clearKeyStoreData"
            :disabled="isLoading"
            class="h-8 w-8 rounded-full bg-surface-100 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-200 focus:outline-none focus:ring-2 focus:ring-surface-300 focus:ring-opacity-50"
          >
            <i class="pi pi-refresh text-sm"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile view -->
    <div
      v-if="hasMobileMenu"
      class="fixed bottom-0 left-0 right-0 border-t border-surface-300 bg-white md:hidden"
    >
      <div class="grid h-14 grid-cols-[35px_1fr_35px] items-center px-4">
        <div class="justify-self-start">
          <button
            v-if="actualRouteIndex > 0"
            @click="goToPrevious"
            class="flex h-8 w-8 items-center justify-center text-surface-600"
          >
            <i class="pi pi-chevron-left text-sm"></i>
          </button>
        </div>

        <div class="flex space-x-2 justify-self-center">
          <FilterModal v-if="Object.keys(formStore.formData).length !== 0" />
          <button
            type="submit"
            form="filter-form"
            :disabled="isLoading"
            class="h-10 rounded-full bg-surface-100 px-4 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-200 focus:outline-none focus:ring-2 focus:ring-surface-300 focus:ring-opacity-50"
          >
            Make key
          </button>
        </div>

        <div class="justify-self-end">
          <button
            v-if="actualRouteIndex < 2"
            @click="goToNext"
            class="flex h-8 w-8 items-center justify-center text-surface-600"
          >
            <i class="pi pi-chevron-right text-sm"></i>
          </button>
          <button
            v-if="actualRouteIndex === 2"
            @click="clearKeyStoreData"
            :disabled="isLoading"
            class="flex h-8 w-8 items-center justify-center rounded-full bg-surface-100 text-surface-700 transition-colors hover:bg-surface-200 focus:outline-none focus:ring-2 focus:ring-surface-300 focus:ring-opacity-50"
          >
            <i class="pi pi-refresh text-sm"></i>
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
import { clearKeyStoreData } from '@/utils/indexedDB'

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

defineProps<{
  isLoading: boolean
  hasMobileMenu: boolean
}>()
</script>
