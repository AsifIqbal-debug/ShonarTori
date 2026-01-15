<template>
  <section class="products" id="products">
    <div class="container">
      <div class="section-header fade-in-up">
        <h2 class="section-title">{{ t('Featured Products', 'ফিচার্ড পণ্য') }}</h2>
        <p class="section-subtitle">
          {{ t('Discover our handpicked selection of stunning jewelry pieces', 
               'আমাদের হস্তনির্বাচিত চমৎকার জুয়েলারি পণ্য আবিষ্কার করুন') }}
        </p>
      </div>

      <!-- Filter Buttons -->
      <div class="filter-buttons fade-in-up">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          class="filter-btn" 
          :class="{ active: productsStore.activeFilter === filter.value }"
          @click="productsStore.setFilter(filter.value)"
        >
          {{ t(filter.en, filter.bn) }}
        </button>
      </div>

      <!-- Product Grid -->
      <div class="product-grid">
        <TransitionGroup name="product">
          <ProductCard 
            v-for="product in productsStore.filteredProducts" 
            :key="product.id" 
            :product="product"
          />
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguageStore } from '../stores/language'
import { useProductsStore } from '../stores/products'
import ProductCard from './ProductCard.vue'

const languageStore = useLanguageStore()
const productsStore = useProductsStore()
const { t } = languageStore

const filters = [
  { value: 'all', en: 'All', bn: 'সব' },
  { value: 'gold', en: 'Gold', bn: 'সোনা' },
  { value: 'silver', en: 'Silver', bn: 'রুপা' },
  { value: 'ring', en: 'Rings', bn: 'আংটি' },
  { value: 'locket', en: 'Lockets', bn: 'লকেট' },
  { value: 'bracelet', en: 'Bracelets', bn: 'ব্রেসলেট' },
  { value: 'necklace', en: 'Necklaces', bn: 'নেকলেস' }
]
</script>

<style scoped>
.products {
  padding: var(--section-padding);
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-family: var(--font-primary);
  font-size: 48px;
  margin-bottom: 20px;
  color: var(--text-dark);
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--primary-gold);
}

.section-subtitle {
  font-size: 18px;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 50px;
}

.filter-btn {
  padding: 10px 25px;
  border-radius: 25px;
  background: var(--white);
  border: 2px solid #eee;
  font-weight: 500;
  transition: var(--transition-smooth);
  cursor: pointer;
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--primary-gold);
  color: var(--white);
  border-color: var(--primary-gold);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

/* Animation Classes */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Product Transition */
.product-enter-active,
.product-leave-active {
  transition: all 0.5s ease;
}

.product-enter-from,
.product-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 36px;
  }
  
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 28px;
  }
  
  .product-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-buttons {
    gap: 10px;
  }
  
  .filter-btn {
    padding: 8px 20px;
    font-size: 14px;
  }
}
</style>
