<template>
  <section class="gallery-section plaster-texture">
    <!-- Title -->
    <div class="gallery-heading reveal-fade-up">
      <h3 class="heading-lead font-script">golden hour</h3>
      <p class="heading-sub font-display">of love</p>
      <div class="gold-divider">
        <span class="diamond-dot">◆</span>
      </div>
    </div>

    <!-- Gallery Grid -->
    <div class="gallery-masonry reveal-scale delay-200">
      <div 
        v-for="(photo, index) in photos" 
        :key="index" 
        class="gallery-item"
        :class="getGridSpanClass(index)"
        @click="openLightbox(index)"
      >
        <div class="photo-card">
          <img 
            :src="photo.url" 
            :alt="photo.caption || 'Wedding Photo'" 
            class="gallery-img"
            loading="lazy"
          />
          <div class="photo-overlay">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  photos: { url: string; caption?: string }[]
}>()

const emit = defineEmits<{
  (e: 'select', index: number): void
}>()

const openLightbox = (index: number) => {
  emit('select', index)
}

const getGridSpanClass = (index: number) => {
  if (index === 0 || index === 4) return 'col-span-full'
  return 'col-span-half'
}
</script>

<style scoped>
.gallery-section {
  padding: 3rem 1.5rem;
  text-align: center;
}

.gallery-heading {
  margin-bottom: 2rem;
}

.heading-lead {
  font-size: 2.2rem;
  color: var(--color-primary);
  line-height: 1;
}

.heading-sub {
  font-size: 1.5rem;
  color: var(--color-accent-gold);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.diamond-dot {
  font-size: 0.65rem;
  color: var(--color-accent-gold);
}

.gallery-masonry {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  max-width: 420px;
  margin: 0 auto;
}

.col-span-full {
  grid-column: span 2;
}

.col-span-half {
  grid-column: span 1;
}

.gallery-item {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(112, 86, 40, 0.08);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(112, 86, 40, 0.16);
}

.photo-card {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: var(--color-bg-alt);
}

.col-span-full .photo-card {
  aspect-ratio: 16 / 11;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.gallery-item:hover .gallery-img {
  transform: scale(1.04);
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: rgba(112, 86, 40, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.gallery-item:hover .photo-overlay {
  opacity: 1;
}
</style>
