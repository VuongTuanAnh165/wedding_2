<template>
  <section class="quote-section">
    <div class="quote-card reveal-fade-up">
      <div class="heart-icon animate-pulse-gentle">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#c29d59" stroke="#705628" stroke-width="1.5">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </div>
      <p class="script-title font-script">This day</p>
      <p class="serif-sub font-serif">our hearts become one</p>
    </div>
  </section>
</template>

<style scoped>
.quote-section {
  padding: 1.5rem 1.5rem 2.5rem;
  text-align: center;
}

.quote-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.heart-icon {
  margin-bottom: 0.5rem;
}

.script-title {
  font-size: 2.2rem;
  color: var(--color-primary);
  line-height: 1.2;
}

.serif-sub {
  font-size: 1.15rem;
  font-style: italic;
  color: var(--color-text-muted);
  letter-spacing: 1px;
}
</style>
