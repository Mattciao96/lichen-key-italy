<template>
  <div>
    <div class="mb-4 flex flex-wrap gap-2 justify-end">
      <RouterLink
        v-for="viewOption in viewOptions"
        :key="viewOption.name"
        :to="{ name: 'key-view', params: { keyId: $route.params.keyId, view: viewOption.name } }"
        class="px-3 py-2 text-sm font-medium rounded transition duration-150 ease-in-out border border-surface-300 bg-white text-surface-700 hover:bg-primary-500/30"
        activeClass="!bg-primary-500 text-white border-green-500 hover:bg-primary-600"
      >
        {{ viewOption.label }}
      </RouterLink>
    </div>
    <div class="steps-table-container w-[96vw] max-w-[1200px] mx-auto">
      <component
        :is="currentVisualization"
        :visible-steps="displayedData"
        @scroll-to-anchor="scrollToAnchor"
      />
      <div v-if="!allLoaded" ref="loadMoreTrigger" class="load-more-trigger"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePaginatedData } from '@/composables/usePaginatedData'
import DetailedKeyTable from '@/components/key/DetailedKeyTable.vue'
import SimpleKeyTable from '@/components/key/SimpleKeyTable.vue'
import KeyTableDescriptions from '@/components/key/KeyTableDescriptions.vue'

interface KeyItem {
  leadId: number
  parentId: number
  leadText: string
  leadImage: string | null
  speciesImage: string | null
  species_description: string | null
}

const props = defineProps<{
  stepsList: KeyItem[]
}>()

const route = useRoute()

const viewOptions = [
  { name: 'detailed', label: 'Detailed' },
  { name: 'simple', label: 'Simple' },
  { name: 'description', label: 'Description' }
]

const currentView = computed(() => (route.params.view as string) || 'detailed')

const currentVisualization = computed(() => {
  switch (currentView.value) {
    case 'simple':
      return SimpleKeyTable
    case 'description':
      return KeyTableDescriptions
    default:
      return DetailedKeyTable
  }
})

const {
  displayedData,
  allLoaded,
  loadMoreTrigger,
  setupIntersectionObserver,
  scrollToAnchor,
  resetAndReload
} = usePaginatedData(() => props.stepsList, 50, 'leadId')

let disconnectObserver = setupIntersectionObserver()

onMounted(() => {
  resetAndReload()
  window.removeEventListener('scroll', handleScroll)
  window.addEventListener('scroll', handleScroll)
})

/*onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})*/

const handleScroll = () => {
  disconnectObserver()
  disconnectObserver = setupIntersectionObserver()
}

watch(
  () => route.params.view,
  () => {
    resetAndReload()
  }
)
</script>

<style scoped>
.steps-table-container {
  width: 100%;
}

.load-more-trigger {
  height: 20px;
}

.highlight {
  background-color: #fff3cd;
  transition: background-color 0.5s ease;
}

.steps-table-container::after {
  content: '';
  display: block;
  height: 50px;
}
</style>
