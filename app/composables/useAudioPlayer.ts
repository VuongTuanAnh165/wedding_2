import { ref, onMounted, onUnmounted } from 'vue'

const isPlaying = ref(false)
const isLoaded = ref(false)
const hasInteracted = ref(false)
let audioInstance: HTMLAudioElement | null = null

export function useAudioPlayer(audioSrc: string = 'https://camcui.vn/bai157.mp3') {
  const initAudio = () => {
    if (typeof window === 'undefined' || audioInstance) return

    audioInstance = new Audio(audioSrc)
    audioInstance.loop = true
    audioInstance.preload = 'auto'

    audioInstance.addEventListener('canplaythrough', () => {
      isLoaded.value = true
    })

    audioInstance.addEventListener('play', () => {
      isPlaying.value = true
    })

    audioInstance.addEventListener('pause', () => {
      isPlaying.value = false
    })

    audioInstance.addEventListener('error', (err) => {
      console.warn('Audio error, attempting fallback:', err)
      if (audioInstance && audioInstance.src !== 'https://camcui.vn/bai157.mp3') {
        audioInstance.src = 'https://camcui.vn/bai157.mp3'
        audioInstance.load()
      }
    })
  }

  const play = async () => {
    if (!audioInstance) initAudio()
    if (!audioInstance) return

    try {
      await audioInstance.play()
      isPlaying.value = true
      hasInteracted.value = true
    } catch (err) {
      console.debug('Autoplay policy prevented audio:', err)
      isPlaying.value = false
    }
  }

  const pause = () => {
    if (audioInstance) {
      audioInstance.pause()
      isPlaying.value = false
    }
  }

  const toggle = () => {
    hasInteracted.value = true
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }

  const handleFirstGesture = () => {
    if (hasInteracted.value || isPlaying.value) return
    play().then(() => {
      removeGestureListeners()
    }).catch(() => {})
  }

  const addGestureListeners = () => {
    if (typeof window === 'undefined') return
    window.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true })
    window.addEventListener('click', handleFirstGesture, { once: true })
    window.addEventListener('scroll', handleFirstGesture, { once: true, passive: true })
  }

  const removeGestureListeners = () => {
    if (typeof window === 'undefined') return
    window.removeEventListener('touchstart', handleFirstGesture)
    window.removeEventListener('click', handleFirstGesture)
    window.removeEventListener('scroll', handleFirstGesture)
  }

  onMounted(() => {
    initAudio()
    addGestureListeners()
  })

  return {
    isPlaying,
    isLoaded,
    hasInteracted,
    play,
    pause,
    toggle
  }
}
