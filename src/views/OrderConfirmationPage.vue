<template>
  <div class="confirmation-page">
    <!-- Confetti Canvas -->
    <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>

    <div class="container">
      <div class="confirmation-content">
        <!-- Success Animation -->
        <div class="success-icon">
          <div class="checkmark-circle">
            <i class="fas fa-check"></i>
          </div>
          <div class="success-rings">
            <div class="ring ring-1"></div>
            <div class="ring ring-2"></div>
            <div class="ring ring-3"></div>
          </div>
        </div>

        <h1 class="success-title">{{ t('orderSuccess') }}</h1>
        <p class="success-message">{{ t('thankYou') }}</p>

        <!-- Order Details Card -->
        <div class="order-card">
          <div class="order-header">
            <div class="order-id">
              <span class="label">{{ t('orderId') }}</span>
              <span class="value">{{ order?.id || orderId }}</span>
            </div>
            <div class="order-date">
              <span class="label">{{ t('orderDate') }}</span>
              <span class="value">{{ formatDate(order?.createdAt) }}</span>
            </div>
          </div>

          <div class="order-status-bar">
            <div class="status-step active">
              <div class="status-dot"></div>
              <span>{{ t('orderPlaced') }}</span>
            </div>
            <div class="status-line"></div>
            <div class="status-step">
              <div class="status-dot"></div>
              <span>{{ t('processing') }}</span>
            </div>
            <div class="status-line"></div>
            <div class="status-step">
              <div class="status-dot"></div>
              <span>{{ t('shipped') }}</span>
            </div>
            <div class="status-line"></div>
            <div class="status-step">
              <div class="status-dot"></div>
              <span>{{ t('delivered') }}</span>
            </div>
          </div>

          <!-- Order Items -->
          <div class="order-items">
            <h3>{{ t('orderItems') }}</h3>
            <div v-for="item in order?.items || []" :key="item.itemKey" class="order-item">
              <div class="item-image">
                <img v-if="item.image" :src="item.image" :alt="item.name?.[lang] || item.name">
                <i v-else class="fas fa-gem"></i>
              </div>
              <div class="item-details">
                <h4>{{ item.name?.[lang] || item.name }}</h4>
                <p>{{ item.category }} - {{ item.type }}</p>
              </div>
              <div class="item-qty">× {{ item.quantity }}</div>
              <div class="item-price">৳{{ (item.price * item.quantity).toLocaleString() }}</div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="order-summary">
            <div class="summary-row">
              <span>{{ t('subtotal') }}</span>
              <span>৳{{ (order?.subtotal || 0).toLocaleString() }}</span>
            </div>
            <div v-if="order?.discount" class="summary-row discount">
              <span>{{ t('discount') }}</span>
              <span>-৳{{ order.discount.toLocaleString() }}</span>
            </div>
            <div class="summary-row">
              <span>{{ t('shipping') }}</span>
              <span :class="{ free: order?.shippingCost === 0 }">
                {{ order?.shippingCost === 0 ? t('free') : '৳' + (order?.shippingCost || 0) }}
              </span>
            </div>
            <div class="summary-row">
              <span>{{ t('tax') }}</span>
              <span>৳{{ (order?.tax || 0).toLocaleString() }}</span>
            </div>
            <div class="summary-row total">
              <span>{{ t('total') }}</span>
              <span>৳{{ (order?.total || 0).toLocaleString() }}</span>
            </div>
          </div>

          <!-- Shipping & Payment Info -->
          <div class="info-grid">
            <div class="info-card">
              <h4><i class="fas fa-truck"></i> {{ t('shippingAddress') }}</h4>
              <p><strong>{{ order?.shipping?.fullName }}</strong></p>
              <p>{{ order?.shipping?.address1 }}</p>
              <p v-if="order?.shipping?.address2">{{ order?.shipping?.address2 }}</p>
              <p>{{ order?.shipping?.city }}, {{ order?.shipping?.postalCode }}</p>
              <p>+880 {{ order?.shipping?.phone }}</p>
            </div>
            <div class="info-card">
              <h4><i class="fas fa-credit-card"></i> {{ t('paymentMethod') }}</h4>
              <p><strong>{{ getPaymentMethodName(order?.paymentMethod) }}</strong></p>
              <p v-if="order?.paymentDetails?.mobileNumber">+880 {{ order.paymentDetails.mobileNumber }}</p>
              <p v-if="order?.paymentDetails?.cardLast4">**** {{ order.paymentDetails.cardLast4 }}</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="confirmation-actions">
          <button class="btn btn-secondary" @click="downloadInvoice">
            <i class="fas fa-download"></i> {{ t('downloadInvoice') }}
          </button>
          <router-link to="/my-orders" class="btn btn-outline">
            <i class="fas fa-list"></i> {{ t('viewOrders') }}
          </router-link>
          <router-link to="/" class="btn btn-primary">
            <i class="fas fa-shopping-bag"></i> {{ t('continueShopping') }}
          </router-link>
        </div>

        <!-- Delivery Info -->
        <div class="delivery-info">
          <i class="fas fa-info-circle"></i>
          <p>{{ t('deliveryNote') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrdersStore } from '../stores/orders'
import { useLanguageStore } from '../stores/language'

const route = useRoute()
const ordersStore = useOrdersStore()
const languageStore = useLanguageStore()

const lang = computed(() => languageStore.currentLanguage)
const orderId = computed(() => route.params.orderId)
const order = computed(() => ordersStore.getOrderById(orderId.value))

const confettiCanvas = ref(null)
let confettiAnimationId = null

const translations = {
  en: {
    orderSuccess: 'Order Placed Successfully!',
    thankYou: 'Thank you for your order. We have received your order and will begin processing it soon.',
    orderId: 'Order ID',
    orderDate: 'Order Date',
    orderPlaced: 'Placed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    orderItems: 'Order Items',
    subtotal: 'Subtotal',
    discount: 'Discount',
    shipping: 'Shipping',
    tax: 'Tax (VAT 5%)',
    total: 'Total',
    free: 'FREE',
    shippingAddress: 'Shipping Address',
    paymentMethod: 'Payment Method',
    downloadInvoice: 'Download Invoice',
    viewOrders: 'View All Orders',
    continueShopping: 'Continue Shopping',
    deliveryNote: 'Estimated delivery: 3-5 business days within Dhaka, 5-7 days outside Dhaka.'
  },
  bn: {
    orderSuccess: 'অর্ডার সফলভাবে সম্পন্ন!',
    thankYou: 'আপনার অর্ডারের জন্য ধন্যবাদ। আমরা আপনার অর্ডার পেয়েছি এবং শীঘ্রই প্রক্রিয়া শুরু করব।',
    orderId: 'অর্ডার আইডি',
    orderDate: 'অর্ডারের তারিখ',
    orderPlaced: 'প্লেসড',
    processing: 'প্রসেসিং',
    shipped: 'শিপড',
    delivered: 'ডেলিভারড',
    orderItems: 'অর্ডার আইটেম',
    subtotal: 'সাবটোটাল',
    discount: 'ছাড়',
    shipping: 'শিপিং',
    tax: 'ট্যাক্স (ভ্যাট ৫%)',
    total: 'মোট',
    free: 'ফ্রি',
    shippingAddress: 'শিপিং ঠিকানা',
    paymentMethod: 'পেমেন্ট পদ্ধতি',
    downloadInvoice: 'ইনভয়েস ডাউনলোড',
    viewOrders: 'সব অর্ডার দেখুন',
    continueShopping: 'শপিং চালিয়ে যান',
    deliveryNote: 'প্রত্যাশিত ডেলিভারি: ঢাকার মধ্যে ৩-৫ কার্যদিবস, ঢাকার বাইরে ৫-৭ দিন।'
  }
}

function t(key) {
  return translations[lang.value]?.[key] || translations.en[key] || key
}

function formatDate(date) {
  if (!date) return new Date().toLocaleDateString(lang.value === 'bn' ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  return new Date(date).toLocaleDateString(lang.value === 'bn' ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getPaymentMethodName(method) {
  const names = {
    bkash: 'bKash',
    nagad: 'Nagad',
    rocket: 'Rocket',
    bank: lang.value === 'bn' ? 'ব্যাংক ট্রান্সফার' : 'Bank Transfer',
    cod: lang.value === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery',
    card: lang.value === 'bn' ? 'ক্রেডিট/ডেবিট কার্ড' : 'Credit/Debit Card'
  }
  return names[method] || method
}

function downloadInvoice() {
  // Generate simple invoice
  const invoiceContent = `
SONARTORI - INVOICE
=====================
Order ID: ${order.value?.id || orderId.value}
Date: ${formatDate(order.value?.createdAt)}

ITEMS:
${order.value?.items?.map(item => 
  `- ${item.name?.[lang.value] || item.name} x${item.quantity} = ৳${(item.price * item.quantity).toLocaleString()}`
).join('\n') || 'No items'}

SUMMARY:
Subtotal: ৳${(order.value?.subtotal || 0).toLocaleString()}
${order.value?.discount ? `Discount: -৳${order.value.discount.toLocaleString()}` : ''}
Shipping: ${order.value?.shippingCost === 0 ? 'FREE' : '৳' + (order.value?.shippingCost || 0)}
Tax: ৳${(order.value?.tax || 0).toLocaleString()}
TOTAL: ৳${(order.value?.total || 0).toLocaleString()}

SHIPPING TO:
${order.value?.shipping?.fullName || 'N/A'}
${order.value?.shipping?.address1 || ''}
${order.value?.shipping?.city || ''}, ${order.value?.shipping?.postalCode || ''}
Phone: +880 ${order.value?.shipping?.phone || ''}

Thank you for shopping with SonarTori!
  `.trim()

  const blob = new Blob([invoiceContent], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `SonarTori-Invoice-${order.value?.id || orderId.value}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

// Confetti Animation
function createConfetti() {
  const canvas = confettiCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const confettiPieces = []
  const colors = ['#D4AF37', '#FFD700', '#F5DEB3', '#FF69B4', '#87CEEB', '#98FB98']

  for (let i = 0; i < 150; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 360,
      spin: Math.random() * 10 - 5
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let activeCount = 0
    confettiPieces.forEach(piece => {
      if (piece.y < canvas.height) {
        activeCount++
        piece.y += piece.speed
        piece.angle += piece.spin

        ctx.save()
        ctx.translate(piece.x, piece.y)
        ctx.rotate((piece.angle * Math.PI) / 180)
        ctx.fillStyle = piece.color
        ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h)
        ctx.restore()
      }
    })

    if (activeCount > 0) {
      confettiAnimationId = requestAnimationFrame(animate)
    }
  }

  animate()
}

onMounted(() => {
  createConfetti()
})

onUnmounted(() => {
  if (confettiAnimationId) {
    cancelAnimationFrame(confettiAnimationId)
  }
})
</script>

<style scoped>
.confirmation-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f4e9 0%, #fff 100%);
  padding: 120px 0 60px;
  position: relative;
  overflow: hidden;
}

.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
}

.confirmation-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

/* Success Animation */
.success-icon {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 30px;
}

.checkmark-circle {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scaleIn 0.5s ease forwards;
  box-shadow: 0 10px 40px rgba(39, 174, 96, 0.3);
}

.checkmark-circle i {
  font-size: 50px;
  color: white;
  animation: checkmarkIn 0.3s ease 0.3s forwards;
  opacity: 0;
  transform: scale(0);
}

.success-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ring {
  position: absolute;
  border: 2px solid #27ae60;
  border-radius: 50%;
  opacity: 0;
}

.ring-1 {
  width: 140px;
  height: 140px;
  margin: -70px 0 0 -70px;
  animation: ringPulse 1s ease 0.5s;
}

.ring-2 {
  width: 170px;
  height: 170px;
  margin: -85px 0 0 -85px;
  animation: ringPulse 1s ease 0.7s;
}

.ring-3 {
  width: 200px;
  height: 200px;
  margin: -100px 0 0 -100px;
  animation: ringPulse 1s ease 0.9s;
}

@keyframes scaleIn {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

@keyframes checkmarkIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes ringPulse {
  0% {
    opacity: 1;
    transform: scale(0.8);
  }
  100% {
    opacity: 0;
    transform: scale(1.2);
  }
}

.success-title {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  color: #27ae60;
  margin-bottom: 15px;
  animation: fadeInUp 0.5s ease 0.5s forwards;
  opacity: 0;
}

.success-message {
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
  animation: fadeInUp 0.5s ease 0.6s forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Order Card */
.order-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  text-align: left;
  animation: fadeInUp 0.5s ease 0.7s forwards;
  opacity: 0;
}

.order-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  margin-bottom: 25px;
}

.order-header .label {
  display: block;
  font-size: 13px;
  color: #888;
  margin-bottom: 5px;
}

.order-header .value {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.order-id .value {
  color: #D4AF37;
}

/* Status Bar */
.order-status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
}

.status-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ddd;
  position: relative;
}

.status-step.active .status-dot {
  background: #27ae60;
}

.status-step.active .status-dot::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 11px;
}

.status-step span {
  font-size: 12px;
  color: #888;
}

.status-step.active span {
  color: #27ae60;
  font-weight: 600;
}

.status-line {
  flex: 1;
  height: 3px;
  background: #ddd;
  margin: 0 -10px;
  margin-top: -20px;
}

/* Order Items */
.order-items {
  margin-bottom: 25px;
}

.order-items h3 {
  font-size: 16px;
  margin-bottom: 15px;
  color: #333;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 60px;
  height: 60px;
  background: #f5f5f5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-image i {
  font-size: 24px;
  color: #D4AF37;
}

.item-details {
  flex: 1;
}

.item-details h4 {
  font-size: 15px;
  margin-bottom: 3px;
}

.item-details p {
  font-size: 13px;
  color: #888;
}

.item-qty {
  color: #666;
}

.item-price {
  font-weight: 600;
  color: #D4AF37;
}

/* Order Summary */
.order-summary {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 25px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.summary-row.discount span:last-child {
  color: #27ae60;
}

.summary-row .free {
  color: #27ae60;
  font-weight: 600;
}

.summary-row.total {
  border-top: 1px solid #ddd;
  margin-top: 10px;
  padding-top: 15px;
  font-size: 18px;
  font-weight: 700;
}

.summary-row.total span:last-child {
  color: #D4AF37;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.info-card {
  padding: 20px;
  background: #fafafa;
  border-radius: 12px;
}

.info-card h4 {
  font-size: 14px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-card h4 i {
  color: #D4AF37;
}

.info-card p {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

/* Actions */
.confirmation-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 40px;
  flex-wrap: wrap;
  animation: fadeInUp 0.5s ease 0.8s forwards;
  opacity: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background: #D4AF37;
  color: white;
}

.btn-primary:hover {
  background: #8B7355;
}

.btn-secondary {
  background: #333;
  color: white;
}

.btn-secondary:hover {
  background: #555;
}

.btn-outline {
  background: transparent;
  border: 2px solid #D4AF37;
  color: #D4AF37;
}

.btn-outline:hover {
  background: #D4AF37;
  color: white;
}

/* Delivery Info */
.delivery-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
  padding: 15px 25px;
  background: #e8f4fd;
  border-radius: 10px;
  animation: fadeInUp 0.5s ease 0.9s forwards;
  opacity: 0;
}

.delivery-info i {
  color: #3498db;
}

.delivery-info p {
  color: #2980b9;
  font-size: 14px;
}

/* Responsive */
@media (max-width: 768px) {
  .order-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .order-status-bar {
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .status-line {
    display: none;
  }
  
  .confirmation-actions {
    flex-direction: column;
  }
  
  .btn {
    justify-content: center;
  }
}
</style>
