<template>
  <div class="countdown-wrapper">
    <div class="countdown-grid">
      <div class="countdown-card">
        <span class="countdown-num font-serif">{{ days }}</span>
        <span class="countdown-label">Ngày</span>
      </div>
      <div class="countdown-colon">:</div>
      <div class="countdown-card">
        <span class="countdown-num font-serif">{{ hours }}</span>
        <span class="countdown-label">Giờ</span>
      </div>
      <div class="countdown-colon">:</div>
      <div class="countdown-card">
        <span class="countdown-num font-serif">{{ minutes }}</span>
        <span class="countdown-label">Phút</span>
      </div>
      <div class="countdown-colon">:</div>
      <div class="countdown-card">
        <span class="countdown-num font-serif">{{ seconds }}</span>
        <span class="countdown-label">Giây</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCountdown } from '~/composables/useCountdown'

const props = defineProps<{
  targetDate: string
}>()

const { days, hours, minutes, seconds } = useCountdown(props.targetDate)
</script>

<style scoped>
.countdown-wrapper {
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
}

.countdown-grid {
  display: flex;
  align-items: center;
  gap: 8px;
}

.countdown-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 62px;
  height: 64px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(194, 157, 89, 0.4);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(112, 86, 40, 0.08);
}

.countdown-num {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1.1;
}

.countdown-label {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

.countdown-colon {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-accent-gold);
  line-height: 1;
  margin-bottom: 12px;
}
</style>
