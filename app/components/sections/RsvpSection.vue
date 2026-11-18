<template>
  <section class="rsvp-section plaster-texture">
    <div class="rsvp-card reveal-fade-up">
      <!-- Header -->
      <div class="rsvp-header">
        <h3 class="rsvp-title font-display">Xác nhận tham dự</h3>
        <div class="gold-divider">
          <span class="diamond-dot">◆</span>
        </div>
        <p class="rsvp-intro font-serif">
          Hãy xác nhận sự có mặt của bạn để chúng mình chuẩn bị đón tiếp một cách chu đáo nhất.<br />
          <strong>Trân trọng!</strong>
        </p>
      </div>

      <!-- Form -->
      <form class="rsvp-form" @submit.prevent="handleSubmit">
        <!-- Name -->
        <div class="form-group">
          <label class="form-label">Họ và tên của bạn <span class="required">*</span></label>
          <input 
            v-model="form.name" 
            type="text" 
            class="form-input" 
            placeholder="Nhập họ và tên..." 
            required 
          />
        </div>

        <!-- Attending Status -->
        <div class="form-group">
          <label class="form-label">Bạn sẽ đến chứ? <span class="required">*</span></label>
          <div class="radio-pill-group">
            <label class="radio-pill" :class="{ 'is-selected': form.status === 'attending' }">
              <input type="radio" v-model="form.status" value="attending" />
              <span>Chắc chắn sẽ đến ❤️</span>
            </label>
            <label class="radio-pill" :class="{ 'is-selected': form.status === 'declined' }">
              <input type="radio" v-model="form.status" value="declined" />
              <span>Xin lỗi, mình bận rồi 😢</span>
            </label>
          </div>
        </div>

        <!-- Guest Count -->
        <div v-if="form.status === 'attending'" class="form-group">
          <label class="form-label">Bạn tham dự cùng ai?</label>
          <div class="radio-grid">
            <label 
              v-for="num in ['1 người', '2 người', '3 người', '4 người']" 
              :key="num"
              class="radio-card"
              :class="{ 'is-selected': form.guestCount === num }"
            >
              <input type="radio" v-model="form.guestCount" :value="num" />
              <span>{{ num }}</span>
            </label>
          </div>
        </div>

        <!-- Guest Side -->
        <div class="form-group">
          <label class="form-label">Bạn là khách mời của ai?</label>
          <div class="radio-pill-group">
            <label class="radio-pill" :class="{ 'is-selected': form.side === 'bride' }">
              <input type="radio" v-model="form.side" value="bride" />
              <span>Khách cô dâu 👰</span>
            </label>
            <label class="radio-pill" :class="{ 'is-selected': form.side === 'groom' }">
              <input type="radio" v-model="form.side" value="groom" />
              <span>Khách chú rể 🤵</span>
            </label>
          </div>
        </div>

        <!-- Message / Wish -->
        <div class="form-group">
          <label class="form-label">Gửi lời chúc tới cặp đôi</label>
          <textarea 
            v-model="form.message" 
            class="form-textarea" 
            rows="3" 
            placeholder="Viết lời chúc ngọt ngào tại đây..."
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn-gold btn-submit" :disabled="isSubmitting">
          <span v-if="!isSubmitting">GỬI LỜI NHẮN & XÁC NHẬN</span>
          <span v-else>Đang gửi phản hồi...</span>
        </button>
      </form>

      <!-- Wedding Gift CTA -->
      <div class="gift-cta-box">
        <p class="gift-lead font-serif">Nếu bạn muốn gửi quà chúc phúc từ phương xa</p>
        <button type="button" class="btn-gold-outline" @click="$emit('open-gift')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="8" width="18" height="13" rx="2" />
            <path d="M12 8v13" />
            <path d="M19 12H3" />
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
          </svg>
          <span>GỬI QUÀ MỪNG CƯỚI</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const emit = defineEmits<{
  (e: 'submit', data: { name: string; status: string; guestCount: string; side: string; message: string }): void
  (e: 'open-gift'): void
}>()

const isSubmitting = ref(false)

const form = reactive({
  name: '',
  status: 'attending',
  guestCount: '1 người',
  side: 'bride',
  message: ''
})

const handleSubmit = () => {
  if (!form.name.trim()) return

  isSubmitting.value = true
  setTimeout(() => {
    emit('submit', { ...form })
    isSubmitting.value = false
  }, 600)
}
</script>

<style scoped>
.rsvp-section {
  padding: 3rem 1.5rem;
}

.rsvp-card {
  max-width: 420px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 20px;
  padding: 2.25rem 1.5rem;
  border: 1px solid rgba(194, 157, 89, 0.35);
  box-shadow: 0 12px 30px rgba(112, 86, 40, 0.08);
}

.rsvp-header {
  text-align: center;
  margin-bottom: 2rem;
}

.rsvp-title {
  font-size: 1.85rem;
  font-weight: 500;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.diamond-dot {
  font-size: 0.65rem;
  color: var(--color-accent-gold);
}

.rsvp-intro {
  font-size: 0.92rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.form-group {
  margin-bottom: 1.35rem;
}

.form-label {
  display: block;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 6px;
}

.required {
  color: #e01a1a;
}

.radio-pill-group {
  display: flex;
  gap: 10px;
}

.radio-pill {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-main);
  transition: all 0.2s ease;
  user-select: none;
}

.radio-pill input,
.radio-card input {
  display: none;
}

.radio-pill.is-selected {
  background-color: #fff9f0;
  border-color: var(--color-primary);
  color: var(--color-primary);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(112, 86, 40, 0.12);
}

.radio-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.radio-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 0.82rem;
  color: var(--color-text-main);
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-card.is-selected {
  background-color: #fff9f0;
  border-color: var(--color-primary);
  color: var(--color-primary);
  font-weight: 600;
}

.btn-submit {
  width: 100%;
  padding: 14px;
  margin-top: 0.5rem;
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.gift-cta-box {
  margin-top: 2.25rem;
  padding-top: 1.75rem;
  border-top: 1px dashed var(--color-border);
  text-align: center;
}

.gift-lead {
  font-size: 0.88rem;
  font-style: italic;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
}
</style>
