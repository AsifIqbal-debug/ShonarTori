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
        <div v-if="cartStore.items.length === 0" class="empty-cart">
          <i class="fas fa-shopping-cart empty-icon"></i>
          <p>{{ t('Your cart is empty', 'আপনার কার্ট খালি') }}</p>
          <router-link to="/#products" class="shop-now-btn" @click="$emit('close')">
            {{ t('Shop Now', 'কেনাকাটা করুন') }}
          </router-link>
        </div>
        
        <div v-for="item in cartStore.items" :key="item.itemKey" class="cart-item">
          <div class="cart-item-image">
            <img :src="item.image" :alt="item.name[languageStore.currentLanguage]" />
          </div>
          <div class="cart-item-details">
            <h4>{{ item.name[languageStore.currentLanguage] }}</h4>
            <p class="item-meta">{{ item.category }} - {{ item.type }}</p>
            <div class="quantity-controls">
              <button @click="cartStore.updateQuantity(item.itemKey, item.quantity - 1)" :disabled="item.quantity <= 1">
                <i class="fas fa-minus"></i>
              </button>
              <span>{{ item.quantity }}</span>
              <button @click="cartStore.updateQuantity(item.itemKey, item.quantity + 1)">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <p class="cart-item-price">৳{{ (item.price * item.quantity).toLocaleString() }}</p>
          </div>
          <button class="cart-item-remove" @click="cartStore.removeItem(item.itemKey)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      
      <div class="cart-footer" v-if="cartStore.items.length > 0">
        <div class="cart-summary">
          <div class="summary-row">
            <span>{{ t('Subtotal', 'সাবটোটাল') }} ({{ cartStore.totalItems }} {{ t('items', 'আইটেম') }})</span>
            <span>৳{{ cartStore.subtotal.toLocaleString() }}</span>
          </div>
          <div class="summary-row total">
            <span>{{ t('Total:', 'মোট:') }}</span>
            <span class="total-price">৳{{ cartStore.subtotal.toLocaleString() }}</span>
          </div>
        </div>
        <div class="cart-actions">
          <router-link to="/cart" class="view-cart-btn" @click="$emit('close')">
            <i class="fas fa-shopping-cart"></i> {{ t('View Cart', 'কার্ট দেখুন') }}
          </router-link>
          <router-link to="/checkout" class="checkout-btn" @click="$emit('close')">
            <i class="fas fa-lock"></i> {{ t('Checkout', 'চেকআউট') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLanguageStore } from '../stores/language'
import { useCartStore } from '../stores/cart'

const emit = defineEmits(['close'])

const languageStore = useLanguageStore()
const cartStore = useCartStore()
const { t } = languageStore

onMounted(() => {
  cartStore.initCart()
})
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
  padding: 20px;
}

.empty-cart {
  text-align: center;
  color: var(--text-light);
  padding: 60px 20px;
}

.empty-icon {
  font-size: 60px;
  color: #ddd;
  margin-bottom: 20px;
}

.empty-cart p {
  margin-bottom: 20px;
  font-size: 16px;
}

.shop-now-btn {
  display: inline-block;
  padding: 12px 30px;
  background: var(--primary-gold);
  color: white;
  border-radius: 8px;
  font-weight: 600;
}

.shop-now-btn:hover {
  background: var(--accent);
}

.cart-item {
  display: flex;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.cart-item-image {
  width: 70px;
  height: 70px;
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
  font-size: 15px;
  margin-bottom: 3px;
}

.item-meta {
  color: var(--text-light);
  font-size: 12px;
  text-transform: capitalize;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

.quantity-controls button {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.quantity-controls button:hover:not(:disabled) {
  border-color: var(--primary-gold);
  color: var(--primary-gold);
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls span {
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.cart-item-price {
  font-weight: 600;
  color: var(--primary-gold) !important;
  margin-top: 8px;
  font-size: 14px;
}

.cart-item-remove {
  color: #e74c3c;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  opacity: 0.7;
}

.cart-item-remove:hover {
  opacity: 1;
}

.cart-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  background: #fafafa;
}

.cart-summary {
  margin-bottom: 15px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 14px;
  color: var(--text-light);
}

.summary-row.total {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-dark);
  padding-top: 10px;
  border-top: 1px solid #eee;
  margin-top: 10px;
}

.total-price {
  color: var(--primary-gold);
}

.cart-actions {
  display: flex;
  gap: 10px;
}

.view-cart-btn,
.checkout-btn {
  flex: 1;
  padding: 12px 15px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: var(--transition-smooth);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.view-cart-btn {
  background: white;
  color: var(--text-dark);
  border: 2px solid #ddd;
}

.view-cart-btn:hover {
  border-color: var(--primary-gold);
  color: var(--primary-gold);
}

.checkout-btn {
  background: var(--primary-gold);
  color: var(--white);
}

.checkout-btn:hover {
  background: var(--accent);
}

@media (max-width: 768px) {
  .cart-modal {
    max-width: 100%;
  }
  
  .cart-actions {
    flex-direction: column;
  }
}
</style>
