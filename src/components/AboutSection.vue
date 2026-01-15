<template>
  <section class="about" id="about">
    <div class="container">
      <div class="about-wrapper">
        <div class="about-image fade-in-left">
          <div class="about-image-placeholder">
            <i class="fas fa-ring"></i>
          </div>
        </div>
        <div class="about-content fade-in-right">
          <h2 class="section-title">{{ t('About ShonarTori', 'সোনারতরী সম্পর্কে') }}</h2>
          <p>
            {{ t('Since 2010, ShonarTori has been crafting exquisite jewelry that celebrates life\'s precious moments. Our master artisans combine traditional techniques with contemporary designs to create pieces that are both timeless and modern.',
                 '২০১০ সাল থেকে, সোনারতরী জীবনের মূল্যবান মুহূর্তগুলি উদযাপন করে এমন সূক্ষ্ম জুয়েলারি তৈরি করছে। আমাদের দক্ষ কারিগররা ঐতিহ্যবাহী কৌশলের সাথে সমসাময়িক ডিজাইন একত্রিত করে এমন পণ্য তৈরি করেন যা চিরন্তন এবং আধুনিক উভয়ই।') }}
          </p>
          <p>
            {{ t('Every piece in our collection is carefully crafted using the finest materials - from 22K gold to pure silver - ensuring that your jewelry remains beautiful for generations to come.',
                 'আমাদের কালেকশনের প্রতিটি পণ্য সর্বোত্তম উপকরণ ব্যবহার করে সযত্নে তৈরি করা হয় - ২২ ক্যারেট সোনা থেকে খাঁটি রুপা - নিশ্চিত করে যে আপনার জুয়েলারি প্রজন্মের পর প্রজন্ম সুন্দর থাকবে।') }}
          </p>
          <div class="about-features">
            <div class="feature-item">
              <i class="fas fa-certificate"></i>
              <h4>{{ t('Certified Quality', 'সার্টিফাইড মান') }}</h4>
            </div>
            <div class="feature-item">
              <i class="fas fa-hands-helping"></i>
              <h4>{{ t('Handcrafted', 'হস্তনির্মিত') }}</h4>
            </div>
            <div class="feature-item">
              <i class="fas fa-shield-alt"></i>
              <h4>{{ t('Lifetime Warranty', 'লাইফটাইম ওয়ারেন্টি') }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()
const { t } = languageStore
</script>

<style scoped>
.about {
  padding: var(--section-padding);
}

.about-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.about-image-placeholder {
  height: 500px;
  background: linear-gradient(135deg, var(--primary-gold) 0%, var(--accent) 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.about-image-placeholder i {
  font-size: 150px;
  color: rgba(255, 255, 255, 0.3);
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.about-content {
  max-width: 600px;
}

.about-content .section-title {
  text-align: left;
  margin-bottom: 30px;
  font-family: var(--font-primary);
  font-size: 48px;
  color: var(--text-dark);
  position: relative;
  display: inline-block;
}

.about-content .section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--primary-gold);
}

.about-content p {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-light);
  margin-bottom: 20px;
}

.about-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
}

.feature-item {
  text-align: center;
}

.feature-item i {
  font-size: 40px;
  color: var(--primary-gold);
  margin-bottom: 15px;
  display: block;
}

.feature-item h4 {
  font-size: 14px;
  font-weight: 600;
}

/* Animation Classes */
.fade-in-left {
  opacity: 0;
  transform: translateX(-30px);
  animation: fadeInLeft 0.8s ease forwards;
}

.fade-in-right {
  opacity: 0;
  transform: translateX(30px);
  animation: fadeInRight 0.8s ease forwards;
}

@keyframes fadeInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 1024px) {
  .about-wrapper {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about-content .section-title {
    font-size: 36px;
  }
  
  .about-features {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .about-content .section-title {
    font-size: 28px;
  }
}
</style>
