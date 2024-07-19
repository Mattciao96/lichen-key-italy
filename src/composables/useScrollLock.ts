// useScrollLock.ts
import { ref } from 'vue'

export function useScrollLock() {
  const isScrollBlocked = ref(false)

  const blockScroll = (): void => {
    if (isScrollBlocked.value) return

    document.body.style.overflow = 'hidden'
    isScrollBlocked.value = true
  }

  const unblockScroll = (): void => {
    if (!isScrollBlocked.value) return

    document.body.style.removeProperty('overflow')

    isScrollBlocked.value = false
  }

  const toggleScroll = (): void => {
    if (isScrollBlocked.value) {
      unblockScroll()
    } else {
      blockScroll()
    }
  }

  return { isScrollBlocked, blockScroll, unblockScroll, toggleScroll }
}
