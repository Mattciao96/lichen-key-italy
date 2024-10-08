<template>
  <ul class="relative m-0 flex list-none items-center justify-between overflow-x-auto p-0">
    <template v-for="(item, index) in navItems" :key="item.to">
      <li
        v-if="index > 0"
        :class="[
          'mx-1 h-[2px] w-full flex-1 transition-shadow duration-200',
          isStepCompleted(index - 1) ? 'bg-primary-500' : 'bg-surface-200 dark:bg-surface-700'
        ]"
      ></li>
      <li class="relative flex flex-initial items-center p-1">
        <RouterLink
          :to="item.to"
          class="text-decoration-none inline-flex items-center rounded-md border-0 border-none bg-transparent text-surface-500 outline-none transition transition-shadow duration-200 focus-visible:ring"
          v-slot="{ isActive }"
        >
          <span
            :class="[
              'line-height-[2rem] flex h-[2rem] min-w-[2rem] items-center justify-center rounded-full border-2 border-solid text-lg transition transition-colors transition-shadow duration-200',
              isActive
                ? '!border-primary-500 bg-primary-500 text-white'
                : isStepCompleted(index)
                  ? 'border-primary-500 bg-white text-primary-500'
                  : 'border-surface-200 text-surface-500 dark:border-surface-700'
            ]"
          >
            {{ index + 1 }}
          </span>
          <span
            :class="[
              'ml-2 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-medium transition transition-colors transition-shadow duration-200',
              isActive
                ? 'text-primary-500'
                : isStepCompleted(index)
                  ? 'text-primary-500'
                  : 'text-surface-500'
            ]"
            >{{ item.label }}</span
          >
        </RouterLink>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const navItems = [
  { to: '/filters/general', label: 'General' },
  { to: '/filters/traits', label: 'Traits' },
  { to: '/filters/ecology', label: 'Ecology' }
]

const currentStepIndex = computed(() => {
  return navItems.findIndex((item) => item.to === route.path)
})

const isStepCompleted = (index: number) => {
  return index < currentStepIndex.value
}
</script>
