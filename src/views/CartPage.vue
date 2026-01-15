<template>
  <main class="page-content">
    <!-- Breadcrumb -->
    <section class="breadcrumb-section">
      <div class="container">
        <nav class="breadcrumb fade-in-up">
          <router-link to="/">{{ t('Home', 'হোম') }}</router-link>
          <i class="fas fa-chevron-right"></i>
          <span>{{ t('Shopping Cart', 'শপিং কার্ট') }}</span>
        </nav>
      </div>
    </section>

    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title fade-in-up">{{ t('Shopping Cart', 'শপিং কার্ট') }}</h1>
        <p class="page-subtitle fade-in-up delay-1" v-if="cartStore.totalItems > 0">
          {{ t(`You have ${cartStore.totalItems} item(s) in your cart`, 
               `আপনার কার্টে ${cartStore.totalItems}টি পণ্য আছে`) }}
        </p>
      </div>
    </section>

    <!-- Empty Cart -->
    <section v-if="cartStore.items.length === 0" class="empty-cart-section">
      <div class="container">
        <div class="empty-cart fade-in-up">
          <div class="empty-cart-icon">
            <i class="fas fa-shopping-cart"></i>
          </div>
          <h2>{{ t('Your Cart is Empty', 'আপনার কার্ট খালি') }}</h2>
          <p>{{ t('Looks like you haven\'t added any jewelry to your cart yet.', 
                  'মনে হচ্ছে আপনি এখনও আপনার কার্টে কোনো গহনা যোগ করেননি।') }}</p>
          <router-link to="/#products" class="btn btn-primary">
            <i class="fas fa-gem"></i>
            {{ t('Start Shopping', 'কেনাকাটা শুরু করুন') }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- Cart Content -->
    <section v-else class="cart-section">
      <div class="container">
        <div class="cart-layout">
          <!-- Cart Items -->
          <div class="cart-items">
            <!-- Free Shipping Progress -->
            <div class="free-shipping-banner fade-in-up" v-if="!cartStore.freeShippingEligible">
              <div class="shipping-progress">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: progressWidth + '%' }"></div>
                </div>
                <p>
                  <i class="fas fa-truck"></i>
                  {{ t(`Add ৳${cartStore.amountForFreeShipping} more for FREE shipping!`, 
                       `ফ্রি শিপিংয়ের জন্য আরও ৳${cartStore.amountForFreeShipping} যোগ করুন!`) }}
                </p>
              </div>
            </div>

            <div class="free-shipping-banner success fade-in-up" v-else>
              <i class="fas fa-check-circle"></i>
              <p>{{ t('Congratulations! You qualify for FREE shipping!', 
                      'অভিনন্দন! আপনি ফ্রি শিপিংয়ের জন্য যোগ্য!') }}</p>
            </div>

            <!-- Cart Item List -->
            <div class="cart-items-list">
              <TransitionGroup name="cart-item">
                <div 
                  v-for="(item, index) in cartStore.items" 
                  :key="item.itemKey"
                  class="cart-item fade-in-up"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                >
                  <div class="item-image">
                    <img :src="item.image" :alt="item.name">
                    <span class="item-badge" v-if="item.material">{{ item.material }}</span>
                  </div>
                  
                  <div class="item-details">
                    <div class="item-header">
                      <h3>{{ t(item.name, item.nameBn || item.name) }}</h3>
                      <button class="remove-btn" @click="confirmRemove(item)">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                    
                    <div class="item-meta">
                      <span v-if="item.category" class="meta-item">
                        <i class="fas fa-tag"></i> {{ item.category }}
                      </span>
                      <span v-if="item.size" class="meta-item">
                        <i class="fas fa-ruler"></i> {{ t('Size', 'সাইজ') }}: {{ item.size }}
                      </span>
                      <span v-if="item.customization" class="meta-item">
                        <i class="fas fa-edit"></i> {{ item.customization }}
                      </span>
                    </div>

                    <div class="item-price-row">
                      <div class="quantity-selector">
                        <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">
                          <i class="fas fa-minus"></i>
                        </button>
                        <input 
                          type="number" 
                          :value="item.quantity" 
                          @change="updateQuantity(item, $event.target.value)"
                          min="1" 
                          max="10"
                        >
                        <button @click="increaseQuantity(item)" :disabled="item.quantity >= 10">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                      
                      <div class="item-price">
                        <span class="unit-price">৳{{ item.price.toLocaleString() }} × {{ item.quantity }}</span>
                        <span class="total-price">৳{{ (item.price * item.quantity).toLocaleString() }}</span>
                      </div>
                    </div>

                    <div class="item-actions">
                      <button class="action-btn" @click="saveForLater(item)">
                        <i class="fas fa-heart"></i>
                        {{ t('Save for Later', 'পরে সংরক্ষণ') }}
                      </button>
                    </div>
                  </div>
                </div>
              </TransitionGroup>
            </div>

            <!-- Saved for Later -->
            <div v-if="cartStore.savedItems.length > 0" class="saved-items-section">
              <h3 class="section-subtitle">
                <i class="fas fa-heart"></i>
                {{ t('Saved for Later', 'পরে সংরক্ষিত') }} ({{ cartStore.savedItems.length }})
              </h3>
              
              <div class="saved-items-list">
                <div v-for="item in cartStore.savedItems" :key="item.itemKey" class="saved-item">
                  <div class="saved-item-image">
                    <img :src="item.image" :alt="item.name">
                  </div>
                  <div class="saved-item-info">
                    <h4>{{ t(item.name, item.nameBn || item.name) }}</h4>
                    <span class="saved-item-price">৳{{ item.price.toLocaleString() }}</span>
                  </div>
                  <div class="saved-item-actions">
                    <button class="btn-sm btn-primary" @click="moveToCart(item)">
                      <i class="fas fa-cart-plus"></i>
                      {{ t('Add to Cart', 'কার্টে যোগ') }}
                    </button>
                    <button class="btn-sm btn-outline" @click="removeSaved(item)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Continue Shopping -->
            <div class="continue-shopping">
              <router-link to="/#products" class="btn btn-outline">
                <i class="fas fa-arrow-left"></i>
                {{ t('Continue Shopping', 'কেনাকাটা চালিয়ে যান') }}
              </router-link>
            </div>
          </div>

          <!-- Cart Summary Sidebar -->
          <div class="cart-summary-wrapper">
            <div class="cart-summary" :class="{ sticky: isSticky }">
              <h3>{{ t('Order Summary', 'অর্ডার সারাংশ') }}</h3>
              
              <!-- Subtotal -->
              <div class="summary-row">
                <span>{{ t('Subtotal', 'সাবটোটাল') }} ({{ cartStore.totalItems }} {{ t('items', 'পণ্য') }})</span>
                <span>৳{{ cartStore.subtotal.toLocaleString() }}</span>
              </div>

              <!-- Shipping -->
              <div class="summary-row">
                <span>{{ t('Shipping', 'শিপিং') }}</span>
                <span :class="{ free: cartStore.freeShippingEligible }">
                  {{ cartStore.freeShippingEligible ? t('FREE', 'ফ্রি') : '৳' + cartStore.shippingCost }}
                </span>
              </div>

              <!-- Tax -->
              <div class="summary-row" v-if="cartStore.taxAmount > 0">
                <span>{{ t('Tax (VAT)', 'কর (ভ্যাট)') }}</span>
                <span>৳{{ cartStore.taxAmount.toLocaleString() }}</span>
              </div>

              <!-- Coupon Section -->
              <div class="coupon-section">
                <div class="coupon-input-wrapper" v-if="!couponsStore.appliedCoupon">
                  <input 
                    type="text" 
                    v-model="couponCode"
                    :placeholder="t('Enter coupon code', 'কুপন কোড দিন')"
                    @keyup.enter="applyCoupon"
                  >
                  <button @click="applyCoupon" :disabled="!couponCode.trim()">
                    {{ t('Apply', 'প্রয়োগ') }}
                  </button>
                </div>
                
                <div class="coupon-applied" v-else>
                  <span class="coupon-tag">
                    <i class="fas fa-tag"></i>
                    {{ couponsStore.appliedCoupon.code }}
                  </span>
                  <span class="coupon-discount">-৳{{ discountAmount.toLocaleString() }}</span>
                  <button class="remove-coupon" @click="removeCoupon">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                
                <p class="coupon-error" v-if="couponsStore.couponError">
                  {{ t(couponsStore.couponError.en, couponsStore.couponError.bn) }}
                </p>
              </div>

              <!-- Savings -->
              <div class="summary-row savings" v-if="totalSavings > 0">
                <span><i class="fas fa-piggy-bank"></i> {{ t('You Save', 'আপনার সঞ্চয়') }}</span>
                <span>৳{{ totalSavings.toLocaleString() }}</span>
              </div>

              <div class="summary-divider"></div>

              <!-- Total -->
              <div class="summary-row total">
                <span>{{ t('Total', 'মোট') }}</span>
                <span>৳{{ finalTotal.toLocaleString() }}</span>
              </div>

              <!-- Estimated Delivery -->
              <div class="delivery-estimate">
                <i class="fas fa-truck"></i>
                <span>
                  {{ t('Estimated Delivery:', 'আনুমানিক ডেলিভারি:') }}
                  <strong>{{ formatDate(cartStore.getEstimatedDelivery()) }}</strong>
                </span>
              </div>

              <!-- Checkout Button -->
              <router-link to="/checkout" class="btn btn-primary checkout-btn">
                <i class="fas fa-lock"></i>
                {{ t('Proceed to Checkout', 'চেকআউট করুন') }}
              </router-link>

              <!-- Security Badges -->
              <div class="security-badges">
                <div class="badge">
                  <i class="fas fa-shield-alt"></i>
                  <span>{{ t('Secure Checkout', 'নিরাপদ চেকআউট') }}</span>
                </div>
                <div class="badge">
                  <i class="fas fa-undo"></i>
                  <span>{{ t('Easy Returns', 'সহজ রিটার্ন') }}</span>
                </div>
              </div>

              <!-- Payment Methods -->
              <div class="payment-methods">
                <span>{{ t('We Accept', 'আমরা গ্রহণ করি') }}</span>
                <div class="payment-icons">
                  <img src="https://www.bkash.com/sites/all/themes/flavor/logo.png" alt="bKash" title="bKash">
                  <img src="https://nagad.com.bd/wp-content/uploads/2019/12/nagad-logo.png" alt="Nagad" title="Nagad">
                  <i class="fas fa-credit-card" title="Card"></i>
                  <i class="fas fa-money-bill-wave" title="COD"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recommended Products -->
    <section class="recommended-section" v-if="cartStore.items.length > 0">
      <div class="container">
        <h2 class="section-title fade-in-up">{{ t('You May Also Like', 'আপনি এটিও পছন্দ করতে পারেন') }}</h2>
        <div class="recommended-products">
          <div 
            v-for="product in recommendedProducts" 
            :key="product.id" 
            class="recommended-product fade-in-up"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name">
            </div>
            <div class="product-info">
              <h4>{{ t(product.name, product.nameBn || product.name) }}</h4>
              <span class="product-price">৳{{ product.price.toLocaleString() }}</span>
              <button class="btn-sm btn-primary" @click="quickAdd(product)">
                <i class="fas fa-plus"></i>
                {{ t('Add', 'যোগ') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Remove Confirmation Modal -->
    <Teleport to="body">
      <div class="modal-overlay" v-if="showRemoveModal" @click="showRemoveModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>{{ t('Remove Item?', 'আইটেম সরাবেন?') }}</h3>
            <button class="close-btn" @click="showRemoveModal = false">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <p>{{ t('Are you sure you want to remove this item from your cart?', 
                    'আপনি কি নিশ্চিত যে এই আইটেমটি আপনার কার্ট থেকে সরাতে চান?') }}</p>
            <div class="remove-item-preview" v-if="itemToRemove">
              <img :src="itemToRemove.image" :alt="itemToRemove.name">
              <span>{{ itemToRemove.name }}</span>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" @click="showRemoveModal = false">
              {{ t('Cancel', 'বাতিল') }}
            </button>
            <button class="btn btn-danger" @click="confirmRemoveItem">
              <i class="fas fa-trash"></i>
              {{ t('Remove', 'সরান') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLanguageStore } from '../stores/language'
import { useCartStore } from '../stores/cart'
import { useCouponsStore } from '../stores/coupons'
import { useProductsStore } from '../stores/products'
import { useNotificationStore } from '../stores/notification'

const languageStore = useLanguageStore()
const cartStore = useCartStore()
const couponsStore = useCouponsStore()
const productsStore = useProductsStore()
const notificationStore = useNotificationStore()
const { t } = languageStore

// Coupon
const couponCode = ref('')

// Modal state
const showRemoveModal = ref(false)
const itemToRemove = ref(null)

// Sticky sidebar
const isSticky = ref(false)

// Progress bar width for free shipping
const progressWidth = computed(() => {
  const progress = (cartStore.subtotal / cartStore.freeShippingThreshold) * 100
  return Math.min(progress, 100)
})

// Discount amount
const discountAmount = computed(() => {
  if (!couponsStore.appliedCoupon) return 0
  return couponsStore.calculateDiscount(couponsStore.appliedCoupon, cartStore.subtotal)
})

// Total savings
const totalSavings = computed(() => {
  let savings = discountAmount.value
  if (cartStore.freeShippingEligible) {
    savings += 80 // Standard shipping cost
  }
  return savings
})

// Final total
const finalTotal = computed(() => {
  return cartStore.grandTotal - discountAmount.value
})

// Recommended products (products not in cart)
const recommendedProducts = computed(() => {
  const cartIds = cartStore.items.map(item => item.id)
  return productsStore.products
    .filter(p => !cartIds.includes(p.id))
    .slice(0, 4)
})

// Functions
function increaseQuantity(item) {
  cartStore.updateQuantity(item.itemKey, item.quantity + 1)
}

function decreaseQuantity(item) {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.itemKey, item.quantity - 1)
  }
}

function updateQuantity(item, value) {
  const qty = parseInt(value) || 1
  cartStore.updateQuantity(item.itemKey, Math.min(Math.max(qty, 1), 10))
}

function confirmRemove(item) {
  itemToRemove.value = item
  showRemoveModal.value = true
}

function confirmRemoveItem() {
  if (itemToRemove.value) {
    cartStore.removeItem(itemToRemove.value.itemKey)
    notificationStore.show(t('Item removed from cart', 'কার্ট থেকে আইটেম সরানো হয়েছে'))
  }
  showRemoveModal.value = false
  itemToRemove.value = null
}

function saveForLater(item) {
  cartStore.saveForLater(item.itemKey)
  notificationStore.show(t('Item saved for later', 'আইটেম পরে সংরক্ষিত হয়েছে'))
}

function moveToCart(item) {
  cartStore.moveToCart(item.itemKey)
  notificationStore.show(t('Item moved to cart', 'আইটেম কার্টে সরানো হয়েছে'))
}

function removeSaved(item) {
  cartStore.removeSavedItem(item.itemKey)
}

function applyCoupon() {
  if (!couponCode.value.trim()) return
  
  const result = couponsStore.applyCoupon(
    couponCode.value, 
    cartStore.subtotal, 
    cartStore.items
  )
  
  if (result) {
    notificationStore.show(t('Coupon applied successfully!', 'কুপন সফলভাবে প্রয়োগ হয়েছে!'))
    couponCode.value = ''
  }
}

function removeCoupon() {
  couponsStore.removeCoupon()
  notificationStore.show(t('Coupon removed', 'কুপন সরানো হয়েছে'))
}

function quickAdd(product) {
  cartStore.addItem(product)
  notificationStore.show(t('Added to cart!', 'কার্টে যোগ হয়েছে!'))
}

function formatDate(date) {
  const options = { weekday: 'short', month: 'short', day: 'numeric' }
  return date.toLocaleDateString(languageStore.currentLanguage === 'bn' ? 'bn-BD' : 'en-US', options)
}

// Handle scroll for sticky sidebar
function handleScroll() {
  isSticky.value = window.scrollY > 200
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.page-content {
  padding-top: 100px;
  min-height: 100vh;
  background: #f8f9fa;
}

/* Breadcrumb */
.breadcrumb-section {
  padding: 20px 0;
  background: var(--primary-light);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.breadcrumb a {
  color: var(--primary-gold);
  text-decoration: none;
}

.breadcrumb i {
  font-size: 10px;
  color: var(--text-light);
}

/* Page Header */
.page-header {
  text-align: center;
  padding: 40px 0 20px;
}

.page-title {
  font-family: var(--font-primary);
  font-size: 42px;
  color: var(--text-dark);
  margin-bottom: 10px;
}

.page-subtitle {
  color: var(--text-light);
}

/* Empty Cart */
.empty-cart-section {
  padding: 80px 0;
}

.empty-cart {
  text-align: center;
  padding: 60px;
  background: var(--white);
  border-radius: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.empty-cart-icon {
  width: 120px;
  height: 120px;
  background: var(--primary-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
}

.empty-cart-icon i {
  font-size: 50px;
  color: var(--primary-gold);
}

.empty-cart h2 {
  font-family: var(--font-primary);
  font-size: 28px;
  margin-bottom: 15px;
}

.empty-cart p {
  color: var(--text-light);
  margin-bottom: 30px;
}

/* Cart Section */
.cart-section {
  padding: 40px 0 80px;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
  align-items: start;
}

/* Free Shipping Banner */
.free-shipping-banner {
  background: var(--white);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: var(--shadow-sm);
}

.shipping-progress {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.progress-bar {
  height: 8px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-gold), var(--accent));
  border-radius: 10px;
  transition: width 0.5s ease;
}

.shipping-progress p {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-light);
}

.shipping-progress p i {
  color: var(--primary-gold);
}

.free-shipping-banner.success {
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  display: flex;
  align-items: center;
  gap: 15px;
}

.free-shipping-banner.success i {
  font-size: 24px;
  color: #28a745;
}

.free-shipping-banner.success p {
  color: #155724;
  font-weight: 600;
}

/* Cart Items */
.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  gap: 20px;
  background: var(--white);
  border-radius: 15px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-smooth);
}

.cart-item:hover {
  box-shadow: var(--shadow-md);
}

.item-image {
  width: 140px;
  height: 140px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--primary-gold);
  color: var(--white);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.item-header h3 {
  font-size: 18px;
  font-weight: 600;
}

.remove-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #f8f9fa;
  color: var(--text-light);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.remove-btn:hover {
  background: #fee2e2;
  color: #dc3545;
}

.item-meta {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.meta-item {
  font-size: 13px;
  color: var(--text-light);
  display: flex;
  align-items: center;
  gap: 5px;
}

.meta-item i {
  color: var(--primary-gold);
}

.item-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

/* Quantity Selector */
.quantity-selector {
  display: flex;
  align-items: center;
  border: 2px solid #eee;
  border-radius: 10px;
  overflow: hidden;
}

.quantity-selector button {
  width: 40px;
  height: 40px;
  border: none;
  background: #f8f9fa;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.quantity-selector button:hover:not(:disabled) {
  background: var(--primary-gold);
  color: var(--white);
}

.quantity-selector button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-selector input {
  width: 50px;
  height: 40px;
  border: none;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
}

.quantity-selector input::-webkit-outer-spin-button,
.quantity-selector input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.item-price {
  text-align: right;
}

.unit-price {
  display: block;
  font-size: 13px;
  color: var(--text-light);
}

.total-price {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-gold);
}

.item-actions {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.action-btn {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: var(--transition-smooth);
}

.action-btn:hover {
  color: var(--primary-gold);
}

.action-btn i {
  font-size: 14px;
}

/* Saved Items */
.saved-items-section {
  margin-top: 40px;
  padding-top: 40px;
  border-top: 2px dashed #eee;
}

.section-subtitle {
  font-size: 18px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-subtitle i {
  color: var(--primary-gold);
}

.saved-items-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.saved-item {
  display: flex;
  align-items: center;
  gap: 15px;
  background: var(--white);
  padding: 15px;
  border-radius: 12px;
}

.saved-item-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
}

.saved-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.saved-item-info {
  flex: 1;
}

.saved-item-info h4 {
  font-size: 14px;
  margin-bottom: 5px;
}

.saved-item-price {
  color: var(--primary-gold);
  font-weight: 600;
}

.saved-item-actions {
  display: flex;
  gap: 10px;
}

/* Continue Shopping */
.continue-shopping {
  margin-top: 30px;
}

/* Cart Summary */
.cart-summary-wrapper {
  position: relative;
}

.cart-summary {
  background: var(--white);
  border-radius: 20px;
  padding: 30px;
  box-shadow: var(--shadow-md);
  transition: var(--transition-smooth);
}

.cart-summary.sticky {
  position: sticky;
  top: 120px;
}

.cart-summary h3 {
  font-family: var(--font-primary);
  font-size: 24px;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #eee;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  font-size: 15px;
}

.summary-row span:last-child {
  font-weight: 600;
}

.summary-row span.free {
  color: #28a745;
}

.summary-row.savings {
  color: #28a745;
  background: #d4edda;
  margin: 0 -30px;
  padding: 12px 30px;
}

.summary-row.total {
  font-size: 20px;
}

.summary-row.total span:last-child {
  color: var(--primary-gold);
  font-size: 24px;
}

.summary-divider {
  height: 2px;
  background: #eee;
  margin: 15px 0;
}

/* Coupon Section */
.coupon-section {
  margin: 20px 0;
  padding: 15px 0;
  border-top: 1px dashed #eee;
  border-bottom: 1px dashed #eee;
}

.coupon-input-wrapper {
  display: flex;
  gap: 10px;
}

.coupon-input-wrapper input {
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 14px;
  transition: var(--transition-smooth);
}

.coupon-input-wrapper input:focus {
  outline: none;
  border-color: var(--primary-gold);
}

.coupon-input-wrapper button {
  padding: 12px 20px;
  background: var(--primary-gold);
  color: var(--white);
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.coupon-input-wrapper button:hover:not(:disabled) {
  background: var(--accent);
}

.coupon-input-wrapper button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.coupon-applied {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #d4edda;
  padding: 12px 15px;
  border-radius: 10px;
}

.coupon-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #155724;
  font-weight: 600;
}

.coupon-discount {
  margin-left: auto;
  color: #155724;
  font-weight: 700;
}

.remove-coupon {
  background: none;
  border: none;
  color: #155724;
  cursor: pointer;
  padding: 5px;
}

.coupon-error {
  color: #dc3545;
  font-size: 13px;
  margin-top: 10px;
}

/* Delivery Estimate */
.delivery-estimate {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background: var(--primary-light);
  border-radius: 10px;
  margin: 20px 0;
  font-size: 14px;
}

.delivery-estimate i {
  color: var(--primary-gold);
}

/* Checkout Button */
.checkout-btn {
  width: 100%;
  padding: 18px;
  font-size: 18px;
  margin-bottom: 20px;
}

/* Security Badges */
.security-badges {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.security-badges .badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-light);
}

.security-badges .badge i {
  color: #28a745;
}

/* Payment Methods */
.payment-methods {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.payment-methods span {
  display: block;
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 10px;
}

.payment-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.payment-icons img {
  height: 25px;
  opacity: 0.7;
}

.payment-icons i {
  font-size: 24px;
  color: var(--text-light);
}

/* Recommended Section */
.recommended-section {
  padding: 60px 0;
  background: var(--white);
}

.section-title {
  font-family: var(--font-primary);
  font-size: 32px;
  text-align: center;
  margin-bottom: 40px;
}

.recommended-products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

.recommended-product {
  background: #f8f9fa;
  border-radius: 15px;
  overflow: hidden;
  transition: var(--transition-smooth);
}

.recommended-product:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.recommended-product .product-image {
  height: 180px;
  overflow: hidden;
}

.recommended-product .product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recommended-product .product-info {
  padding: 15px;
  text-align: center;
}

.recommended-product h4 {
  font-size: 14px;
  margin-bottom: 8px;
}

.recommended-product .product-price {
  display: block;
  color: var(--primary-gold);
  font-weight: 700;
  margin-bottom: 12px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  background: var(--white);
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--text-light);
}

.modal-body {
  padding: 20px;
}

.modal-body p {
  color: var(--text-light);
  margin-bottom: 20px;
}

.remove-item-preview {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

.remove-item-preview img {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
}

.modal-footer {
  display: flex;
  gap: 15px;
  padding: 20px;
  border-top: 1px solid #eee;
}

.modal-footer .btn {
  flex: 1;
}

/* Buttons */
.btn {
  padding: 14px 28px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: var(--transition-smooth);
  text-decoration: none;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: var(--primary-gold);
  color: var(--white);
}

.btn-primary:hover {
  background: var(--accent);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--primary-gold);
  color: var(--primary-gold);
}

.btn-outline:hover {
  background: var(--primary-gold);
  color: var(--white);
}

.btn-danger {
  background: #dc3545;
  color: var(--white);
}

.btn-danger:hover {
  background: #c82333;
}

.btn-sm {
  padding: 10px 18px;
  font-size: 13px;
}

/* Animations */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
}

.delay-1 { animation-delay: 0.2s; }

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.3s ease;
}

.cart-item-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.cart-item-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Responsive */
@media (max-width: 1024px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
  
  .cart-summary-wrapper {
    order: -1;
  }
  
  .cart-summary.sticky {
    position: static;
  }
  
  .recommended-products {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }
  
  .cart-item {
    flex-direction: column;
  }
  
  .item-image {
    width: 100%;
    height: 200px;
  }
  
  .item-price-row {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .quantity-selector {
    justify-content: center;
  }
  
  .item-price {
    text-align: center;
  }
  
  .recommended-products {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}
</style>
