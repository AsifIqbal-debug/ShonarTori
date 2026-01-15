<template>
  <div class="search-modal" :class="{ active: true }" @click.self="$emit('close')">
    <div class="search-content">
      <button class="close-search" @click="$emit('close')">
        <i class="fas fa-times"></i>
      </button>
      <input 
        type="text" 
        ref="searchInput"
        v-model="query"
        class="search-input" 
        :placeholder="t('Search for jewelry...', 'জুয়েলারি খুঁজুন...')"
        @input="handleSearch"
      >
      <div class="search-results">
        <p v-if="query.length >= 2 && results.length === 0" class="no-results">
          {{ t('No products found', 'কোন পণ্য পাওয়া যায়নি') }}
        </p>
        <div 
          v-for="product in results" 
          :key="product.id" 
          class="search-result-item"
          @click="handleResultClick"
        >
          <h4>{{ product.name[languageStore.currentLanguage] }}</h4>
          <p>{{ product.category }} - {{ product.type }} | ${{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLanguageStore } from '../stores/language'
import { useProductsStore } from '../stores/products'

const emit = defineEmits(['close'])

const languageStore = useLanguageStore()
const productsStore = useProductsStore()
const { t } = languageStore

const query = ref('')
const results = ref([])
const searchInput = ref(null)

function handleSearch() {
  if (query.value.length >= 2) {
    results.value = productsStore.searchProducts(query.value)
  } else {
    results.value = []
  }
}

function handleResultClick() {
  emit('close')
  const productsSection = document.getElementById('products')
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  setTimeout(() => {
    searchInput.value?.focus()
  }, 100)
})
</script>

<style scoped>
.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition-smooth);
}

.search-modal.active {
  opacity: 1;
  visibility: visible;
}

.search-content {
  width: 90%;
  max-width: 600px;
  position: relative;
}

.close-search {
  position: absolute;
  top: -50px;
  right: 0;
  color: var(--white);
  font-size: 30px;
  background: none;
  border: none;
  cursor: pointer;
}

.search-input {
  width: 100%;
  padding: 20px;
  font-size: 24px;
  border: none;
  border-bottom: 2px solid var(--primary-gold);
  background: transparent;
  color: var(--white);
  font-family: var(--font-primary);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-input:focus {
  outline: none;
}

.search-results {
  margin-top: 30px;
  max-height: 400px;
  overflow-y: auto;
}

.no-results {
  color: white;
  text-align: center;
  padding: 20px;
}

.search-result-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  color: var(--white);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.search-result-item:hover {
  background: rgba(255, 255, 255, 0.2);
}

.search-result-item h4 {
  margin-bottom: 5px;
}

.search-result-item p {
  font-size: 14px;
  opacity: 0.8;
}
</style>
