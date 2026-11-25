<template>
  <footer class="footer-section plaster-texture">
    <div class="footer-content reveal-fade-up">
      <div class="footer-heart animate-pulse-gentle">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#c29d59"
          stroke="#705628" stroke-width="1.5">
          <path
            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </div>

      <p class="thank-msg font-serif">
        Cảm ơn bạn đã dành tình cảm cho chúng mình!
      </p>

      <h3 class="thank-title font-script">Xin chân thành cảm ơn!</h3>

      <div class="gold-line"></div>

      <p class="copyright-tag font-serif">
        {{ coupleNames }} • Lễ Thành Hôn
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  coupleNames: string
}>()
</script>

<style scoped>
.footer-section {
  padding: 4rem 1.5rem 3rem;
  text-align: center;
  position: relative;
  background-color: var(--color-bg);
}

.footer-content {
  max-width: 380px;
  margin: 0 auto;
}

.footer-heart {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.thank-msg {
  font-size: 1rem;
  font-style: italic;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.thank-title {
  font-size: 2.8rem;
  color: var(--color-primary);
  margin: 0.25rem 0;
  line-height: 1.1;
}

.copyright-tag {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>
