<template>
  <div>
    <button
      @click="openModal"
      class="h-10 w-32 rounded-full bg-surface-100 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-200"
    >
      See Filters
    </button>

    <!-- Modal Overlay -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isModalOpen"
        @click="closeModal"
        class="fixed inset-0 z-[999999] flex items-center justify-center bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
        <div @click.stop class="mx-1 flex h-[80vh] w-full max-w-2xl flex-col rounded-lg bg-white">
          <!-- Fixed Header -->
          <div class="border-b border-surface-200 p-4">
            <h2 class="text-2xl font-semibold">Selected Filters</h2>
          </div>

          <!-- Scrollable Content -->
          <div class="flex-grow overflow-y-auto px-1 py-4 sm:px-4">
            <ul class="space-y-2 text-sm">
              <li
                v-for="filter in selectedFilters"
                :key="filter.id"
                class="relative rounded bg-surface-100 p-3 pr-6"
              >
                <span class="font-semibold">{{ filter.title }}:</span> {{ filter.text }}
                <ClearButtonFilter :storeFieldId="filter.id" />
              </li>
            </ul>
          </div>

          <!-- Fixed Footer -->
          <div class="grid grid-cols-2 gap-4 border-t border-surface-200 p-4">
            <button
              @click="closeModal"
              class="w-full rounded border border-surface-300 bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Close
            </button>
            <button
              type="submit"
              form="filter-form"
              class="w-full rounded border border-surface-300 bg-primary-500 px-4 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useFormStore } from '@/stores/formStore'

import ClearButtonFilter from '@/components/form/ClearButtonFilter.vue'

const formStore = useFormStore()
const isModalOpen = ref(false)

const selectedFilters = computed(() => formStore.getSelectedFiltersWithDetails())

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// Function to toggle body scroll
const toggleBodyScroll = (disable) => {
  if (disable) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// Watch for changes in isModalOpen and toggle body scroll accordingly
watch(isModalOpen, (newValue) => {
  toggleBodyScroll(newValue)
})

// Ensure body scroll is re-enabled when component is unmounted
onUnmounted(() => {
  toggleBodyScroll(false)
})
</script>
