<template>
  <div>
    <CopyToClipBoardButton
      :steps-list="props.stepsList"
      @copy-success="onCopySuccess"
      @copy-error="onCopyError"
    />

    <div class="mb-4">
      <button
        @click="toggleVisualization('detailed')"
        class="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Detailed
      </button>
      <button
        @click="toggleVisualization('simple')"
        class="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Simple
      </button>
      <button
        @click="toggleVisualization('description')"
        class="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Description
      </button>
    </div>
    <div class="steps-table-container w-[96vw] max-w-[1200px] mx-auto">
      <component
        :is="currentVisualization"
        :visible-steps="visibleSteps"
        @scroll-to-anchor="scrollToAnchor"
      />
      <div ref="loadMoreTrigger" class="load-more-trigger"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import CopyToClipBoardButton from '@/components/key/CopyToClipBoardButton.vue'
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

const visibleSteps = ref<KeyItem[]>([])
const loadMoreTrigger = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
const CHUNK_SIZE = 50
const visualizationType = ref<'detailed' | 'simple' | 'description'>('detailed')

const currentVisualization = computed(() => {
  switch (visualizationType.value) {
    case 'detailed':
      return DetailedKeyTable
    case 'simple':
      return SimpleKeyTable
    case 'description':
      return KeyTableDescriptions
    default:
      return DetailedKeyTable
  }
})

const toggleVisualization = (type) => {
  visualizationType.value = type
  visibleSteps.value = []
  currentIndex.value = 0
  loadMoreSteps()
}

const loadMoreSteps = () => {
  const nextChunk = props.stepsList.slice(currentIndex.value, currentIndex.value + CHUNK_SIZE)
  visibleSteps.value.push(...nextChunk)
  currentIndex.value += CHUNK_SIZE
}

const handleScroll = () => {
  if (!loadMoreTrigger.value) return
  const rect = loadMoreTrigger.value.getBoundingClientRect()
  if (rect.top <= window.innerHeight && currentIndex.value < props.stepsList.length) {
    loadMoreSteps()
  }
}

onMounted(() => {
  loadMoreSteps()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(
  () => props.stepsList,
  () => {
    visibleSteps.value = []
    currentIndex.value = 0
    loadMoreSteps()
  },
  { deep: true }
)

const scrollToAnchor = async (leadId: number) => {
  let found = false

  const targetElement = document.getElementById(`couplet${leadId}`)
  if (targetElement) {
    found = true
    scrollToElement(targetElement)
  } else {
    while (currentIndex.value < props.stepsList.length && !found) {
      const nextBatch = props.stepsList.slice(currentIndex.value, currentIndex.value + CHUNK_SIZE)
      visibleSteps.value.push(...nextBatch)
      currentIndex.value += CHUNK_SIZE

      await new Promise((resolve) => setTimeout(resolve, 50))

      const newTargetElement = document.getElementById(`couplet${leadId}`)
      if (newTargetElement) {
        found = true
        scrollToElement(newTargetElement)
      }
    }
  }

  if (!found) {
    console.log(`Element with leadId ${leadId} not found`)
  }
}

const scrollToElement = (element: HTMLElement) => {
  element.scrollIntoView({ behavior: 'smooth', block: 'center' })

  element.parentElement?.classList.add('highlight')
  setTimeout(() => {
    element.parentElement?.classList.remove('highlight')
  }, 2000)
}

const onCopySuccess = () => {
  alert('Table copied to clipboard!')
}

const onCopyError = (error: Error) => {
  console.error('Failed to copy table: ', error)
  alert('Failed to copy table. Please try again.')
}
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
