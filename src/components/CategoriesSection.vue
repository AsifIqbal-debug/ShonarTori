<template>
  <section class="categories" id="categories">
    <div class="container">
      <div class="section-header fade-in-up">
        <h2 class="section-title">{{ t('Our Collections', 'আমাদের কালেকশন') }}</h2>
        <p class="section-subtitle">
          {{ t('Explore our exclusive range of gold and silver jewelry', 
               'আমাদের সোনা এবং রুপার জুয়েলারির এক্সক্লুসিভ রেঞ্জ দেখুন') }}
        </p>
      </div>
      
      <div class="category-grid">
        <!-- Gold Jewelry -->
        <div class="category-card fade-in-up" data-category="gold" @click="handleCategoryClick('gold')">
          <div class="category-image">
            <div class="category-overlay">
              <h3>{{ t('Gold Collection', 'সোনার কালেকশন') }}</h3>
              <p>{{ t('Timeless beauty in 22K gold', '২২ ক্যারেট সোনায় চিরন্তন সৌন্দর্য') }}</p>
            </div>
            <i class="fas fa-crown category-icon"></i>
          </div>
          <div class="category-types">
            <span class="type-badge">{{ t('Rings', 'আংটি') }}</span>
            <span class="type-badge">{{ t('Lockets', 'লকেট') }}</span>
            <span class="type-badge">{{ t('Bracelets', 'ব্রেসলেট') }}</span>
            <span class="type-badge">{{ t('Necklaces', 'নেকলেস') }}</span>
          </div>
        </div>

        <!-- Silver Jewelry -->
        <div class="category-card fade-in-up delay-1" data-category="silver" @click="handleCategoryClick('silver')">
          <div class="category-image silver">
            <div class="category-overlay">
              <h3>{{ t('Silver Collection', 'রুপার কালেকশন') }}</h3>
              <p>{{ t('Elegant designs in pure silver', 'খাঁটি রুপায় মার্জিত ডিজাইন') }}</p>
            </div>
            <i class="fas fa-star category-icon"></i>
          </div>
          <div class="category-types">
            <span class="type-badge">{{ t('Rings', 'আংটি') }}</span>
            <span class="type-badge">{{ t('Lockets', 'লকেট') }}</span>
            <span class="type-badge">{{ t('Bracelets', 'ব্রেসলেট') }}</span>
            <span class="type-badge">{{ t('Necklaces', 'নেকলেস') }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguageStore } from '../stores/language'
import { useProductsStore } from '../stores/products'

const languageStore = useLanguageStore()
const productsStore = useProductsStore()
const { t } = languageStore

function handleCategoryClick(category) {
  const productsSection = document.getElementById('products')
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      productsStore.setFilter(category)
    }, 500)
  }
}
</script>

<style scoped>
.categories {
  background: var(--primary-light);
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

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.category-card {
  background: var(--white);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: var(--transition-smooth);
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
}

.category-image {
  height: 350px;
  background: linear-gradient(135deg, var(--primary-gold) 0%, var(--accent) 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.category-image.silver {
  background: linear-gradient(135deg, var(--silver) 0%, #9e9e9e 100%);
}

.category-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--white);
  padding: 30px;
  text-align: center;
  transition: var(--transition-smooth);
}

.category-card:hover .category-overlay {
  background: rgba(0, 0, 0, 0.7);
}

.category-overlay h3 {
  font-family: var(--font-primary);
  font-size: 36px;
  margin-bottom: 15px;
}

.category-overlay p {
  font-size: 16px;
  opacity: 0.9;
}

.category-icon {
  font-size: 100px;
  color: rgba(255, 255, 255, 0.2);
  position: absolute;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.category-types {
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.type-badge {
  padding: 8px 20px;
  background: var(--primary-light);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  transition: var(--transition-smooth);
}

.type-badge:hover {
  background: var(--primary-gold);
  color: var(--white);
}

/* Animation Classes */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
}

.delay-1 { animation-delay: 0.2s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 36px;
  }
  
  .category-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 28px;
  }
}
</style>
