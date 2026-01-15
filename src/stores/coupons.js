import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCouponsStore = defineStore('coupons', () => {
  // Available coupons (in real app, this would come from backend)
  const availableCoupons = ref([
    {
      code: 'WELCOME10',
      type: 'percentage',
      value: 10,
      minPurchase: 1000,
      maxDiscount: 500,
      description: { en: '10% off on your first order', bn: 'প্রথম অর্ডারে ১০% ছাড়' },
      validUntil: '2026-12-31',
      usageLimit: 1
    },
    {
      code: 'GOLD20',
      type: 'percentage',
      value: 20,
      minPurchase: 5000,
      maxDiscount: 2000,
      description: { en: '20% off on gold jewelry', bn: 'সোনার গহনায় ২০% ছাড়' },
      validUntil: '2026-06-30',
      category: 'gold'
    },
    {
      code: 'NEWYEAR15',
      type: 'percentage',
      value: 15,
      minPurchase: 3000,
      maxDiscount: 1500,
      description: { en: '15% New Year discount', bn: 'নববর্ষে ১৫% ছাড়' },
      validUntil: '2026-02-28'
    },
    {
      code: 'FREESHIP',
      type: 'shipping',
      value: 100,
      minPurchase: 2000,
      description: { en: 'Free shipping on orders above ৳2000', bn: '৳২০০০+ অর্ডারে ফ্রি শিপিং' },
      validUntil: '2026-12-31'
    },
    {
      code: 'FLAT500',
      type: 'fixed',
      value: 500,
      minPurchase: 4000,
      description: { en: 'Flat ৳500 off', bn: 'সরাসরি ৳৫০০ ছাড়' },
      validUntil: '2026-12-31'
    }
  ])

  // Applied coupon
  const appliedCoupon = ref(null)
  const couponError = ref(null)

  // Validate and apply coupon
  function applyCoupon(code, cartTotal, cartItems = []) {
    couponError.value = null
    
    const coupon = availableCoupons.value.find(
      c => c.code.toUpperCase() === code.toUpperCase()
    )

    if (!coupon) {
      couponError.value = { en: 'Invalid coupon code', bn: 'অবৈধ কুপন কোড' }
      return null
    }

    // Check expiry
    if (new Date(coupon.validUntil) < new Date()) {
      couponError.value = { en: 'Coupon has expired', bn: 'কুপনের মেয়াদ শেষ' }
      return null
    }

    // Check minimum purchase
    if (cartTotal < coupon.minPurchase) {
      couponError.value = { 
        en: `Minimum purchase of ৳${coupon.minPurchase} required`, 
        bn: `সর্বনিম্ন ৳${coupon.minPurchase} কেনাকাটা প্রয়োজন` 
      }
      return null
    }

    // Check category restriction
    if (coupon.category) {
      const hasMatchingItem = cartItems.some(item => 
        item.material?.toLowerCase() === coupon.category.toLowerCase()
      )
      if (!hasMatchingItem) {
        couponError.value = { 
          en: `This coupon is only valid for ${coupon.category} items`, 
          bn: `এই কুপন শুধুমাত্র ${coupon.category} পণ্যের জন্য প্রযোজ্য` 
        }
        return null
      }
    }

    appliedCoupon.value = coupon
    return coupon
  }

  // Calculate discount amount
  function calculateDiscount(coupon, cartTotal) {
    if (!coupon) return 0

    let discount = 0

    switch (coupon.type) {
      case 'percentage':
        discount = (cartTotal * coupon.value) / 100
        if (coupon.maxDiscount) {
          discount = Math.min(discount, coupon.maxDiscount)
        }
        break
      case 'fixed':
        discount = coupon.value
        break
      case 'shipping':
        discount = coupon.value
        break
      default:
        discount = 0
    }

    return Math.round(discount)
  }

  // Remove applied coupon
  function removeCoupon() {
    appliedCoupon.value = null
    couponError.value = null
  }

  // Alias for removeCoupon
  function clearCoupon() {
    removeCoupon()
  }

  // Get discount for current coupon
  const currentDiscount = computed(() => {
    return appliedCoupon.value
  })

  // Get discount amount (requires cart total to be passed or computed externally)
  const discountAmount = computed(() => {
    if (!appliedCoupon.value) return 0
    // This will be calculated in components with actual cart total
    return 0
  })

  return {
    availableCoupons,
    appliedCoupon,
    couponError,
    discountAmount,
    applyCoupon,
    calculateDiscount,
    removeCoupon,
    clearCoupon,
    currentDiscount
  }
})
