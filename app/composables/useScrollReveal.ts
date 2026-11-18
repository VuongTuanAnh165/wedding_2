import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  let observer: IntersectionObserver | null = null

  const observe = () => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback: reveal immediately if IntersectionObserver not supported
      document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale, .reveal-fade')
        .forEach(el => el.classList.add('is-revealed'))
      return
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    }

    observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          obs.unobserve(entry.target) // Trigger once and keep visible
        }
      })
    }, options)

    const targets = document.querySelectorAll(
      '.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale, .reveal-fade'
    )

    targets.forEach(el => observer?.observe(el))
  }

  onMounted(() => {
    // Slight tick to ensure child components have mounted
    setTimeout(observe, 60)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return {
    refreshReveal: observe
  }
}
