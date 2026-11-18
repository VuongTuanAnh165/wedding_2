<template>
  <section class="wishes-section plaster-texture">
    <div class="wishes-container reveal-fade-up">
      <!-- Section Title -->
      <div class="wishes-header">
        <h3 class="wishes-title font-display">YOUR WISHES</h3>
        <div class="gold-line-mini"></div>
        <p class="wishes-sub font-serif">Messages from our loved ones</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="skeleton-list">
        <div v-for="i in 3" :key="i" class="skeleton-card skeleton-shimmer"></div>
      </div>

      <!-- Wishes Scroll Box -->
      <div v-else class="wishes-scroll-box">
        <div v-if="wishes.length === 0" class="empty-wishes font-serif">
          Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc nhé!
        </div>

        <div v-else class="wishes-feed">
          <div 
            v-for="(wish, index) in wishes" 
            :key="index" 
            class="wish-card"
          >
            <div class="wish-card-header">
              <div class="wish-author-avatar">
                {{ wish.name.charAt(0).toUpperCase() }}
              </div>
              <div class="wish-meta">
                <h5 class="wish-author font-serif">{{ wish.name }}</h5>
                <span v-if="wish.createdAt" class="wish-time">{{ wish.createdAt }}</span>
              </div>
            </div>
            <p class="wish-body font-serif">{{ wish.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { WishItem } from '~/composables/useWishes'

defineProps<{
  wishes: WishItem[]
  isLoading: boolean
}>()
</script>

<style scoped>
.wishes-section {
  padding: 3rem 1.5rem;
  text-align: center;
}

.wishes-container {
  max-width: 420px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 20px;
  padding: 2.25rem 1.5rem;
  border: 1px solid rgba(194, 157, 89, 0.35);
  box-shadow: 0 12px 30px rgba(112, 86, 40, 0.08);
}

.wishes-header {
  margin-bottom: 1.75rem;
}

.wishes-title {
  font-size: 1.85rem;
  font-weight: 400;
  color: var(--color-primary);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.gold-line-mini {
  width: 40px;
  height: 1.5px;
  background-color: var(--color-accent-gold);
  margin: 8px auto;
  opacity: 0.6;
}

.wishes-sub {
  font-size: 0.85rem;
  font-style: italic;
  color: var(--color-text-muted);
}

.wishes-scroll-box {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 6px;
  text-align: left;
}

/* Custom Scrollbar */
.wishes-scroll-box::-webkit-scrollbar {
  width: 5px;
}

.wishes-scroll-box::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 4px;
}

.wishes-feed {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.wish-card {
  background: var(--color-bg);
  border-radius: 12px;
  padding: 14px 16px;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 6px rgba(112, 86, 40, 0.04);
}

.wish-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.wish-author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #c29d59, #705628);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 600;
  flex-shrink: 0;
}

.wish-meta {
  flex: 1;
}

.wish-author {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1.2;
}

.wish-time {
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.wish-body {
  font-size: 0.88rem;
  color: var(--color-text-main);
  line-height: 1.5;
  font-style: italic;
}

.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-card {
  height: 75px;
  border-radius: 12px;
}

.empty-wishes {
  text-align: center;
  color: var(--color-text-muted);
  font-style: italic;
  padding: 2rem 1rem;
}
</style>
