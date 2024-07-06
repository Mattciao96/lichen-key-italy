<template>
  <CopyToClipBoardButton
    :steps-list="props.stepsList"
    @copy-success="onCopySuccess"
    @copy-error="onCopyError"
  />
  <div class="steps-table-container w-[96vw] max-w-[1200px] mx-auto">
    <table class="w-full bg-white border border-gray-300">
      <thead class="sticky top-0 bg-white z-10">
        <tr class="bg-gray-100">
          <th class="py-2 px-4 border-b w-[5%]">Couplet</th>
          <th class="py-2 px-4 border-b w-[60%]">Lead Text</th>
          <th class="py-2 px-4 border-b w-[15%]">Images</th>
          <th class="py-2 px-4 border-b w-[20%]">Lead to</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in visibleSteps" :key="item.leadId" class="hover:bg-gray-50">
          <td class="py-2 px-4 border-b w-[5%]" :id="`couplet${item.parentId}`">
            {{ item.parentId }}
          </td>
          <td class="py-2 px-4 border-b w-[60%]" v-html="item.leadText"></td>
          <td class="py-2 px-4 border-b w-[15%]">
            <img
              v-if="item.leadImage"
              :src="getImageUrl(item.leadImage)"
              loading="lazy"
              alt="Lead Image"
              class="w-full h-20 object-contain"
            />
            <img
              v-if="item.speciesImage"
              :src="getSpeciesUrl(item.speciesImage)"
              alt="Species Image"
              loading="lazy"
              class="w-full h-20 object-contain mt-1"
            />
          </td>
          <td class="py-2 px-4 border-b w-[20%]">
            <a
              @click.prevent="scrollToAnchor(item.leadId)"
              href="#"
              class="text-blue-500 hover:underline"
              >{{ item.leadId }}</a
            >
          </td>
        </tr>
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
  const batchSize = 50
  let found = false

  while (currentIndex.value < props.stepsList.length && !found) {
    // Load the next batch
    const nextBatch = props.stepsList.slice(currentIndex.value, currentIndex.value + batchSize)
    visibleSteps.value.push(...nextBatch)
    currentIndex.value += batchSize

    // Wait for the DOM to update
    await new Promise((resolve) => setTimeout(resolve, 0))

    // Check if the target element is in this batch
    const targetElement = document.getElementById(`couplet${leadId}`)
    if (targetElement) {
      found = true

      // Scroll to the element
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })

      // Highlight the row temporarily
      targetElement.parentElement?.classList.add('highlight')
      setTimeout(() => {
        targetElement.parentElement?.classList.remove('highlight')
      }, 2000)
    }
  }

  if (!found) {
    console.log(`Element with leadId ${leadId} not found`)
  }
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
