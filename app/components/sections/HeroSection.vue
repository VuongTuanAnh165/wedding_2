<template>
  <section class="hero-section plaster-texture">
    <!-- Top NGÀY CHUNG ĐÔI Header -->
    <div class="hero-header reveal-fade-up">
      <p class="script-subtitle font-script">NGÀY CHUNG ĐÔI</p>
      <h1 class="couple-title font-display">Thành & Trang</h1>
      <p class="save-date-tag font-serif">{{ eventDate }}</p>
    </div>

    <!-- Main Hero Couple Portrait Card -->
    <div class="hero-portrait-card reveal-scale delay-200">
      <div class="polaroid-wrapper">
        <div class="photo-frame">
          <img :src="coverImage" alt="Xuân Thành & Thu Trang Wedding" class="couple-img" loading="eager" />
        </div>

        <!-- Ribbon / Bow Tie Decoration -->
        <div class="ribbon-ornament">
          <img
            src="https://w.ladicdn.com/s650x650/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0025_9-20251010160529-oa95t.png"
            alt="Wedding bow" class="ribbon-img animate-float" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  coverImage: string
  eventDate: string
}>()
</script>

<style scoped>
.hero-section {
  padding: 4.5rem 1.5rem 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-header {
  margin-bottom: 2rem;
}

.script-subtitle {
  font-size: 2.2rem;
  color: var(--color-primary);
  line-height: 1.1;
  letter-spacing: 1px;
}

.couple-title {
  font-size: 2.5rem;
  font-weight: 400;
  color: var(--color-text-title);
  letter-spacing: 2px;
  margin: 0.35rem 0;
  text-transform: uppercase;
}

.save-date-tag {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-accent-gold);
  letter-spacing: 3px;
}

.hero-portrait-card {
  position: relative;
  max-width: 380px;
  margin: 0 auto;
}

.polaroid-wrapper {
  position: relative;
  padding: 12px 12px 24px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 15px 35px rgba(112, 86, 40, 0.12), 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(194, 157, 89, 0.2);
}

.photo-frame {
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 2px;
  position: relative;
}

.couple-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ribbon-ornament {
  position: absolute;
  top: -24px;
  right: -15px;
  width: 75px;
  height: 75px;
  pointer-events: none;
  z-index: 10;
}

.ribbon-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
