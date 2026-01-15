import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref('en')
  
  const isEnglish = computed(() => currentLanguage.value === 'en')
  const isBangla = computed(() => currentLanguage.value === 'bn')
  
  function initLanguage() {
    const saved = localStorage.getItem('language')
    if (saved) {
      currentLanguage.value = saved
    }
    updatePageTitle()
  }
  
  function toggleLanguage() {
    currentLanguage.value = currentLanguage.value === 'en' ? 'bn' : 'en'
    localStorage.setItem('language', currentLanguage.value)
    updatePageTitle()
  }
  
  function updatePageTitle() {
    const titles = {
      en: 'ShonarTori - Premium Jewelry Collection',
      bn: 'সোনারতরী - প্রিমিয়াম জুয়েলারি কালেকশন'
    }
    document.title = titles[currentLanguage.value]
  }
  
  function t(en, bn) {
    return currentLanguage.value === 'en' ? en : bn
  }
  
  return {
    currentLanguage,
    isEnglish,
    isBangla,
    initLanguage,
    toggleLanguage,
    t
  }
})
