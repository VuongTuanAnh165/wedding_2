<template>
  <section class="invitation-section plaster-texture">
    <div class="invitation-container reveal-fade-up">
      <!-- Intro Tagline -->
      <p class="invite-lead font-serif">You’re invited to the wedding of</p>

      <!-- Couple Names with Calligraphy & -->
      <div class="names-banner">
        <h2 class="name bride-name font-display">{{ brideName }}</h2>
        <span class="ampersand font-script">&</span>
        <h2 class="name groom-name font-display">{{ groomName }}</h2>
      </div>

      <!-- Divider -->
      <div class="gold-divider">
        <span class="diamond-dot">◆</span>
      </div>

      <!-- Countdown Heading & Component -->
      <p class="countdown-intro font-serif">NGÀY TRỌNG ĐẠI SẼ DIỄN RA SAU</p>
      <CountdownTimer :target-date="eventDate" />
    </div>
  </section>
</template>

<script setup lang="ts">
import CountdownTimer from '~/components/common/CountdownTimer.vue'

defineProps<{
  brideName: string
  groomName: string
  eventDate: string
}>()
</script>

<style scoped>
.invitation-section {
  padding: 3rem 1.5rem;
  text-align: center;
  position: relative;
}

.invitation-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2.25rem 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(194, 157, 89, 0.3);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(112, 86, 40, 0.05);
}

.invite-lead {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  font-style: italic;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
}

.names-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.name {
  font-size: 1.85rem;
  font-weight: 500;
  color: var(--color-primary);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.ampersand {
  font-size: 2.2rem;
  color: var(--color-accent-gold);
  line-height: 1;
  margin: -6px 0;
}

.diamond-dot {
  font-size: 0.65rem;
  color: var(--color-accent-gold);
}

.countdown-intro {
  font-size: 0.9rem;
  font-style: italic;
  color: var(--color-text-muted);
  letter-spacing: 0.5px;
  margin-top: 1rem;
}
</style>
