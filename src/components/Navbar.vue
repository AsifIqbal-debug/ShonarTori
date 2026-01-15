<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="nav-wrapper">
        <router-link to="/" class="logo">
          <i class="fas fa-gem"></i>
          <span>ShonarTori</span>
        </router-link>
        
        <ul class="nav-menu" :class="{ active: menuOpen }">
          <li><router-link to="/" class="nav-link" @click="closeMenu">{{ t('Home', 'হোম') }}</router-link></li>
          <li><router-link to="/#categories" class="nav-link" @click="closeMenu">{{ t('Categories', 'ক্যাটাগরি') }}</router-link></li>
          <li><router-link to="/#products" class="nav-link" @click="closeMenu">{{ t('Products', 'পণ্য') }}</router-link></li>
          <li><router-link to="/#about" class="nav-link" @click="closeMenu">{{ t('About', 'আমাদের সম্পর্কে') }}</router-link></li>
          <li class="has-dropdown">
            <a href="#" class="nav-link" @click.prevent="toggleDropdown">
              {{ t('Support', 'সাপোর্ট') }}
              <i class="fas fa-chevron-down dropdown-icon"></i>
            </a>
            <ul class="dropdown-menu" :class="{ show: dropdownOpen }">
              <li><router-link to="/my-orders" @click="closeMenu">{{ t('My Orders', 'আমার অর্ডার') }}</router-link></li>
              <li><router-link to="/track-order" @click="closeMenu">{{ t('Track Order', 'অর্ডার ট্র্যাক') }}</router-link></li>
              <li><router-link to="/shipping-info" @click="closeMenu">{{ t('Shipping Info', 'শিপিং তথ্য') }}</router-link></li>
              <li><router-link to="/return-policy" @click="closeMenu">{{ t('Return Policy', 'রিটার্ন নীতি') }}</router-link></li>
              <li><router-link to="/size-guide" @click="closeMenu">{{ t('Size Guide', 'সাইজ গাইড') }}</router-link></li>
              <li><router-link to="/faq" @click="closeMenu">{{ t('FAQ', 'প্রশ্নোত্তর') }}</router-link></li>
            </ul>
          </li>
          <li><router-link to="/#contact" class="nav-link" @click="closeMenu">{{ t('Contact', 'যোগাযোগ') }}</router-link></li>
        </ul>
        
        <div class="nav-actions">
          <button class="search-btn" @click="$emit('open-search')" :title="t('Search', 'অনুসন্ধান')">
            <i class="fas fa-search"></i>
          </button>
          <button class="cart-btn" @click="$emit('open-cart')" :title="t('Cart', 'কার্ট')">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-count" v-if="cartStore.totalItems > 0">{{ cartStore.totalItems }}</span>
          </button>
          <button class="lang-btn" @click="languageStore.toggleLanguage()" :title="languageStore.isEnglish ? 'বাংলা' : 'English'">
            <i class="fas fa-language"></i>
            <span>{{ languageStore.isEnglish ? 'বাংলা' : 'EN' }}</span>
          </button>
          <button class="menu-toggle" @click="toggleMenu">
            <i :class="menuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useLanguageStore } from '../stores/language'
import { useCartStore } from '../stores/cart'

const emit = defineEmits(['open-search', 'open-cart'])

const languageStore = useLanguageStore()
const cartStore = useCartStore()
const { t } = languageStore

const isScrolled = ref(false)
const menuOpen = ref(false)
const dropdownOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 100
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (!menuOpen.value) dropdownOpen.value = false
}

function closeMenu() {
  menuOpen.value = false
  dropdownOpen.value = false
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  cartStore.initCart()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: transparent;
  padding: 20px 0;
  z-index: 1000;
  transition: var(--transition-smooth);
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(10px);
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-primary);
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-gold);
}

.logo i {
  font-size: 32px;
}

.nav-menu {
  display: flex;
  gap: 40px;
  align-items: center;
  list-style: none;
}

.nav-link {
  font-weight: 500;
  color: var(--text-dark);
  position: relative;
  padding: 5px 0;
  text-decoration: none;
  transition: var(--transition-smooth);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-gold);
  transition: var(--transition-smooth);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-btn,
.cart-btn {
  font-size: 20px;
  color: var(--text-dark);
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.cart-btn {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--primary-gold);
  color: var(--white);
  font-size: 12px;
  font-weight: 600;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-toggle {
  display: none;
  font-size: 24px;
  color: var(--text-dark);
  background: none;
  border: none;
  cursor: pointer;
}

.lang-btn {
  background: var(--primary-gold);
  color: var(--white);
  padding: 8px 16px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  font-size: 14px;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-smooth);
  border: none;
  cursor: pointer;
}

.lang-btn:hover {
  background: var(--accent);
  transform: translateY(-2px);
}

.lang-btn i {
  font-size: 16px;
}

/* Dropdown Menu Styles */
.has-dropdown {
  position: relative;
}

.has-dropdown > .nav-link {
  display: flex;
  align-items: center;
  gap: 5px;
}

.dropdown-icon {
  font-size: 12px;
  transition: var(--transition-smooth);
}

.has-dropdown:hover .dropdown-icon {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--white);
  min-width: 200px;
  border-radius: 10px;
  box-shadow: var(--shadow-lg);
  padding: 10px 0;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition-smooth);
  list-style: none;
  z-index: 1001;
}

.has-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
}

.dropdown-menu li a {
  display: block;
  padding: 12px 20px;
  color: var(--text-dark);
  text-decoration: none;
  transition: var(--transition-smooth);
}

.dropdown-menu li a:hover {
  background: var(--primary-light);
  color: var(--primary-gold);
}

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 80px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 80px);
    background: var(--white);
    flex-direction: column;
    padding: 40px 0;
    box-shadow: var(--shadow-lg);
    transition: var(--transition-smooth);
    overflow-y: auto;
  }
  
  .nav-menu.active {
    left: 0;
  }
  
  .menu-toggle {
    display: block;
  }
  
  .has-dropdown {
    width: 100%;
    text-align: center;
  }
  
  .has-dropdown > .nav-link {
    justify-content: center;
  }
  
  .dropdown-menu {
    position: static;
    transform: none;
    box-shadow: none;
    background: var(--primary-light);
    border-radius: 0;
    max-height: 0;
    overflow: hidden;
    opacity: 1;
    visibility: visible;
    transition: max-height 0.3s ease;
  }
  
  .dropdown-menu.show {
    max-height: 500px;
  }
}
</style>
