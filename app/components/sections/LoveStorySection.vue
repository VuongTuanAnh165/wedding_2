<template>
  <section class="love-story-section plaster-texture">
    <!-- Story Narrative Card -->
    <div class="story-card reveal-fade-up">
      <div class="quote-mark">“</div>
      <p class="story-text font-serif">{{ content }}</p>
      <div class="quote-mark text-right">”</div>
    </div>

    <!-- Calendar Month Card -->
    <div class="calendar-card reveal-scale delay-200">
      <div class="calendar-header">
        <h4 class="month-title font-display">December</h4>
        <p class="year-sub font-serif">2025</p>
      </div>

      <!-- Days of Week Header -->
      <div class="calendar-grid weekdays font-serif">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>

      <!-- Month Dates Grid (December 2025: Dec 1 is Monday) -->
      <div class="calendar-grid dates font-serif">
        <div 
          v-for="d in 31" 
          :key="d" 
          class="date-cell"
          :class="{ 'is-wedding-day': d === highlightDay }"
        >
          <span class="day-number">{{ d }}</span>
          <div v-if="d === highlightDay" class="heart-marker">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#e01a1a" stroke="none">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Polaroid Duo Images with Organic Angles -->
    <div class="polaroid-duo reveal-fade-up delay-300">
      <div class="polaroid-item polaroid-left">
        <img 
          src="https://w.ladicdn.com/s550x550/6322a62f2dad980013bb5005/571765088_1401349365330793_1662366587190655600_n-1-20251030042127-nm_mv.jpg" 
          alt="Happy Moments" 
          class="polaroid-img" 
          loading="lazy"
        />
      </div>
      <div class="polaroid-item polaroid-right">
        <img 
          src="https://w.ladicdn.com/s750x650/6322a62f2dad980013bb5005/572524211_1401350018664061_6624378457772842585_n-20251030041304-s8aeq.jpg" 
          alt="Wedding Romance" 
          class="polaroid-img" 
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  content: string
  highlightDay: number
}>()
</script>

<style scoped>
.love-story-section {
  padding: 3rem 1.5rem;
  text-align: center;
}

.story-card {
  max-width: 400px;
  margin: 0 auto 2.5rem;
  padding: 1.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(194, 157, 89, 0.3);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(112, 86, 40, 0.06);
}

.quote-mark {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  color: var(--color-accent-gold);
  line-height: 1;
}

.text-right {
  text-align: right;
}

.story-text {
  font-size: 0.95rem;
  font-style: italic;
  color: var(--color-primary);
  line-height: 1.8;
  margin: 0.5rem 0;
}

.calendar-card {
  max-width: 380px;
  margin: 0 auto 3rem;
  background: #ffffff;
  border-radius: 18px;
  padding: 1.5rem;
  border: 1px solid rgba(194, 157, 89, 0.3);
  box-shadow: 0 10px 25px rgba(112, 86, 40, 0.08);
}

.calendar-header {
  margin-bottom: 1.25rem;
}

.month-title {
  font-size: 1.75rem;
  font-weight: 500;
  color: var(--color-primary);
  letter-spacing: 1.5px;
  line-height: 1.1;
  text-transform: uppercase;
}

.year-sub {
  font-size: 0.9rem;
  color: var(--color-accent-gold);
  letter-spacing: 2px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  text-align: center;
}

.weekdays {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.dates {
  font-size: 0.88rem;
  color: var(--color-text-main);
}

.date-cell {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.date-cell.is-wedding-day {
  background-color: rgba(224, 26, 26, 0.08);
  border: 1px solid rgba(224, 26, 26, 0.3);
  color: #e01a1a;
  font-weight: 700;
}

.heart-marker {
  position: absolute;
  top: -8px;
  right: -4px;
}

.polaroid-duo {
  position: relative;
  max-width: 380px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.polaroid-item {
  width: 170px;
  background: #ffffff;
  padding: 8px 8px 18px;
  border-radius: 4px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.polaroid-left {
  transform: rotate(-5deg);
}

.polaroid-right {
  transform: rotate(4deg);
}

.polaroid-item:hover {
  transform: rotate(0deg) scale(1.05);
  z-index: 10;
}

.polaroid-img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
}
</style>
