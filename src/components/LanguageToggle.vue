<template>
  <div class="language-toggle">
    <button class="lang-btn" @click="languageStore.toggleLanguage()">
      <i class="fas fa-language"></i>
      <span>{{ languageStore.isEnglish ? 'বাংলা' : 'English' }}</span>
    </button>
  </div>
</template>

<script setup>
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()
</script>

<style scoped>
.language-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
}

.lang-btn {
  background: var(--primary-gold);
  color: var(--white);
  padding: 10px 20px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  box-shadow: var(--shadow-md);
  transition: var(--transition-smooth);
  border: none;
  cursor: pointer;
}

.lang-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.lang-btn i {
  font-size: 18px;
}
</style>
