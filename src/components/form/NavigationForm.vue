<template>
  <div class="flex justify-around my-10">
    <RouterLink
      :to="previousRoute ? previousRoute : actualRoute"
      :class="[
        'px-4 py-2 bg-gray-200 border border-gray-300 rounded-md text-black flex items-center gap-2',
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
      class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Submit
    </button>

    <RouterLink
      :to="nextRoute ? nextRoute : actualRoute"
      :class="[
        'px-4 py-2 bg-gray-200 border border-gray-300 rounded-md text-black flex items-center gap-2',
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
import { RouterLink } from 'vue-router'

defineProps<{
  actualRoute: string
  previousRoute: string | null
  nextRoute: string | null
  isLoading: boolean
}>()
</script>
