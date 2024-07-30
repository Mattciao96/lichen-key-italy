<template>
  <ul class="relative m-0 flex list-none items-center justify-between overflow-x-auto p-0">
    <li class="relative flex flex-initial items-center p-1">
      <RouterLink
        to="/filter-area"
        class="text-decoration-none inline-flex items-center rounded-md border-0 border-none bg-transparent text-surface-500 outline-none transition transition-shadow duration-200 focus-visible:ring"
        v-slot="{ isActive }"
      >
        <span
          :class="[
            'line-height-[2rem] flex h-[2rem] min-w-[2rem] items-center justify-center rounded-full border-2 border-solid border-surface-200 text-lg transition transition-colors transition-shadow duration-200 dark:border-surface-700',
            isActive ? '!border-primary-500 text-primary-500' : 'text-surface-500'
          ]"
          >1</span
        >
        <span
          :class="[
            'ml-2 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-medium transition transition-colors transition-shadow duration-200',
            isActive ? 'text-primary-500' : 'text-surface-500'
          ]"
          >Area</span
        >
      </RouterLink>
    </li>
    <li
      class="mx-1 h-[2px] w-full flex-1 bg-surface-200 transition-shadow duration-200 dark:bg-surface-700"
    ></li>
    <li class="relative flex flex-initial items-center p-1">
      <RouterLink
        to="/filter-traits"
        class="text-decoration-none inline-flex items-center rounded-md border-0 border-none bg-transparent text-surface-500 outline-none transition transition-shadow duration-200 focus-visible:ring"
        v-slot="{ isActive }"
      >
        <span
          :class="[
            'line-height-[2rem] flex h-[2rem] min-w-[2rem] items-center justify-center rounded-full border-2 border-solid border-surface-200 text-lg transition transition-colors transition-shadow duration-200 dark:border-surface-700',
            isActive ? '!border-primary-500 text-primary-500' : 'text-surface-500'
          ]"
          >2</span
        >
        <span
          :class="[
            'ml-2 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-medium transition transition-colors transition-shadow duration-200',
            isActive ? 'text-primary-500' : 'text-surface-500'
          ]"
          >Traits</span
        >
      </RouterLink>
    </li>
    <li
      class="mx-1 h-[2px] w-full flex-1 bg-surface-200 transition-shadow duration-200 dark:bg-surface-700"
    ></li>
    <li class="relative flex flex-initial items-center p-1">
      <RouterLink
        to="/filter-ecology"
        class="text-decoration-none inline-flex items-center rounded-md border-0 border-none bg-transparent text-surface-500 outline-none transition transition-shadow duration-200 focus-visible:ring"
        v-slot="{ isActive }"
      >
        <span
          :class="[
            'line-height-[2rem] flex h-[2rem] min-w-[2rem] items-center justify-center rounded-full border-2 border-solid border-surface-200 text-lg transition transition-colors transition-shadow duration-200 dark:border-surface-700',
            isActive ? '!border-primary-500 text-primary-500' : 'text-surface-500'
          ]"
          >3</span
        >
        <span
          :class="[
            'ml-2 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-medium transition transition-colors transition-shadow duration-200',
            isActive ? 'text-primary-500' : 'text-surface-500'
          ]"
          >Ecology</span
        >
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
