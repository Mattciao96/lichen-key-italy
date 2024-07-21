// src/composables/useInfiniteScroll.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useInfiniteScroll(loadMore: () => void, options = { rootMargin: '200px' }) {
  const loadMoreTrigger = ref<HTMLElement | null>(null)
  const allLoaded = ref(false)

  let observer: IntersectionObserver | null = null

  const setupIntersectionObserver = () => {
    if (observer) {
      observer.disconnect()
    }

    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !allLoaded.value) {
        loadMore()
      }
    }, options)

    if (loadMoreTrigger.value) {
      observer.observe(loadMoreTrigger.value)
    }
  }

  onMounted(setupIntersectionObserver)

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    loadMoreTrigger,
    allLoaded,
    setupIntersectionObserver
  }
}
