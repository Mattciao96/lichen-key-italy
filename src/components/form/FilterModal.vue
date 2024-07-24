<template>
  <div>
    <!-- Button to open the modal -->
    <button
      @click="openModal"
      class="bg-primary-500 border border-surface-300 text-white px-4 py-2 rounded hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
    >
      Show Selected Filters
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
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999999]"
      >
        <!-- Modal Content -->
        <div @click.stop class="bg-white rounded-lg w-full max-w-2xl h-[80vh] flex flex-col">
          <!-- Fixed Header -->
          <div class="p-4 border-b border-gray-200">
            <h2 class="text-2xl font-semibold">Selected Filters</h2>
          </div>

          <!-- Scrollable Content -->
          <div class="flex-grow overflow-y-auto px-1 sm:px-4 py-4">
            <ul class="space-y-2 text-sm">
              <li
                v-for="filter in selectedFilters"
                :key="filter.id"
                class="bg-gray-100 p-3 pr-6 rounded relative"
              >
                <span class="font-semibold">{{ filter.title }}:</span> {{ filter.text }}
                <ClearButtonFilter :storeFieldId="filter.id" />
              </li>
            </ul>
          </div>

          <!-- Fixed Footer -->
          <div class="p-4 border-t border-gray-200 grid grid-cols-2 gap-4">
            <button
              @click="closeModal"
              class="w-full bg-red-500 border border-surface-300 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Close
            </button>
            <button
              type="submit"
              form="filter-form"
              class="w-full bg-primary-500 border border-surface-300 text-white px-4 py-2 rounded hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
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
