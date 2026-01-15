<template>
  <div class="cart-modal" :class="{ active: true }" @click.self="$emit('close')">
    <div class="cart-content">
      <div class="cart-header">
        <h2>{{ t('Shopping Cart', 'শপিং কার্ট') }}</h2>
        <button class="close-cart" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="cart-items">
        <p v-if="cartStore.items.length === 0" class="empty-cart">
          {{ t('Your cart is empty', 'আপনার কার্ট খালি') }}
        </p>
        
        <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <div class="cart-item-image">
            <img :src="item.image" :alt="item.name[languageStore.currentLanguage]" />
          </div>
          <div class="cart-item-details">
            <h4>{{ item.name[languageStore.currentLanguage] }}</h4>
            <p>{{ t('Quantity', 'পরিমাণ') }}: {{ item.quantity }}</p>
            <p class="cart-item-price">${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
          <button class="cart-item-remove" @click="cartStore.removeItem(item.id)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      
      <div class="cart-footer">
        <div class="cart-total">
          <span>{{ t('Total:', 'মোট:') }}</span>
          <span class="total-price">${{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
        <button class="checkout-btn">{{ t('Checkout', 'চেকআউট') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLanguageStore } from '../stores/language'
import { useCartStore } from '../stores/cart'

const emit = defineEmits(['close'])

const languageStore = useLanguageStore()
const cartStore = useCartStore()
const { t } = languageStore
</script>

<style scoped>
.cart-modal {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  max-width: 450px;
  height: 100%;
  background: var(--white);
  box-shadow: var(--shadow-lg);
  z-index: 2000;
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
}

.cart-modal.active {
  right: 0;
}

.cart-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  border-bottom: 1px solid #eee;
}

.cart-header h2 {
  font-family: var(--font-primary);
  font-size: 28px;
}

.close-cart {
  font-size: 24px;
  color: var(--text-dark);
  background: none;
  border: none;
  cursor: pointer;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
}

.empty-cart {
  text-align: center;
  color: var(--text-light);
  padding: 50px 0;
}

.cart-item {
  display: flex;
  gap: 15px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  background: var(--primary-light);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.cart-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item-details {
  flex: 1;
}

.cart-item-details h4 {
  font-size: 16px;
  margin-bottom: 5px;
}

.cart-item-details p {
  color: var(--text-light);
  font-size: 14px;
}

.cart-item-price {
  font-weight: 600;
  color: var(--primary-gold) !important;
  margin-top: 10px;
}

.cart-item-remove {
  color: #e74c3c;
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
}

.cart-footer {
  padding: 30px;
  border-top: 1px solid #eee;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
}

.total-price {
  color: var(--primary-gold);
}

.checkout-btn {
  width: 100%;
  padding: 15px;
  background: var(--primary-gold);
  color: var(--white);
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.checkout-btn:hover {
  background: var(--accent);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .cart-modal {
    max-width: 100%;
  }
}
</style>
