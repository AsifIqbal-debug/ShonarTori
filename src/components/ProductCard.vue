<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image" :alt="product.name[languageStore.currentLanguage]" />
      <span class="product-badge">{{ categoryText }}</span>
    </div>
    <div class="product-info">
      <p class="product-category">{{ product.type }}</p>
      <h3 class="product-name">{{ product.name[languageStore.currentLanguage] }}</h3>
      <p class="product-price">${{ product.price }}</p>
      <div class="product-actions">
        <button class="add-to-cart-btn" @click="handleAddToCart">
          <i class="fas fa-shopping-cart"></i> {{ t('Add to Cart', 'কার্টে যোগ করুন') }}
        </button>
        <button class="quick-view-btn">
          <i class="fas fa-eye"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguageStore } from '../stores/language'
import { useCartStore } from '../stores/cart'
import { useNotificationStore } from '../stores/notification'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const languageStore = useLanguageStore()
const cartStore = useCartStore()
const notificationStore = useNotificationStore()
const { t } = languageStore

const categoryText = computed(() => {
  if (languageStore.currentLanguage === 'en') {
    return props.product.category.charAt(0).toUpperCase() + props.product.category.slice(1)
  }
  return props.product.category === 'gold' ? 'সোনা' : 'রুপা'
})

function handleAddToCart() {
  cartStore.addItem(props.product)
  const message = languageStore.t('Added to cart!', 'কার্টে যোগ করা হয়েছে!')
  notificationStore.show(message)
}
</script>

<style scoped>
.product-card {
  background: var(--white);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-smooth);
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
}

.product-image {
  height: 250px;
  background: var(--primary-light);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-smooth);
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.product-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--primary-gold);
  color: var(--white);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.product-info {
  padding: 20px;
}

.product-category {
  font-size: 12px;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
}

.product-name {
  font-family: var(--font-primary);
  font-size: 20px;
  margin-bottom: 10px;
  color: var(--text-dark);
}

.product-price {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-gold);
  margin-bottom: 15px;
}

.product-actions {
  display: flex;
  gap: 10px;
}

.add-to-cart-btn {
  flex: 1;
  padding: 12px;
  background: var(--primary-gold);
  color: var(--white);
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.add-to-cart-btn:hover {
  background: var(--accent);
}

.quick-view-btn {
  width: 45px;
  height: 45px;
  border-radius: 8px;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.quick-view-btn:hover {
  background: var(--text-dark);
  color: var(--white);
}
</style>
