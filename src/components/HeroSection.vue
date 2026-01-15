<template>
  <section class="hero" id="home">
    <div class="hero-background"></div>
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title fade-in-up">
          <span class="title-line">{{ t('Discover Timeless', 'আবিষ্কার করুন চিরন্তন') }}</span>
          <span class="title-line highlight">{{ t('Elegance', 'কমনীয়তা') }}</span>
        </h1>
        <p class="hero-subtitle fade-in-up delay-1">
          {{ t('Exquisite gold and silver jewelry crafted with precision and passion', 
               'নিখুঁততা এবং আবেগের সাথে তৈরি সোনা এবং রুপার জুয়েলারি') }}
        </p>
        <div class="hero-buttons fade-in-up delay-2">
          <a href="#products" class="btn btn-primary">{{ t('Shop Now', 'এখনই কিনুন') }}</a>
          <a href="#categories" class="btn btn-secondary">{{ t('Explore Collection', 'কালেকশন দেখুন') }}</a>
        </div>
      </div>
      <div class="hero-image fade-in-up delay-3">
        <div class="floating-jewelry">
          <i class="fas fa-gem"></i>
        </div>
      </div>
    </div>
    <div class="scroll-indicator">
      <i class="fas fa-chevron-down"></i>
    </div>
  </section>
</template>

<script setup>
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()
const { t } = languageStore
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
  padding-top: 80px;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(192, 192, 192, 0.1) 0%, transparent 50%);
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.1) rotate(5deg);
  }
}

.hero .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-content {
  animation: fadeInUp 1s ease;
}

.hero-title {
  font-family: var(--font-primary);
  font-size: 64px;
  line-height: 1.2;
  margin-bottom: 30px;
  font-weight: 700;
}

.title-line {
  display: block;
}

.highlight {
  color: var(--primary-gold);
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  height: 15px;
  background: rgba(212, 175, 55, 0.3);
  z-index: -1;
  animation: highlightExpand 1s ease 0.5s forwards;
  transform: scaleX(0);
  transform-origin: left;
}

@keyframes highlightExpand {
  to {
    transform: scaleX(1);
  }
}

.hero-subtitle {
  font-size: 18px;
  color: var(--text-light);
  margin-bottom: 40px;
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 15px 40px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  transition: var(--transition-smooth);
  text-decoration: none;
}

.btn-primary {
  background: var(--primary-gold);
  color: var(--white);
}

.btn-primary:hover {
  background: var(--accent);
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: transparent;
  color: var(--text-dark);
  border: 2px solid var(--text-dark);
}

.btn-secondary:hover {
  background: var(--text-dark);
  color: var(--white);
}

.hero-image {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.floating-jewelry {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, var(--primary-gold) 0%, var(--accent) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: float 6s ease-in-out infinite;
  box-shadow: 0 20px 60px rgba(212, 175, 55, 0.3);
}

.floating-jewelry i {
  font-size: 120px;
  color: var(--white);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-30px);
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
}

.scroll-indicator i {
  font-size: 30px;
  color: var(--primary-gold);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

/* Animation Classes */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .hero .container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-image {
    order: -1;
  }
  
  .floating-jewelry {
    width: 250px;
    height: 250px;
  }
  
  .floating-jewelry i {
    font-size: 100px;
  }
  
  .hero-title {
    font-size: 52px;
  }
  
  .hero-buttons {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 42px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .btn {
    padding: 12px 30px;
    font-size: 14px;
  }
  
  .floating-jewelry {
    width: 200px;
    height: 200px;
  }
  
  .floating-jewelry i {
    font-size: 80px;
  }
}
</style>
