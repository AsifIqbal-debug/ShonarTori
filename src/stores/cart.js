import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isOpen = ref(false)
  
  // Load from localStorage
  function initCart() {
    const saved = localStorage.getItem('cart')
    if (saved) {
      items.value = JSON.parse(saved)
    }
  }
  
  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })
  
  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })
  
  function addItem(product) {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({
        ...product,
        quantity: 1
      })
    }
    
    saveCart()
  }
  
  function removeItem(productId) {
    items.value = items.value.filter(item => item.id !== productId)
    saveCart()
  }
  
  function updateQuantity(productId, quantity) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        removeItem(productId)
      } else {
        saveCart()
      }
    }
  }
  
  function clearCart() {
    items.value = []
    saveCart()
  }
  
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }
  
  return {
    items,
    isOpen,
    totalItems,
    totalPrice,
    initCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
})
