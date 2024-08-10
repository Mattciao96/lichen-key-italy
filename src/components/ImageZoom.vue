<template>
  <div class="relative h-[500px] w-full">
    <div
      ref="imageContainer"
      class="h-full w-full cursor-move overflow-hidden"
      @mousedown="startPan"
      @mousemove="pan"
      @mouseup="endPan"
      @mouseleave="endPan"
      @wheel="zoom"
    >
      <img
        :src="props.imageSrc"
        :style="{ transform: `scale(${zoomLevel}) translate(${panX}px, ${panY}px)` }"
        class="max-h-none max-w-none"
        alt="Zoomable image"
      />
    </div>
    <div class="absolute bottom-2 right-2 h-36 w-36 overflow-hidden border-2 border-gray-700">
      <img :src="props.imageSrc" alt="Mini map" class="h-full w-full object-cover" />
      <div
        class="pointer-events-none absolute left-0 top-0 border-2 border-red-500"
        :style="{
          width: `${100 / zoomLevel}%`,
          height: `${100 / zoomLevel}%`,
          transform: `translate(${-panX / zoomLevel}%, ${-panY / zoomLevel}%)`
        }"
      ></div>
    </div>
    <div class="absolute right-2 top-2 space-x-2">
      <button
        @click="zoomIn"
        class="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        +
      </button>
      <button
        @click="zoomOut"
        class="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        -
      </button>
      <button
        @click="resetZoom"
        class="rounded bg-gray-500 px-2 py-1 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  imageSrc: string
}>()

const zoomLevel = ref(1)
const panX = ref(0)
const panY = ref(0)
const isPanning = ref(false)
const startX = ref(0)
const startY = ref(0)
const imageContainer = ref<HTMLDivElement | null>(null)

const zoom = (event: WheelEvent) => {
  event.preventDefault()
  const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1
  zoomLevel.value = Math.max(1, Math.min(10, zoomLevel.value * zoomFactor))
}

const zoomIn = () => {
  zoomLevel.value = Math.min(10, zoomLevel.value * 1.1)
}

const zoomOut = () => {
  zoomLevel.value = Math.max(1, zoomLevel.value * 0.9)
}

const resetZoom = () => {
  zoomLevel.value = 1
  panX.value = 0
  panY.value = 0
}

const startPan = (event: MouseEvent) => {
  isPanning.value = true
  startX.value = event.clientX - panX.value
  startY.value = event.clientY - panY.value
}

const pan = (event: MouseEvent) => {
  if (isPanning.value) {
    panX.value = event.clientX - startX.value
    panY.value = event.clientY - startY.value
  }
}

const endPan = () => {
  isPanning.value = false
}

onMounted(() => {
  if (imageContainer.value) {
    imageContainer.value.style.overflow = 'hidden'
  }
})
</script>
