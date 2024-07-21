// src/composables/usePaginatedData.ts
import { ref, computed, watch } from 'vue'

export function usePaginatedData<T>(
  sourceData: () => T[],
  itemsPerPage: number = 50,
  idField: keyof T = 'id'
) {
  const currentPage = ref(1)
  const allLoaded = ref(false)
  const loadMoreTrigger = ref<HTMLElement | null>(null)
  const displayedData = ref<T[]>([])

  const loadMore = () => {
    const startIndex = displayedData.value.length
    const endIndex = startIndex + itemsPerPage
    const newItems = sourceData().slice(startIndex, endIndex)
    displayedData.value.push(...newItems)

    if (endIndex >= sourceData().length) {
      allLoaded.value = true
    }
  }

  const resetAndReload = () => {
    displayedData.value = []
    allLoaded.value = false
    loadMore()
  }

  const setupIntersectionObserver = () => {
    const observer = new IntersectionObserver(
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

    return () => observer.disconnect()
  }

  const scrollToAnchor = async (id: number | string) => {
    let found = false

    const targetElement = document.getElementById(`couplet${id}`)
    if (targetElement) {
      found = true
      scrollToElement(targetElement)
    } else {
      while (!allLoaded.value && !found) {
        loadMore()
        await new Promise((resolve) => setTimeout(resolve, 50))

        const newTargetElement = document.getElementById(`couplet${id}`)
        if (newTargetElement) {
          found = true
          scrollToElement(newTargetElement)
        }
      }
    }

    if (!found) {
      console.log(`Element with id ${id} not found`)
    }
  }

  const scrollToElement = (element: HTMLElement) => {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  watch(() => sourceData(), resetAndReload)

  return {
    displayedData,
    allLoaded,
    loadMoreTrigger,
    setupIntersectionObserver,
    scrollToAnchor,
    resetAndReload
  }
}
