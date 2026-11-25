<template>
  <BaseModal :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <div class="thank-modal-content">
      <div class="heart-icon animate-pulse-gentle">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#c29d59"
          stroke="#705628" stroke-width="1.5">
          <path
            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </div>

      <h3 class="thank-title font-script">Xin chân thành cảm ơn!</h3>

      <div class="gold-divider">
        <span class="diamond-dot">◆</span>
      </div>

      <p class="thank-message font-serif">
        Cảm ơn bạn đã dành thời gian phản hồi.<br />
        Chúng mình vô cùng trân quý sự quan tâm và lời chúc phúc của bạn!
      </p>

      <button type="button" class="btn-gold btn-close" @click="$emit('update:modelValue', false)">
        Hoàn tất
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '~/components/common/BaseModal.vue'

defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()
</script>

<style scoped>
.thank-modal-content {
  text-align: center;
  padding: 1rem 0.5rem;
}

.heart-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.thank-title {
  font-size: 2.8rem;
  color: var(--color-primary);
  line-height: 1;
}

.diamond-dot {
  font-size: 0.65rem;
  color: var(--color-accent-gold);
}

.thank-message {
  font-size: 0.95rem;
  font-style: italic;
  color: var(--color-text-muted);
  line-height: 1.7;
  margin: 1rem 0 1.75rem;
}

.btn-close {
  width: 100%;
  max-width: 200px;
}
</style>
