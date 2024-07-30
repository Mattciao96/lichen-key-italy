<template>
  <CopyToClipBoardButton
    :steps-list="props.stepsList"
    @copy-success="onCopySuccess"
    @copy-error="onCopyError"
  />
  <div class="steps-table-container mx-auto w-[96vw] max-w-[1200px]">
    <table class="w-full border border-gray-300 bg-white">
      <thead class="sticky top-0 z-10 bg-white">
        <tr class="bg-gray-100">
          <th class="w-[10%] border-b p-1">Couplet</th>
          <th class="w-[70%] border-b p-1">Lead Text</th>
          <th class="w-[20%] border-b p-1">Lead to</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in visibleSteps" :key="item.leadId">
          <tr class="hover:bg-gray-50">
            <td class="w-[10%] border-b p-1" :id="`couplet${item.parentId}`">
              {{ item.parentId }}
            </td>
            <td class="w-[70%] border-b p-1" v-html="item.leadText"></td>
            <td class="w-[20%] border-b p-1">
              <a
                @click.prevent="scrollToAnchor(item.leadId)"
                href="#"
                class="text-blue-500 hover:underline"
                >{{ item.leadId }}</a
              >
            </td>
          </tr>
          <tr v-if="item.species_description" class="hover:bg-gray-50">
            <td class="w-[2%] border-b p-1"></td>
            <td class="w-[65%] border-b p-1">
              <span class="text-xs"><b>Description:</b></span>
              <span class="text-xs" v-html="item.species_description"> </span>
            </td>
            <td class="w-[10%] border-b p-1">
              <img
                v-if="item.speciesImage"
                :src="getSpeciesUrl(item.speciesImage)"
                alt="Species Image"
                loading="lazy"
                class="h- w-full rounded-sm object-contain"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div ref="loadMoreTrigger" class="load-more-trigger"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import placeholderImage from '@/assets/placeholder.svg'
import CopyToClipBoardButton from '@/components/key/CopyToClipBoardButton.vue'

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

const getImageUrl = (imagePath: string) => `https://italic.units.it/flora/${imagePath}`

const getSpeciesUrl = (imagePath: string | null) => {
  if (!imagePath) {
    return placeholderImage
  }
  const path = imagePath.split('/')
  path.splice(2, 1, 'thumbnails')
  return `https://italic.units.it/flora/${path.join('/')}`
}

const scrollToAnchor = async (leadId: number) => {
  let found = false

  // First, check if the element is already in the visible steps
  const targetElement = document.getElementById(`couplet${leadId}`)
  if (targetElement) {
    found = true
    scrollToElement(targetElement)
  } else {
    // If not found, load batches until found or all data is loaded
    while (currentIndex.value < props.stepsList.length && !found) {
      // Load the next batch
      const nextBatch = props.stepsList.slice(currentIndex.value, currentIndex.value + CHUNK_SIZE)
      visibleSteps.value.push(...nextBatch)
      currentIndex.value += CHUNK_SIZE

      // Wait for the DOM to update
      await new Promise((resolve) => setTimeout(resolve, 50))

      // Check if the target element is now in the DOM
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

  // Highlight the row temporarily
  element.parentElement?.classList.add('highlight')
  setTimeout(() => {
    element.parentElement?.classList.remove('highlight')
  }, 2000)
}

// for copy to clipboard
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

/* Ensure the sticky header works correctly */
thead {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
}

/* Optional: Add some spacing at the bottom of the table for better UX */
.steps-table-container::after {
  content: '';
  display: block;
  height: 50px;
}
</style>
