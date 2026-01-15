<template>
  <div class="checkout-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb-section">
      <div class="container">
        <nav class="breadcrumb">
          <router-link to="/">{{ t('home') }}</router-link>
          <i class="fas fa-chevron-right"></i>
          <router-link to="/cart">{{ t('cart') }}</router-link>
          <i class="fas fa-chevron-right"></i>
          <span>{{ t('checkout') }}</span>
        </nav>
      </div>
    </div>

    <div class="container">
      <h1 class="page-title">{{ t('checkout') }}</h1>

      <!-- Progress Steps -->
      <div class="checkout-progress">
        <div class="progress-line">
          <div class="progress-line-fill" :style="{ width: progressWidth }"></div>
        </div>
        <div 
          v-for="(step, index) in steps" 
          :key="step.id"
          class="progress-step"
          :class="{ active: currentStep === index + 1, completed: currentStep > index + 1 }"
          @click="goToStep(index + 1)"
        >
          <div class="step-number">
            <i v-if="currentStep > index + 1" class="fas fa-check"></i>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <span class="step-label">{{ t(step.label) }}</span>
        </div>
      </div>

      <div class="checkout-layout">
        <!-- Checkout Steps Content -->
        <div class="checkout-content">
          <!-- Step 1: Shipping -->
          <div v-show="currentStep === 1" class="checkout-step">
            <h2><i class="fas fa-truck"></i> {{ t('shippingInfo') }}</h2>
            
            <form @submit.prevent="nextStep" class="shipping-form">
              <div class="form-row">
                <div class="form-group">
                  <label>{{ t('fullName') }} *</label>
                  <input 
                    type="text" 
                    v-model="shippingData.fullName" 
                    required
                    :placeholder="t('enterFullName')"
                  >
                  <span v-if="errors.fullName" class="field-error">{{ errors.fullName }}</span>
                </div>
              </div>

              <div class="form-row two-cols">
                <div class="form-group">
                  <label>{{ t('email') }} *</label>
                  <input 
                    type="email" 
                    v-model="shippingData.email" 
                    required
                    :placeholder="t('enterEmail')"
                  >
                  <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
                </div>
                <div class="form-group">
                  <label>{{ t('phone') }} *</label>
                  <div class="phone-input">
                    <span class="phone-prefix">+880</span>
                    <input 
                      type="tel" 
                      v-model="shippingData.phone" 
                      required
                      maxlength="10"
                      :placeholder="t('enterPhone')"
                    >
                  </div>
                  <span v-if="errors.phone" class="field-error">{{ errors.phone }}</span>
                </div>
              </div>

              <div class="form-group">
                <label>{{ t('address') }} *</label>
                <input 
                  type="text" 
                  v-model="shippingData.address1" 
                  required
                  :placeholder="t('enterAddress')"
                >
              </div>

              <div class="form-group">
                <label>{{ t('address2') }}</label>
                <input 
                  type="text" 
                  v-model="shippingData.address2" 
                  :placeholder="t('enterAddress2')"
                >
              </div>

              <div class="form-row two-cols">
                <div class="form-group">
                  <label>{{ t('city') }} *</label>
                  <select v-model="shippingData.city" required>
                    <option value="">{{ t('selectCity') }}</option>
                    <option v-for="city in cities" :key="city.value" :value="city.value">
                      {{ lang === 'bn' ? city.bn : city.en }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label>{{ t('postalCode') }} *</label>
                  <input 
                    type="text" 
                    v-model="shippingData.postalCode" 
                    required
                    maxlength="4"
                    :placeholder="t('enterPostalCode')"
                  >
                </div>
              </div>

              <div class="form-group">
                <label>{{ t('orderNotes') }}</label>
                <textarea 
                  v-model="shippingData.notes" 
                  rows="3"
                  :placeholder="t('enterNotes')"
                ></textarea>
              </div>

              <div class="step-actions">
                <router-link to="/cart" class="btn btn-secondary">
                  <i class="fas fa-arrow-left"></i> {{ t('backToCart') }}
                </router-link>
                <button type="submit" class="btn btn-primary">
                  {{ t('continueToPayment') }} <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </form>
          </div>

          <!-- Step 2: Payment -->
          <div v-show="currentStep === 2" class="checkout-step">
            <h2><i class="fas fa-credit-card"></i> {{ t('paymentMethod') }}</h2>

            <div class="payment-options">
              <!-- bKash -->
              <label class="payment-option" :class="{ selected: paymentMethod === 'bkash' }">
                <input type="radio" v-model="paymentMethod" value="bkash">
                <div class="payment-option-content">
                  <div class="payment-icon bkash">
                    <i class="fas fa-mobile-alt"></i>
                  </div>
                  <div class="payment-info">
                    <h4>bKash</h4>
                    <p>{{ t('payWithBkash') }}</p>
                  </div>
                </div>
              </label>

              <!-- Nagad -->
              <label class="payment-option" :class="{ selected: paymentMethod === 'nagad' }">
                <input type="radio" v-model="paymentMethod" value="nagad">
                <div class="payment-option-content">
                  <div class="payment-icon nagad">
                    <i class="fas fa-mobile-alt"></i>
                  </div>
                  <div class="payment-info">
                    <h4>Nagad</h4>
                    <p>{{ t('payWithNagad') }}</p>
                  </div>
                </div>
              </label>

              <!-- Rocket -->
              <label class="payment-option" :class="{ selected: paymentMethod === 'rocket' }">
                <input type="radio" v-model="paymentMethod" value="rocket">
                <div class="payment-option-content">
                  <div class="payment-icon rocket">
                    <i class="fas fa-mobile-alt"></i>
                  </div>
                  <div class="payment-info">
                    <h4>Rocket</h4>
                    <p>{{ t('payWithRocket') }}</p>
                  </div>
                </div>
              </label>

              <!-- Bank Transfer -->
              <label class="payment-option" :class="{ selected: paymentMethod === 'bank' }">
                <input type="radio" v-model="paymentMethod" value="bank">
                <div class="payment-option-content">
                  <div class="payment-icon bank">
                    <i class="fas fa-university"></i>
                  </div>
                  <div class="payment-info">
                    <h4>{{ t('bankTransfer') }}</h4>
                    <p>{{ t('payWithBank') }}</p>
                  </div>
                </div>
              </label>

              <!-- Cash on Delivery -->
              <label class="payment-option" :class="{ selected: paymentMethod === 'cod' }">
                <input type="radio" v-model="paymentMethod" value="cod">
                <div class="payment-option-content">
                  <div class="payment-icon cod">
                    <i class="fas fa-money-bill-wave"></i>
                  </div>
                  <div class="payment-info">
                    <h4>{{ t('cashOnDelivery') }}</h4>
                    <p>{{ t('payWithCod') }}</p>
                  </div>
                </div>
              </label>

              <!-- Card -->
              <label class="payment-option" :class="{ selected: paymentMethod === 'card' }">
                <input type="radio" v-model="paymentMethod" value="card">
                <div class="payment-option-content">
                  <div class="payment-icon card">
                    <i class="fas fa-credit-card"></i>
                  </div>
                  <div class="payment-info">
                    <h4>{{ t('creditDebitCard') }}</h4>
                    <p>{{ t('payWithCard') }}</p>
                  </div>
                </div>
              </label>
            </div>

            <!-- Payment Details -->
            <div v-if="paymentMethod === 'bkash' || paymentMethod === 'nagad' || paymentMethod === 'rocket'" class="payment-details">
              <div class="form-group">
                <label>{{ t('mobileNumber') }} *</label>
                <div class="phone-input">
                  <span class="phone-prefix">+880</span>
                  <input 
                    type="tel" 
                    v-model="paymentDetails.mobileNumber"
                    maxlength="10"
                    :placeholder="t('enterMobileNumber')"
                  >
                </div>
              </div>
            </div>

            <div v-if="paymentMethod === 'card'" class="payment-details card-details">
              <div class="form-group">
                <label>{{ t('cardNumber') }} *</label>
                <input 
                  type="text" 
                  v-model="paymentDetails.cardNumber"
                  maxlength="19"
                  :placeholder="t('enterCardNumber')"
                  @input="formatCardNumber"
                >
              </div>
              <div class="form-row two-cols">
                <div class="form-group">
                  <label>{{ t('expiry') }} *</label>
                  <input 
                    type="text" 
                    v-model="paymentDetails.expiry"
                    maxlength="5"
                    placeholder="MM/YY"
                    @input="formatExpiry"
                  >
                </div>
                <div class="form-group">
                  <label>CVV *</label>
                  <input 
                    type="text" 
                    v-model="paymentDetails.cvv"
                    maxlength="4"
                    placeholder="***"
                  >
                </div>
              </div>
              <div class="form-group">
                <label>{{ t('cardholderName') }} *</label>
                <input 
                  type="text" 
                  v-model="paymentDetails.cardName"
                  :placeholder="t('enterCardholderName')"
                >
              </div>
            </div>

            <div class="step-actions">
              <button type="button" class="btn btn-secondary" @click="prevStep">
                <i class="fas fa-arrow-left"></i> {{ t('back') }}
              </button>
              <button type="button" class="btn btn-primary" @click="nextStep" :disabled="!paymentMethod">
                {{ t('reviewOrder') }} <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <!-- Step 3: Review -->
          <div v-show="currentStep === 3" class="checkout-step">
            <h2><i class="fas fa-clipboard-check"></i> {{ t('reviewOrder') }}</h2>

            <div class="review-sections">
              <!-- Shipping Review -->
              <div class="review-card">
                <div class="review-card-header">
                  <h3><i class="fas fa-truck"></i> {{ t('shippingAddress') }}</h3>
                  <button type="button" class="edit-btn" @click="goToStep(1)">
                    <i class="fas fa-edit"></i> {{ t('edit') }}
                  </button>
                </div>
                <div class="review-card-body">
                  <p><strong>{{ shippingData.fullName }}</strong></p>
                  <p>{{ shippingData.address1 }}</p>
                  <p v-if="shippingData.address2">{{ shippingData.address2 }}</p>
                  <p>{{ getCityName(shippingData.city) }}, {{ shippingData.postalCode }}</p>
                  <p>+880 {{ shippingData.phone }}</p>
                  <p>{{ shippingData.email }}</p>
                </div>
              </div>

              <!-- Payment Review -->
              <div class="review-card">
                <div class="review-card-header">
                  <h3><i class="fas fa-credit-card"></i> {{ t('paymentMethod') }}</h3>
                  <button type="button" class="edit-btn" @click="goToStep(2)">
                    <i class="fas fa-edit"></i> {{ t('edit') }}
                  </button>
                </div>
                <div class="review-card-body">
                  <p><strong>{{ getPaymentMethodName(paymentMethod) }}</strong></p>
                  <p v-if="paymentDetails.mobileNumber">+880 {{ paymentDetails.mobileNumber }}</p>
                  <p v-if="paymentDetails.cardNumber">**** **** **** {{ paymentDetails.cardNumber.slice(-4) }}</p>
                </div>
              </div>

              <!-- Order Items -->
              <div class="review-card items-card">
                <div class="review-card-header">
                  <h3><i class="fas fa-box"></i> {{ t('orderItems') }} ({{ cartStore.totalItems }})</h3>
                </div>
                <div class="review-card-body">
                  <div v-for="item in cartStore.items" :key="item.itemKey" class="review-item">
                    <div class="review-item-image">
                      <img v-if="item.image" :src="item.image" :alt="item.name[lang]">
                      <i v-else class="fas fa-gem"></i>
                    </div>
                    <div class="review-item-details">
                      <h4>{{ item.name[lang] }}</h4>
                      <p>{{ item.category }} - {{ item.type }}</p>
                      <p>{{ t('qty') }}: {{ item.quantity }}</p>
                    </div>
                    <div class="review-item-price">
                      ৳{{ (item.price * item.quantity).toLocaleString() }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="step-actions">
              <button type="button" class="btn btn-secondary" @click="prevStep">
                <i class="fas fa-arrow-left"></i> {{ t('back') }}
              </button>
              <button type="button" class="btn btn-primary btn-place-order" @click="placeOrder" :disabled="isProcessing">
                <i v-if="isProcessing" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-check"></i>
                {{ isProcessing ? t('processing') : t('placeOrder') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="order-summary-sidebar">
          <div class="summary-card">
            <h3>{{ t('orderSummary') }}</h3>

            <div class="summary-items">
              <div v-for="item in cartStore.items" :key="item.itemKey" class="summary-item">
                <span class="item-name">{{ item.name[lang] }} × {{ item.quantity }}</span>
                <span class="item-price">৳{{ (item.price * item.quantity).toLocaleString() }}</span>
              </div>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-row">
              <span>{{ t('subtotal') }}</span>
              <span>৳{{ cartStore.subtotal.toLocaleString() }}</span>
            </div>

            <div class="summary-row" v-if="couponStore.appliedCoupon">
              <span>{{ t('discount') }}</span>
              <span class="discount">-৳{{ couponStore.discountAmount.toLocaleString() }}</span>
            </div>

            <div class="summary-row">
              <span>{{ t('shipping') }}</span>
              <span :class="{ free: cartStore.shippingCost === 0 }">
                {{ cartStore.shippingCost === 0 ? t('free') : '৳' + cartStore.shippingCost }}
              </span>
            </div>

            <div class="summary-row">
              <span>{{ t('tax') }}</span>
              <span>৳{{ cartStore.taxAmount.toLocaleString() }}</span>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-row total">
              <span>{{ t('total') }}</span>
              <span class="total-amount">৳{{ grandTotal.toLocaleString() }}</span>
            </div>

            <div class="secure-checkout">
              <i class="fas fa-lock"></i>
              <span>{{ t('secureCheckout') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useCouponsStore } from '../stores/coupons'
import { useOrdersStore } from '../stores/orders'
import { useLanguageStore } from '../stores/language'
import { useNotificationStore } from '../stores/notification'

const router = useRouter()
const cartStore = useCartStore()
const couponStore = useCouponsStore()
const ordersStore = useOrdersStore()
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()

const lang = computed(() => languageStore.currentLanguage)

const currentStep = ref(1)
const isProcessing = ref(false)
const paymentMethod = ref('')
const errors = ref({})

const steps = [
  { id: 1, label: 'shipping' },
  { id: 2, label: 'payment' },
  { id: 3, label: 'review' }
]

const shippingData = ref({
  fullName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  postalCode: '',
  notes: ''
})

const paymentDetails = ref({
  mobileNumber: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  cardName: ''
})

const cities = [
  { value: 'dhaka', en: 'Dhaka', bn: 'ঢাকা' },
  { value: 'chittagong', en: 'Chittagong', bn: 'চট্টগ্রাম' },
  { value: 'sylhet', en: 'Sylhet', bn: 'সিলেট' },
  { value: 'rajshahi', en: 'Rajshahi', bn: 'রাজশাহী' },
  { value: 'khulna', en: 'Khulna', bn: 'খুলনা' },
  { value: 'barishal', en: 'Barishal', bn: 'বরিশাল' },
  { value: 'rangpur', en: 'Rangpur', bn: 'রংপুর' },
  { value: 'mymensingh', en: 'Mymensingh', bn: 'ময়মনসিংহ' }
]

const progressWidth = computed(() => {
  return `${((currentStep.value - 1) / (steps.length - 1)) * 100}%`
})

const grandTotal = computed(() => {
  const subtotal = cartStore.subtotal
  const discount = couponStore.discountAmount || 0
  const shipping = cartStore.shippingCost
  const tax = cartStore.taxAmount
  return subtotal - discount + shipping + tax
})

const translations = {
  en: {
    home: 'Home',
    cart: 'Cart',
    checkout: 'Checkout',
    shipping: 'Shipping',
    payment: 'Payment',
    review: 'Review',
    shippingInfo: 'Shipping Information',
    fullName: 'Full Name',
    enterFullName: 'Enter your full name',
    email: 'Email Address',
    enterEmail: 'Enter your email',
    phone: 'Phone Number',
    enterPhone: '1XXXXXXXXX',
    address: 'Street Address',
    enterAddress: 'Enter your street address',
    address2: 'Apartment, Suite, etc.',
    enterAddress2: 'Apartment, suite, unit, etc. (optional)',
    city: 'City',
    selectCity: 'Select city',
    postalCode: 'Postal Code',
    enterPostalCode: '1234',
    orderNotes: 'Order Notes (Optional)',
    enterNotes: 'Special instructions for delivery',
    backToCart: 'Back to Cart',
    continueToPayment: 'Continue to Payment',
    paymentMethod: 'Payment Method',
    payWithBkash: 'Pay with bKash mobile wallet',
    payWithNagad: 'Pay with Nagad mobile wallet',
    payWithRocket: 'Pay with Rocket mobile banking',
    bankTransfer: 'Bank Transfer',
    payWithBank: 'Direct bank transfer',
    cashOnDelivery: 'Cash on Delivery',
    payWithCod: 'Pay when you receive',
    creditDebitCard: 'Credit/Debit Card',
    payWithCard: 'Visa, Mastercard, AMEX',
    mobileNumber: 'Mobile Number',
    enterMobileNumber: '1XXXXXXXXX',
    cardNumber: 'Card Number',
    enterCardNumber: '1234 5678 9012 3456',
    expiry: 'Expiry Date',
    cardholderName: 'Cardholder Name',
    enterCardholderName: 'Name on card',
    back: 'Back',
    reviewOrder: 'Review Order',
    shippingAddress: 'Shipping Address',
    edit: 'Edit',
    orderItems: 'Order Items',
    qty: 'Qty',
    placeOrder: 'Place Order',
    processing: 'Processing...',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    discount: 'Discount',
    shipping: 'Shipping',
    tax: 'Tax (VAT 5%)',
    total: 'Total',
    free: 'FREE',
    secureCheckout: 'Secure Checkout'
  },
  bn: {
    home: 'হোম',
    cart: 'কার্ট',
    checkout: 'চেকআউট',
    shipping: 'শিপিং',
    payment: 'পেমেন্ট',
    review: 'রিভিউ',
    shippingInfo: 'শিপিং তথ্য',
    fullName: 'পুরো নাম',
    enterFullName: 'আপনার পুরো নাম লিখুন',
    email: 'ইমেইল',
    enterEmail: 'আপনার ইমেইল লিখুন',
    phone: 'ফোন নম্বর',
    enterPhone: '১XXXXXXXXX',
    address: 'ঠিকানা',
    enterAddress: 'আপনার ঠিকানা লিখুন',
    address2: 'অ্যাপার্টমেন্ট, স্যুট, ইত্যাদি',
    enterAddress2: 'অ্যাপার্টমেন্ট, স্যুট (ঐচ্ছিক)',
    city: 'শহর',
    selectCity: 'শহর নির্বাচন করুন',
    postalCode: 'পোস্টাল কোড',
    enterPostalCode: '১২৩৪',
    orderNotes: 'অর্ডার নোট (ঐচ্ছিক)',
    enterNotes: 'ডেলিভারির জন্য বিশেষ নির্দেশ',
    backToCart: 'কার্টে ফিরে যান',
    continueToPayment: 'পেমেন্টে যান',
    paymentMethod: 'পেমেন্ট পদ্ধতি',
    payWithBkash: 'বিকাশ মোবাইল ওয়ালেট দিয়ে পে করুন',
    payWithNagad: 'নগদ মোবাইল ওয়ালেট দিয়ে পে করুন',
    payWithRocket: 'রকেট মোবাইল ব্যাংকিং দিয়ে পে করুন',
    bankTransfer: 'ব্যাংক ট্রান্সফার',
    payWithBank: 'সরাসরি ব্যাংক ট্রান্সফার',
    cashOnDelivery: 'ক্যাশ অন ডেলিভারি',
    payWithCod: 'পণ্য পেয়ে পেমেন্ট করুন',
    creditDebitCard: 'ক্রেডিট/ডেবিট কার্ড',
    payWithCard: 'ভিসা, মাস্টারকার্ড, এএমইএক্স',
    mobileNumber: 'মোবাইল নম্বর',
    enterMobileNumber: '১XXXXXXXXX',
    cardNumber: 'কার্ড নম্বর',
    enterCardNumber: '১২৩৪ ৫৬৭৮ ৯০১২ ৩৪৫৬',
    expiry: 'মেয়াদ',
    cardholderName: 'কার্ডধারীর নাম',
    enterCardholderName: 'কার্ডে নাম',
    back: 'পিছনে',
    reviewOrder: 'অর্ডার রিভিউ',
    shippingAddress: 'শিপিং ঠিকানা',
    edit: 'সম্পাদনা',
    orderItems: 'অর্ডার আইটেম',
    qty: 'পরিমাণ',
    placeOrder: 'অর্ডার করুন',
    processing: 'প্রসেসিং...',
    orderSummary: 'অর্ডার সারাংশ',
    subtotal: 'সাবটোটাল',
    discount: 'ছাড়',
    shipping: 'শিপিং',
    tax: 'ট্যাক্স (ভ্যাট ৫%)',
    total: 'মোট',
    free: 'ফ্রি',
    secureCheckout: 'নিরাপদ চেকআউট'
  }
}

function t(key) {
  return translations[lang.value]?.[key] || translations.en[key] || key
}

function getCityName(cityValue) {
  const city = cities.find(c => c.value === cityValue)
  return city ? (lang.value === 'bn' ? city.bn : city.en) : cityValue
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

function validateShipping() {
  errors.value = {}
  let valid = true

  if (!shippingData.value.fullName?.trim()) {
    errors.value.fullName = lang.value === 'bn' ? 'নাম প্রয়োজন' : 'Name is required'
    valid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(shippingData.value.email)) {
    errors.value.email = lang.value === 'bn' ? 'বৈধ ইমেইল প্রয়োজন' : 'Valid email is required'
    valid = false
  }

  const phoneRegex = /^1[3-9]\d{8}$/
  if (!phoneRegex.test(shippingData.value.phone)) {
    errors.value.phone = lang.value === 'bn' ? 'বৈধ ফোন নম্বর প্রয়োজন' : 'Valid phone is required'
    valid = false
  }

  return valid
}

function nextStep() {
  if (currentStep.value === 1) {
    if (!validateShipping()) return
  }
  if (currentStep.value < steps.length) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function goToStep(step) {
  if (step < currentStep.value) {
    currentStep.value = step
  }
}

function formatCardNumber(e) {
  let value = e.target.value.replace(/\D/g, '')
  value = value.replace(/(.{4})/g, '$1 ').trim()
  paymentDetails.value.cardNumber = value.substring(0, 19)
}

function formatExpiry(e) {
  let value = e.target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4)
  }
  paymentDetails.value.expiry = value
}

async function placeOrder() {
  isProcessing.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    const order = ordersStore.createOrder({
      items: cartStore.items,
      shipping: shippingData.value,
      paymentMethod: paymentMethod.value,
      paymentDetails: {
        mobileNumber: paymentDetails.value.mobileNumber,
        cardLast4: paymentDetails.value.cardNumber?.slice(-4)
      },
      subtotal: cartStore.subtotal,
      discount: couponStore.discountAmount || 0,
      shippingCost: cartStore.shippingCost,
      tax: cartStore.taxAmount,
      total: grandTotal.value
    })

    // Clear cart
    cartStore.clearCart()
    couponStore.clearCoupon()

    // Redirect to confirmation
    router.push({ name: 'OrderConfirmation', params: { orderId: order.id } })

  } catch (error) {
    notificationStore.error(lang.value === 'bn' ? 'অর্ডার প্রসেস করতে সমস্যা হয়েছে' : 'Failed to process order')
  } finally {
    isProcessing.value = false
  }
}

onMounted(() => {
  cartStore.initCart()
  if (cartStore.items.length === 0) {
    router.push('/cart')
  }
})
</script>

<style scoped>
.checkout-page {
  padding-bottom: 80px;
}

.breadcrumb-section {
  padding: 20px 0;
  background: #f8f8f8;
  margin-top: 80px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.breadcrumb a {
  color: #666;
}

.breadcrumb a:hover {
  color: #D4AF37;
}

.breadcrumb i {
  font-size: 10px;
  color: #999;
}

.page-title {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  margin: 40px 0;
  text-align: center;
}

/* Progress Steps */
.checkout-progress {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  margin-bottom: 50px;
  position: relative;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.progress-line {
  position: absolute;
  top: 20px;
  left: 60px;
  right: 60px;
  height: 3px;
  background: #e0e0e0;
}

.progress-line-fill {
  height: 100%;
  background: #D4AF37;
  transition: width 0.3s ease;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 1;
  flex: 1;
  cursor: pointer;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #666;
  transition: all 0.3s ease;
}

.progress-step.active .step-number {
  background: #D4AF37;
  color: white;
}

.progress-step.completed .step-number {
  background: #27ae60;
  color: white;
}

.step-label {
  font-size: 14px;
  color: #666;
  text-transform: capitalize;
}

.progress-step.active .step-label {
  color: #D4AF37;
  font-weight: 600;
}

/* Layout */
.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
  align-items: start;
}

/* Checkout Content */
.checkout-content {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.checkout-step h2 {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkout-step h2 i {
  color: #D4AF37;
}

/* Forms */
.form-row {
  margin-bottom: 20px;
}

.form-row.two-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #D4AF37;
}

.phone-input {
  display: flex;
  align-items: stretch;
}

.phone-prefix {
  padding: 12px 15px;
  background: #f5f5f5;
  border: 2px solid #e0e0e0;
  border-right: none;
  border-radius: 8px 0 0 8px;
  color: #666;
}

.phone-input input {
  border-radius: 0 8px 8px 0;
}

.field-error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

/* Payment Options */
.payment-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 30px;
}

.payment-option {
  cursor: pointer;
}

.payment-option input {
  display: none;
}

.payment-option-content {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.payment-option.selected .payment-option-content,
.payment-option:hover .payment-option-content {
  border-color: #D4AF37;
  background: #fffbf0;
}

.payment-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
}

.payment-icon.bkash { background: #E2136E; }
.payment-icon.nagad { background: #F6921E; }
.payment-icon.rocket { background: #8C3494; }
.payment-icon.bank { background: #2c3e50; }
.payment-icon.cod { background: #27ae60; }
.payment-icon.card { background: #3498db; }

.payment-info h4 {
  font-size: 16px;
  margin-bottom: 3px;
}

.payment-info p {
  font-size: 12px;
  color: #666;
}

.payment-details {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

/* Step Actions */
.step-actions {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 8px;
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

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.btn-place-order {
  min-width: 200px;
  justify-content: center;
}

/* Review Cards */
.review-sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.review-card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
}

.review-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
}

.review-card-header h3 {
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.review-card-header h3 i {
  color: #D4AF37;
}

.edit-btn {
  background: none;
  border: none;
  color: #D4AF37;
  cursor: pointer;
  font-size: 14px;
}

.edit-btn:hover {
  text-decoration: underline;
}

.review-card-body {
  padding: 20px;
}

.review-card-body p {
  margin-bottom: 5px;
  color: #555;
}

/* Review Items */
.review-item {
  display: flex;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.review-item:last-child {
  border-bottom: none;
}

.review-item-image {
  width: 60px;
  height: 60px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.review-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.review-item-image i {
  font-size: 24px;
  color: #D4AF37;
}

.review-item-details {
  flex: 1;
}

.review-item-details h4 {
  font-size: 15px;
  margin-bottom: 5px;
}

.review-item-details p {
  font-size: 13px;
  color: #666;
  margin-bottom: 3px;
}

.review-item-price {
  font-weight: 600;
  color: #D4AF37;
}

/* Order Summary Sidebar */
.order-summary-sidebar {
  position: sticky;
  top: 100px;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.summary-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.summary-items {
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
}

.summary-item .item-name {
  color: #666;
}

.summary-divider {
  height: 1px;
  background: #eee;
  margin: 15px 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.summary-row .discount {
  color: #27ae60;
}

.summary-row .free {
  color: #27ae60;
  font-weight: 600;
}

.summary-row.total {
  font-size: 18px;
  font-weight: 700;
}

.total-amount {
  color: #D4AF37;
}

.secure-checkout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  color: #27ae60;
  font-size: 13px;
}

/* Responsive */
@media (max-width: 992px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }
  
  .order-summary-sidebar {
    position: static;
    order: -1;
  }
  
  .payment-options {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .form-row.two-cols {
    grid-template-columns: 1fr;
  }
  
  .step-actions {
    flex-direction: column;
  }
  
  .checkout-progress {
    gap: 0;
  }
  
  .step-label {
    font-size: 11px;
  }
}
</style>
