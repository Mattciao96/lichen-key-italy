import { ref } from 'vue'

export function useScrollLock() {
  const isScrollBlocked = ref(false)
  let scrollbarWidth = 0

  const getScrollbarWidth = (): number => {
    const outer = document.createElement('div')
    outer.style.visibility = 'hidden'
    outer.style.overflow = 'scroll'
    document.body.appendChild(outer)

    const inner = document.createElement('div')
    outer.appendChild(inner)

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
    outer.parentNode!.removeChild(outer)

    return scrollbarWidth
  }

  const blockScroll = (): void => {
    if (isScrollBlocked.value) return

    scrollbarWidth = getScrollbarWidth()

    const bodyPaddingRight =
      parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right')) || 0
    document.body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`

    document.body.style.overflow = 'hidden'
    isScrollBlocked.value = true
  }

  const unblockScroll = (): void => {
    if (!isScrollBlocked.value) return

    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('padding-right')

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
