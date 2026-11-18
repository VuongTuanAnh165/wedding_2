<template>
  <div class="fixed-music-btn" :class="{ 'is-playing': isPlaying }" @click="toggle" title="Bật/Tắt nhạc">
    <!-- Vinyl Disc Graphic -->
    <div class="vinyl-disc" :class="{ 'is-spinning': isPlaying }">
      <div class="vinyl-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="music-note-icon">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </div>
    </div>
    
    <!-- Sound Waves Indicator when playing -->
    <div v-if="isPlaying" class="sound-waves">
      <span class="bar bar-1"></span>
      <span class="bar bar-2"></span>
      <span class="bar bar-3"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAudioPlayer } from '~/composables/useAudioPlayer'

const { isPlaying, toggle } = useAudioPlayer()
</script>

<style scoped>
.fixed-music-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  width: 46px;
  height: 46px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.2s ease;
}

.fixed-music-btn:active {
  transform: scale(0.92);
}

.vinyl-disc {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: radial-gradient(circle, #332a1f 30%, #1e1913 70%, #0d0a07 100%);
  border: 2px solid rgba(194, 157, 89, 0.7);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vinyl-disc.is-spinning {
  animation: spinSlow 6s linear infinite;
}

.vinyl-center {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #c29d59, #705628);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.music-note-icon {
  width: 11px;
  height: 11px;
}

.sound-waves {
  position: absolute;
  bottom: -4px;
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;
}

.bar {
  width: 2.5px;
  background-color: var(--color-accent-gold);
  border-radius: 2px;
  animation: wave 1s ease-in-out infinite;
}

.bar-1 { height: 6px; animation-delay: 0s; }
.bar-2 { height: 11px; animation-delay: 0.2s; }
.bar-3 { height: 7px; animation-delay: 0.4s; }

@keyframes wave {
  0%, 100% { height: 4px; }
  50% { height: 12px; }
}

@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
