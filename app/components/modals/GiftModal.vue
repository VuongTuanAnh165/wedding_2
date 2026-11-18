<template>
  <BaseModal :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <div class="gift-modal-content">
      <!-- Header Image / Badge -->
      <div class="gift-banner">
        <h3 class="gift-title font-display">Hộp Mừng Cưới</h3>
        <p class="gift-subtitle font-serif">Gửi trao yêu thương & lời chúc phúc</p>
      </div>

      <div class="gold-divider">
        <span class="diamond-dot">◆</span>
      </div>

      <!-- Bank Account Cards -->
      <div v-for="(acc, index) in accounts" :key="index" class="bank-card">
        <div class="bank-header">
          <span class="account-title font-serif">{{ acc.title }}</span>
          <span class="bank-badge">{{ acc.bankName }}</span>
        </div>

        <!-- QR Code -->
        <div class="qr-wrapper">
          <img :src="acc.qrImage" alt="Mã QR Chuyển khoản" class="qr-img" />
          <p class="qr-hint">Quét mã VietQR để gửi quà mừng</p>
        </div>

        <!-- Account Info Details -->
        <div class="account-details">
          <div class="detail-row">
            <span class="detail-label">Chủ tài khoản:</span>
            <span class="detail-val font-serif font-bold">{{ acc.accountHolder }}</span>
          </div>

          <div class="detail-row">
            <span class="detail-label">Số tài khoản:</span>
            <span class="detail-val font-mono font-bold">{{ acc.accountNumber }}</span>
          </div>
        </div>

        <!-- Copy Button -->
        <button type="button" class="btn-copy" @click="copyAccountNumber(acc.accountNumber)">
          <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{{ copied ? 'Đã sao chép STK!' : 'Sao chép số tài khoản' }}</span>
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '~/components/common/BaseModal.vue'
import type { BankAccount } from '~/data/wedding.config'

defineProps<{
  modelValue: boolean
  accounts: BankAccount[]
}>()

defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const copied = ref(false)

const copyAccountNumber = (accNum: string) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(accNum)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2500)
  }
}
</script>

<style scoped>
.gift-modal-content {
  text-align: center;
}

.gift-title {
  font-size: 1.6rem;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.gift-subtitle {
  font-size: 0.85rem;
  font-style: italic;
  color: var(--color-text-muted);
  margin-top: 2px;
}

.diamond-dot {
  font-size: 0.65rem;
  color: var(--color-accent-gold);
}

.bank-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 1.25rem;
  border: 1px solid rgba(194, 157, 89, 0.3);
  box-shadow: 0 4px 15px rgba(112, 86, 40, 0.05);
}

.bank-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.account-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-primary);
}

.bank-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: #ffffff;
  background-color: var(--color-primary);
  padding: 3px 10px;
  border-radius: 12px;
  letter-spacing: 0.5px;
}

.qr-wrapper {
  max-width: 200px;
  margin: 0 auto 1rem;
  padding: 8px;
  background: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: 10px;
}

.qr-img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  display: block;
}

.qr-hint {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: 6px;
}

.account-details {
  background: var(--color-bg);
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 1rem;
  text-align: left;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.88rem;
  margin-bottom: 4px;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.detail-label {
  color: var(--color-text-muted);
}

.detail-val {
  color: var(--color-primary);
}

.font-bold {
  font-weight: 700;
}

.font-mono {
  font-family: monospace;
  font-size: 0.95rem;
  letter-spacing: 1px;
}

.btn-copy {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background-color: #fff9f0;
  border: 1px solid var(--color-accent-gold);
  border-radius: 9999px;
  color: var(--color-primary);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-copy:hover {
  background-color: var(--color-primary);
  color: #ffffff;
}
</style>
