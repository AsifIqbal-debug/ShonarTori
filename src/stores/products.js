import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([
    // Gold Rings
    { id: 1, name: { en: "Royal Gold Ring", bn: "রাজকীয় সোনার আংটি" }, category: "gold", type: "ring", price: 450, image: "/images/Gold Ring.png" },
    { id: 2, name: { en: "Classic Gold Band", bn: "ক্লাসিক সোনার ব্যান্ড" }, category: "gold", type: "ring", price: 380, image: "/images/Gold Ring.png" },
    { id: 3, name: { en: "Diamond Gold Ring", bn: "হীরার সোনার আংটি" }, category: "gold", type: "ring", price: 650, image: "/images/Gold Ring.png" },
    
    // Gold Lockets
    { id: 4, name: { en: "Heart Gold Locket", bn: "হার্ট সোনার লকেট" }, category: "gold", type: "locket", price: 520, image: "/images/Gold Locket.png" },
    { id: 5, name: { en: "Traditional Gold Pendant", bn: "ঐতিহ্যবাহী সোনার পেন্ডেন্ট" }, category: "gold", type: "locket", price: 480, image: "/images/Gold Locket.png" },
    { id: 6, name: { en: "Modern Gold Charm", bn: "আধুনিক সোনার চার্ম" }, category: "gold", type: "locket", price: 390, image: "/images/Gold Locket.png" },
    
    // Gold Bracelets
    { id: 7, name: { en: "Elegant Gold Bracelet", bn: "মার্জিত সোনার ব্রেসলেট" }, category: "gold", type: "bracelet", price: 720, image: "/images/Gold Bracelet.png" },
    { id: 8, name: { en: "Gold Chain Bracelet", bn: "সোনার চেইন ব্রেসলেট" }, category: "gold", type: "bracelet", price: 580, image: "/images/Gold Bracelet.png" },
    
    // Gold Necklaces
    { id: 9, name: { en: "Luxury Gold Necklace", bn: "বিলাসবহুল সোনার নেকলেস" }, category: "gold", type: "necklace", price: 1200, image: "/images/Gold Neckless.png" },
    { id: 10, name: { en: "Traditional Gold Chain", bn: "ঐতিহ্যবাহী সোনার চেইন" }, category: "gold", type: "necklace", price: 950, image: "/images/Gold Neckless.png" },
    
    // Silver Rings
    { id: 11, name: { en: "Sterling Silver Ring", bn: "স্টার্লিং সিলভার আংটি" }, category: "silver", type: "ring", price: 120, image: "/images/Silver Ring.png" },
    { id: 12, name: { en: "Silver Band Ring", bn: "সিলভার ব্যান্ড আংটি" }, category: "silver", type: "ring", price: 95, image: "/images/Silver Ring.png" },
    { id: 13, name: { en: "Gemstone Silver Ring", bn: "রত্ন সিলভার আংটি" }, category: "silver", type: "ring", price: 180, image: "/images/Silver Ring.png" },
    
    // Silver Lockets
    { id: 14, name: { en: "Silver Heart Locket", bn: "সিলভার হার্ট লকেট" }, category: "silver", type: "locket", price: 140, image: "/images/Silver Locket.png" },
    { id: 15, name: { en: "Elegant Silver Pendant", bn: "মার্জিত সিলভার পেন্ডেন্ট" }, category: "silver", type: "locket", price: 160, image: "/images/Silver Locket.png" },
    
    // Silver Bracelets
    { id: 16, name: { en: "Classic Silver Bracelet", bn: "ক্লাসিক সিলভার ব্রেসলেট" }, category: "silver", type: "bracelet", price: 210, image: "/images/Silver Bracelet.png" },
    { id: 17, name: { en: "Silver Charm Bracelet", bn: "সিলভার চার্ম ব্রেসলেট" }, category: "silver", type: "bracelet", price: 250, image: "/images/Silver Bracelet.png" },
    
    // Silver Necklaces
    { id: 18, name: { en: "Silver Chain Necklace", bn: "সিলভার চেইন নেকলেস" }, category: "silver", type: "necklace", price: 320, image: "/images/Silver Neckless.png" },
    { id: 19, name: { en: "Designer Silver Necklace", bn: "ডিজাইনার সিলভার নেকলেস" }, category: "silver", type: "necklace", price: 380, image: "/images/Silver Neckless.png" },
  ])
  
  const activeFilter = ref('all')
  
  const filteredProducts = computed(() => {
    if (activeFilter.value === 'all') {
      return products.value
    }
    return products.value.filter(
      product => product.category === activeFilter.value || product.type === activeFilter.value
    )
  })
  
  function setFilter(filter) {
    activeFilter.value = filter
  }
  
  function searchProducts(query) {
    const q = query.toLowerCase().trim()
    if (q.length < 2) return []
    
    return products.value.filter(product =>
      product.name.en.toLowerCase().includes(q) ||
      product.name.bn.includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.type.toLowerCase().includes(q)
    )
  }
  
  function getProductById(id) {
    return products.value.find(p => p.id === id)
  }
  
  return {
    products,
    activeFilter,
    filteredProducts,
    setFilter,
    searchProducts,
    getProductById
  }
})
