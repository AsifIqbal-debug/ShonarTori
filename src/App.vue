<template>
  <div id="app-container">
    <!-- Language Toggle -->
    <LanguageToggle />
    
    <!-- Navigation -->
    <Navbar @open-search="showSearch = true" @open-cart="showCart = true" />
    
    <!-- Search Modal -->
    <SearchModal v-if="showSearch" @close="showSearch = false" />
    
    <!-- Cart Modal -->
    <CartModal v-if="showCart" @close="showCart = false" />
    
    <!-- Router View for Pages -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    
    <!-- Footer -->
    <FooterSection />
    
    <!-- Scroll to Top Button -->
    <ScrollToTop />
    
    <!-- Notification -->
    <Notification />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLanguageStore } from './stores/language'

// Components
import LanguageToggle from './components/LanguageToggle.vue'
import Navbar from './components/Navbar.vue'
import SearchModal from './components/SearchModal.vue'
import CartModal from './components/CartModal.vue'
import FooterSection from './components/FooterSection.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import Notification from './components/Notification.vue'

const showSearch = ref(false)
const showCart = ref(false)

const languageStore = useLanguageStore()

onMounted(() => {
  languageStore.initLanguage()
  
  // Console welcome message
  console.log('%c ShonarTori - Premium Jewelry Collection ', 'background: #D4AF37; color: white; font-size: 20px; padding: 10px;')
  console.log('%c Built with ❤️ using Vue.js ', 'font-size: 14px; color: #666;')
})
</script>

<style>
/* Page Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
