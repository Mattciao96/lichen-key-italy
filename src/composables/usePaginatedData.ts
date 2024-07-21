// src/composables/usePaginatedData.ts
import { ref, computed, watch } from 'vue'

export function usePaginatedData<T>(sourceData: () => T[], itemsPerPage: number = 50) {
  const currentPage = ref(1)
  const allLoaded = ref(false)
  const loadMoreTrigger = ref<HTMLElement | null>(null)

  const displayedData = computed(() => {
    const data = sourceData()
    return data.slice(0, currentPage.value * itemsPerPage)
  })

  const loadMore = () => {
    if (currentPage.value * itemsPerPage >= sourceData().length) {
      allLoaded.value = true
      return
    }
    currentPage.value++
  }

  let observer: IntersectionObserver | null = null

  const setupIntersectionObserver = () => {
    if (observer) {
      observer.disconnect()
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !allLoaded.value) {
          loadMore()
        }
      },
      { rootMargin: '200px' }
    )

    if (loadMoreTrigger.value) {
      observer.observe(loadMoreTrigger.value)
    }
  }

  watch(
    () => sourceData(),
    () => {
      allLoaded.value = false
      currentPage.value = 1
      setupIntersectionObserver()
    }
  )

  return {
    displayedData,
    allLoaded,
    loadMoreTrigger,
    setupIntersectionObserver
  }
}
