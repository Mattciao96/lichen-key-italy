<!-- LazyImage.vue -->
<template>
  <div class="lazy-image-container" ref="containerRef">
    <img
      v-if="shouldLoad"
      :src="src"
      :alt="alt"
      @load="onImageLoaded"
      class="lazy-image"
      :class="{ 'lazy-image-loaded': hasLoaded }"
    />
    <img v-else :src="placeholder" :alt="alt" class="lazy-image placeholder" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
  src: string
  alt: string
  placeholder: string
}>()

const isIntersecting = ref(false)
const hasLoaded = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const shouldLoad = computed(() => isIntersecting.value || hasLoaded.value)

const onImageLoaded = () => {
  hasLoaded.value = true
}

let observer: IntersectionObserver | null = null

const checkInitialVisibility = () => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0
    if (isVisible) {
      isIntersecting.value = true
    }
  }
}

onMounted(() => {
  checkInitialVisibility()

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isIntersecting.value = true
        observer?.unobserve(entries[0].target)
      }
    },
    { rootMargin: '200px' }
  )

  if (containerRef.value && !isIntersecting.value) {
    observer.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.lazy-image-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.lazy-image,
.placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease-in-out;
}

.lazy-image {
  opacity: 0;
}

.lazy-image-loaded {
  opacity: 1;
}

.placeholder {
  opacity: 1;
}
</style>
