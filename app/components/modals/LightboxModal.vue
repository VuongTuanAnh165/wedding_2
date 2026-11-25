<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div v-if="isOpen" class="lightbox-backdrop" @click.self="close">
        <!-- Close button -->
        <button class="lightbox-close" @click="close" aria-label="Đóng ảnh">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <!-- Main Image Container -->
        <div 
          class="lightbox-stage" 
          @touchstart="handleTouchStart" 
          @touchend="handleTouchEnd"
        >
          <img 
            :src="photos[currentIndex]?.url" 
            :alt="photos[currentIndex]?.caption || 'Ảnh cưới'" 
            class="lightbox-img" 
          />
          
          <div v-if="photos[currentIndex]?.caption" class="lightbox-caption font-serif">
            {{ photos[currentIndex]?.caption }}
          </div>

          <!-- Counter -->
          <div class="lightbox-counter font-serif">
            {{ currentIndex + 1 }} / {{ photos.length }}
          </div>
        </div>

        <!-- Controls -->
        <button class="nav-btn prev-btn" @click="prev" aria-label="Ảnh trước">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button class="nav-btn next-btn" @click="next" aria-label="Ảnh sau">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  isOpen: boolean
  initialIndex: number
  photos: { url: string; caption?: string }[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const currentIndex = ref(props.initialIndex)

watch(() => props.initialIndex, (val) => {
  currentIndex.value = val
})

watch(() => props.isOpen, (open) => {
  if (typeof document !== 'undefined') {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

const close = () => {
  emit('close')
}

const prev = () => {
  if (props.photos.length === 0) return
  currentIndex.value = (currentIndex.value - 1 + props.photos.length) % props.photos.length
}

const next = () => {
  if (props.photos.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % props.photos.length
}

// Touch Swipe Detection
let touchStartX = 0

const handleTouchStart = (e: TouchEvent) => {
  const touch = e.changedTouches[0]
  if (touch) {
    touchStartX = touch.screenX
  }
}

const handleTouchEnd = (e: TouchEvent) => {
  const touch = e.changedTouches[0]
  if (touch) {
    const touchEndX = touch.screenX
    const diff = touchEndX - touchStartX
    if (diff > 50) {
      prev() // Swipe right
    } else if (diff < -50) {
      next() // Swipe left
    }
  }
}

const handleKey = (e: KeyboardEvent) => {
  if (!props.isOpen) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999999;
  background-color: rgba(10, 8, 5, 0.92);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.lightbox-stage {
  max-width: 90vw;
  max-height: 85vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.lightbox-img {
  max-width: 100%;
  max-height: 78vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.lightbox-caption {
  color: #ffffff;
  font-size: 0.95rem;
  font-style: italic;
  margin-top: 12px;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.lightbox-counter {
  position: absolute;
  bottom: -32px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.82rem;
  letter-spacing: 1px;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 50;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

.prev-btn {
  left: 16px;
}

.next-btn {
  right: 16px;
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.25s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
