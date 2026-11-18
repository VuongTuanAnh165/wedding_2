<template>
  <section class="timeline-section plaster-texture">
    <!-- Section Title -->
    <div class="section-heading reveal-fade-up">
      <h3 class="heading-title font-display">Timeline</h3>
      <div class="gold-divider">
        <span class="diamond-dot">◆</span>
      </div>
      <p class="heading-sub font-serif">Lịch trình sự kiện</p>
    </div>

    <!-- Timeline Flow -->
    <div class="timeline-container reveal-scale delay-200">
      <div v-for="(item, index) in items" :key="index" class="timeline-card">
        <div class="time-pill font-serif">{{ item.time }}</div>
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h4 class="event-title font-serif">{{ item.title }}</h4>
          <p v-if="item.description" class="event-desc">{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- Dress Code Section -->
    <div class="dress-code-box reveal-fade-up delay-300">
      <h4 class="dress-code-title font-display">{{ dressCode.title }}</h4>
      <p class="dress-code-desc font-serif">{{ dressCode.description }}</p>

      <div class="color-swatches">
        <div 
          v-for="(color, idx) in dressCode.colors" 
          :key="idx" 
          class="swatch-item"
        >
          <div class="swatch-circle" :style="{ backgroundColor: color.hex }"></div>
          <span class="swatch-name">{{ color.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TimelineItem, SwatchColor } from '~/data/wedding.config'

defineProps<{
  items: TimelineItem[]
  dressCode: {
    title: string
    description: string
    colors: SwatchColor[]
  }
}>()
</script>

<style scoped>
.timeline-section {
  padding: 3rem 1.5rem;
  text-align: center;
}

.section-heading {
  margin-bottom: 2rem;
}

.heading-title {
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-primary);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.diamond-dot {
  font-size: 0.65rem;
  color: var(--color-accent-gold);
}

.heading-sub {
  font-size: 0.95rem;
  font-style: italic;
  color: var(--color-text-muted);
}

.timeline-container {
  position: relative;
  max-width: 380px;
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.timeline-container::before {
  content: '';
  position: absolute;
  top: 15px;
  bottom: 15px;
  left: 78px;
  width: 1px;
  background: linear-gradient(180deg, var(--color-accent-gold), transparent);
}

.timeline-card {
  display: flex;
  align-items: center;
  position: relative;
}

.time-pill {
  width: 65px;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-primary);
  text-align: right;
  flex-shrink: 0;
}

.timeline-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: var(--color-accent-gold);
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 2px var(--color-accent-gold);
  margin: 0 12px;
  flex-shrink: 0;
  z-index: 2;
}

.timeline-content {
  flex: 1;
  text-align: left;
  background: #ffffff;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(194, 157, 89, 0.25);
  box-shadow: 0 4px 12px rgba(112, 86, 40, 0.05);
}

.event-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 2px;
}

.event-desc {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.dress-code-box {
  max-width: 380px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.75);
  border: 1px dashed rgba(194, 157, 89, 0.4);
  border-radius: 16px;
  padding: 1.75rem 1.25rem;
}

.dress-code-title {
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--color-primary);
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.dress-code-desc {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

.color-swatches {
  display: flex;
  justify-content: center;
  gap: 18px;
}

.swatch-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.swatch-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  transition: transform 0.25s ease;
}

.swatch-circle:hover {
  transform: scale(1.1);
}

.swatch-name {
  font-size: 0.72rem;
  color: var(--color-text-muted);
}
</style>
