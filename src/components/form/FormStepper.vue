<template>
  <ul class="flex justify-between items-center m-0 p-0 relative list-none overflow-x-auto">
    <li class="relative flex items-center flex-initial p-1">
      <RouterLink
        to="/filter-area"
        class="focus-visible:ring text-surface-500 border-0 border-none inline-flex items-center text-decoration-none transition transition-shadow duration-200 rounded-md bg-transparent outline-none"
        v-slot="{ isActive }"
      >
        <span
          :class="[
            'flex items-center justify-center border-solid border-2 border-surface-200 dark:border-surface-700 min-w-[2rem] h-[2rem] line-height-[2rem] rounded-full text-lg transition transition-colors transition-shadow duration-200',
            isActive ? 'text-primary-500 border-primary-500' : 'text-surface-500'
          ]"
          >1</span
        >
        <span
          :class="[
            'block whitespace-nowrap overflow-hidden text-ellipsis max-w-full ml-2 font-medium transition transition-colors transition-shadow duration-200',
            isActive ? 'text-primary-500' : 'text-surface-500'
          ]"
          >Area</span
        >
      </RouterLink>
    </li>
    <li
      class="bg-surface-200 dark:bg-surface-700 flex-1 w-full h-[2px] mx-1 transition-shadow duration-200"
    ></li>
    <li class="relative flex items-center flex-initial p-1">
      <RouterLink
        to="/filter-ecology"
        class="focus-visible:ring text-surface-500 border-0 border-none inline-flex items-center text-decoration-none transition transition-shadow duration-200 rounded-md bg-transparent outline-none"
        v-slot="{ isActive }"
      >
        <span
          :class="[
            'flex items-center justify-center border-solid border-2 border-surface-200 dark:border-surface-700 min-w-[2rem] h-[2rem] line-height-[2rem] rounded-full text-lg transition transition-colors transition-shadow duration-200',
            isActive ? 'text-primary-500 border-primary-500' : 'text-surface-500'
          ]"
          >2</span
        >
        <span
          :class="[
            'block whitespace-nowrap overflow-hidden text-ellipsis max-w-full ml-2 font-medium transition transition-colors transition-shadow duration-200',
            isActive ? 'text-primary-500' : 'text-surface-500'
          ]"
          >Ecology</span
        >
      </RouterLink>
    </li>
    <li
      class="bg-surface-200 dark:bg-surface-700 flex-1 w-full h-[2px] mx-1 transition-shadow duration-200"
    ></li>
    <li class="relative flex items-center flex-initial p-1">
      <RouterLink
        to="/filter-traits"
        class="focus-visible:ring text-surface-500 border-0 border-none inline-flex items-center text-decoration-none transition transition-shadow duration-200 rounded-md bg-transparent outline-none"
        v-slot="{ isActive }"
      >
        <span
          :class="[
            'flex items-center justify-center border-solid border-2 border-surface-200 dark:border-surface-700 min-w-[2rem] h-[2rem] line-height-[2rem] rounded-full text-lg transition transition-colors transition-shadow duration-200',
            isActive ? 'text-primary-500 border-primary-500' : 'text-surface-500'
          ]"
          >3</span
        >
        <span
          :class="[
            'block whitespace-nowrap overflow-hidden text-ellipsis max-w-full ml-2 font-medium transition transition-colors transition-shadow duration-200',
            isActive ? 'text-primary-500' : 'text-surface-500'
          ]"
          >Traits</span
        >
      </RouterLink>
    </li>
  </ul>
</template>

<script setup>
import { RouterLink } from 'vue-router'
// il terzo:
// non ha la linea dopo
// li ha il flex-initial
</script>
