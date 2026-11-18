<template>
  <section class="family-venue-section plaster-texture">
    <!-- Parents Cards: Side by Side or Stacked -->
    <div class="parents-grid reveal-fade-up">
      <!-- Nhà Gái -->
      <div class="family-card">
        <h3 class="side-tag font-script-hand">nhà gái</h3>
        <p class="parent-name font-serif">{{ brideParents.father }}</p>
        <p class="parent-name font-serif">{{ brideParents.mother }}</p>
      </div>

      <div class="family-divider">
        <span class="vertical-line"></span>
      </div>

      <!-- Nhà Trai -->
      <div class="family-card">
        <h3 class="side-tag font-script-hand">nhà trai</h3>
        <p class="parent-name font-serif">{{ groomParents.father }}</p>
        <p class="parent-name font-serif">{{ groomParents.mother }}</p>
      </div>
    </div>

    <!-- Official Invitation Card -->
    <div class="ceremony-card reveal-scale delay-200">
      <div class="ceremony-inner">
        <p class="invite-msg font-serif">
          Kính mời tham dự tiệc chung vui<br />của gia đình chúng tôi
        </p>

        <div class="couple-highlight">
          <span class="name font-display">{{ brideName }}</span>
          <span class="symbol font-script">&</span>
          <span class="name font-display">{{ groomName }}</span>
        </div>

        <div class="gold-line"></div>

        <!-- Date & Time Showcase -->
        <div class="datetime-block">
          <p class="ceremony-label font-serif">Hôn lễ được tổ chức vào lúc</p>
          <div class="time-badge font-serif">11:30 | CHỦ NHẬT</div>
          
          <div class="calendar-callout">
            <div class="date-large font-display">21</div>
            <div class="date-details font-serif">
              <p class="month-year">Tháng 12 / 2025</p>
              <p class="lunar-date">{{ lunarDate }}</p>
            </div>
          </div>
        </div>

        <div class="gold-line"></div>

        <!-- Venue Location -->
        <div class="venue-block">
          <p class="venue-intro font-serif">Tổ chức tại</p>
          <h4 class="venue-name font-display">{{ venueName }}</h4>
          <p class="venue-address">{{ venueAddress }}</p>

          <!-- Map CTA Button -->
          <div class="map-action">
            <a :href="mapUrl" target="_blank" rel="noopener noreferrer" class="btn-gold">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Xem chỉ đường</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  brideName: string
  groomName: string
  brideParents: { father: string; mother: string }
  groomParents: { father: string; mother: string }
  venueName: string
  venueAddress: string
  mapUrl: string
  lunarDate: string
}>()
</script>

<style scoped>
.family-venue-section {
  padding: 2.5rem 1.5rem;
  text-align: center;
}

.parents-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 2rem;
}

.family-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.7);
  padding: 1.25rem 0.75rem;
  border-radius: 12px;
  border: 1px solid rgba(194, 157, 89, 0.25);
  box-shadow: 0 4px 15px rgba(112, 86, 40, 0.04);
}

.side-tag {
  font-size: 1.6rem;
  color: var(--color-accent-gold);
  line-height: 1.2;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
}

.parent-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-primary);
  line-height: 1.4;
}

.family-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vertical-line {
  display: block;
  width: 1px;
  height: 60px;
  background: linear-gradient(180deg, transparent, var(--color-accent-gold), transparent);
}

.ceremony-card {
  max-width: 420px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 20px;
  padding: 8px;
  border: 1px solid rgba(194, 157, 89, 0.35);
  box-shadow: 0 12px 30px rgba(112, 86, 40, 0.08);
}

.ceremony-inner {
  border: 1px dashed rgba(194, 157, 89, 0.4);
  border-radius: 14px;
  padding: 2rem 1.25rem;
}

.invite-msg {
  font-size: 1rem;
  font-style: italic;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.couple-highlight {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 0.5rem;
}

.name {
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--color-primary);
  letter-spacing: 1px;
}

.symbol {
  font-size: 1.6rem;
  color: var(--color-accent-gold);
}

.ceremony-label {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  font-style: italic;
  margin-bottom: 0.5rem;
}

.time-badge {
  display: inline-block;
  padding: 6px 18px;
  background-color: var(--color-bg-alt);
  color: var(--color-primary);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  border-radius: 20px;
  margin-bottom: 1rem;
}

.calendar-callout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.date-large {
  font-size: 3.5rem;
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1;
}

.date-details {
  text-align: left;
}

.month-year {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-primary);
}

.lunar-date {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-style: italic;
}

.venue-intro {
  font-size: 0.88rem;
  font-style: italic;
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.venue-name {
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: 0.35rem;
}

.venue-address {
  font-size: 0.9rem;
  color: var(--color-text-main);
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.map-action {
  display: flex;
  justify-content: center;
}
</style>
