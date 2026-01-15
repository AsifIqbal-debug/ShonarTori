import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const savedItems = ref([]) // Save for later items
  const isOpen = ref(false)
  const shippingMethod = ref('standard')
  const selectedAddress = ref(null)
  
  // Shipping rates
  const shippingRates = {
    standard: { price: 80, days: 5, nameEn: 'Standard Shipping', nameBn: 'স্ট্যান্ডার্ড শিপিং' },
    express: { price: 150, days: 2, nameEn: 'Express Shipping', nameBn: 'এক্সপ্রেস শিপিং' },
    sameDay: { price: 250, days: 0, nameEn: 'Same Day Delivery', nameBn: 'সেম ডে ডেলিভারি' }
  }
  
  // Free shipping threshold
  const freeShippingThreshold = 5000
  
  // Load from localStorage
  function initCart() {
    const saved = localStorage.getItem('shonartori_cart')
    if (saved) {
      items.value = JSON.parse(saved)
    }
    const savedForLater = localStorage.getItem('shonartori_saved')
    if (savedForLater) {
      savedItems.value = JSON.parse(savedForLater)
    }
  }
  
  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })
  
  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })

  // Subtotal (before shipping & discounts)
  const subtotal = computed(() => totalPrice.value)

  // Shipping cost calculation
  const shippingCost = computed(() => {
    if (totalPrice.value >= freeShippingThreshold) {
      return 0
    }
    return shippingRates[shippingMethod.value]?.price || 80
  })

  // Tax calculation (15% VAT for jewelry in Bangladesh - for demo)
  const taxRate = 0 // Set to 0 for now, can be enabled
  const taxAmount = computed(() => Math.round(subtotal.value * taxRate))

  // Grand total
  const grandTotal = computed(() => subtotal.value + shippingCost.value + taxAmount.value)

  // Check if eligible for free shipping
  const freeShippingEligible = computed(() => totalPrice.value >= freeShippingThreshold)

  // Amount needed for free shipping
  const amountForFreeShipping = computed(() => {
    if (freeShippingEligible.value) return 0
    return freeShippingThreshold - totalPrice.value
  })
  
  function addItem(product, options = {}) {
    const itemKey = `${product.id}-${options.size || 'default'}-${options.customization || ''}`
    const existingItem = items.value.find(item => item.itemKey === itemKey)
    
    if (existingItem) {
      existingItem.quantity += options.quantity || 1
    } else {
      items.value.push({
        ...product,
        itemKey,
        quantity: options.quantity || 1,
        size: options.size || null,
        customization: options.customization || null,
        giftWrap: options.giftWrap || false,
        giftMessage: options.giftMessage || '',
        addedAt: new Date().toISOString()
      })
    }
    
    saveCart()
    return true
  }
  
  function removeItem(itemKey) {
    items.value = items.value.filter(item => item.itemKey !== itemKey)
    saveCart()
  }
  
  function updateQuantity(itemKey, quantity) {
    const item = items.value.find(item => item.itemKey === itemKey)
    if (item) {
      item.quantity = Math.max(1, quantity)
      if (item.quantity <= 0) {
        removeItem(itemKey)
      } else {
        saveCart()
      }
    }
  }

  // Save item for later
  function saveForLater(itemKey) {
    const itemIndex = items.value.findIndex(item => item.itemKey === itemKey)
    if (itemIndex > -1) {
      const item = items.value.splice(itemIndex, 1)[0]
      savedItems.value.push(item)
      saveCart()
      saveSavedItems()
    }
  }

  // Move saved item back to cart
  function moveToCart(itemKey) {
    const itemIndex = savedItems.value.findIndex(item => item.itemKey === itemKey)
    if (itemIndex > -1) {
      const item = savedItems.value.splice(itemIndex, 1)[0]
      items.value.push(item)
      saveCart()
      saveSavedItems()
    }
  }

  // Remove from saved items
  function removeSavedItem(itemKey) {
    savedItems.value = savedItems.value.filter(item => item.itemKey !== itemKey)
    saveSavedItems()
  }
  
  function clearCart() {
    items.value = []
    saveCart()
  }

  // Set shipping method
  function setShippingMethod(method) {
    if (shippingRates[method]) {
      shippingMethod.value = method
    }
  }

  // Get estimated delivery date
  function getEstimatedDelivery() {
    const days = shippingRates[shippingMethod.value]?.days || 5
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date
  }
  
  function saveCart() {
    localStorage.setItem('shonartori_cart', JSON.stringify(items.value))
  }

  function saveSavedItems() {
    localStorage.setItem('shonartori_saved', JSON.stringify(savedItems.value))
  }

  // Check if item is in cart
  function isInCart(productId) {
    return items.value.some(item => item.id === productId)
  }

  // Get cart item by product ID
  function getCartItem(productId) {
    return items.value.find(item => item.id === productId)
  }
  
  return {
    items,
    savedItems,
    isOpen,
    shippingMethod,
    shippingRates,
    selectedAddress,
    freeShippingThreshold,
    totalItems,
    totalPrice,
    subtotal,
    shippingCost,
    taxAmount,
    grandTotal,
    freeShippingEligible,
    amountForFreeShipping,
    initCart,
    addItem,
    removeItem,
    updateQuantity,
    saveForLater,
    moveToCart,
    removeSavedItem,
    clearCart,
    setShippingMethod,
    getEstimatedDelivery,
    isInCart,
    getCartItem
  }
})

