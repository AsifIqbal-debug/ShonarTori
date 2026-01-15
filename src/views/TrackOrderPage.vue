<template>
  <main class="page-content">
    <!-- Breadcrumb -->
    <section class="breadcrumb-section">
      <div class="container">
        <nav class="breadcrumb fade-in-up">
          <router-link to="/">{{ t('Home', 'হোম') }}</router-link>
          <i class="fas fa-chevron-right"></i>
          <span>{{ t('Track Order', 'অর্ডার ট্র্যাক') }}</span>
        </nav>
      </div>
    </section>

    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title fade-in-up">{{ t('Track Your Order', 'আপনার অর্ডার ট্র্যাক করুন') }}</h1>
        <p class="page-subtitle fade-in-up delay-1">
          {{ t('Enter your order details to track your shipment in real-time', 
               'রিয়েল-টাইমে আপনার শিপমেন্ট ট্র্যাক করতে অর্ডারের বিবরণ লিখুন') }}
        </p>
      </div>
    </section>

    <!-- Track Order Form -->
    <section class="track-form-section">
      <div class="container">
        <div class="track-form-wrapper fade-in-up delay-2">
          <form @submit.prevent="trackOrder" class="track-form">
            <div class="form-group">
              <label>{{ t('Order ID', 'অর্ডার আইডি') }}</label>
              <div class="input-with-icon">
                <i class="fas fa-hashtag"></i>
                <input 
                  type="text" 
                  v-model="orderId" 
                  :placeholder="t('Enter your order ID (e.g., ST-12345)', 'অর্ডার আইডি লিখুন (যেমন: ST-12345)')"
                  required
                >
              </div>
            </div>
            <div class="form-group">
              <label>{{ t('Email Address', 'ইমেইল ঠিকানা') }}</label>
              <div class="input-with-icon">
                <i class="fas fa-envelope"></i>
                <input 
                  type="email" 
                  v-model="email" 
                  :placeholder="t('Enter your email address', 'আপনার ইমেইল লিখুন')"
                  required
                >
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-block">
              <i class="fas fa-search"></i>
              {{ t('Track Order', 'অর্ডার ট্র্যাক করুন') }}
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Tracking Result -->
    <section v-if="showResult" class="tracking-result-section">
      <div class="container">
        <div class="tracking-result fade-in-up">
          <!-- Order Info Card -->
          <div class="order-info-card">
            <div class="order-header">
              <div class="order-id">
                <span class="label">{{ t('Order ID', 'অর্ডার আইডি') }}</span>
                <span class="value">{{ trackingData.orderId }}</span>
              </div>
              <div class="order-status" :class="trackingData.statusClass">
                {{ t(trackingData.statusEn, trackingData.statusBn) }}
              </div>
            </div>
            
            <div class="order-details-grid">
              <div class="detail-item">
                <i class="fas fa-calendar-alt"></i>
                <div>
                  <span class="label">{{ t('Order Date', 'অর্ডারের তারিখ') }}</span>
                  <span class="value">{{ trackingData.orderDate }}</span>
                </div>
              </div>
              <div class="detail-item">
                <i class="fas fa-truck"></i>
                <div>
                  <span class="label">{{ t('Estimated Delivery', 'আনুমানিক ডেলিভারি') }}</span>
                  <span class="value">{{ trackingData.estimatedDelivery }}</span>
                </div>
              </div>
              <div class="detail-item">
                <i class="fas fa-shipping-fast"></i>
                <div>
                  <span class="label">{{ t('Courier', 'কুরিয়ার') }}</span>
                  <span class="value">{{ trackingData.courier }}</span>
                </div>
              </div>
              <div class="detail-item">
                <i class="fas fa-barcode"></i>
                <div>
                  <span class="label">{{ t('Tracking Number', 'ট্র্যাকিং নম্বর') }}</span>
                  <span class="value">{{ trackingData.trackingNumber }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Progress Timeline -->
          <div class="tracking-timeline">
            <h3>{{ t('Shipment Progress', 'শিপমেন্ট অগ্রগতি') }}</h3>
            
            <!-- Progress Bar -->
            <div class="progress-bar-container">
              <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
            </div>
            
            <!-- Timeline Steps -->
            <div class="timeline-steps">
              <div 
                v-for="(step, index) in timelineSteps" 
                :key="index" 
                class="timeline-step"
                :class="{ 'completed': step.completed, 'current': step.current }"
              >
                <div class="step-icon">
                  <i :class="step.icon"></i>
                </div>
                <div class="step-content">
                  <h4>{{ t(step.titleEn, step.titleBn) }}</h4>
                  <p v-if="step.date">{{ step.date }}</p>
                  <p v-if="step.location" class="location">{{ step.location }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Support -->
          <div class="support-section">
            <p>{{ t('Need help with your order?', 'আপনার অর্ডারে সাহায্য দরকার?') }}</p>
            <router-link to="/#contact" class="btn btn-secondary">
              <i class="fas fa-headset"></i>
              {{ t('Contact Support', 'সাপোর্টে যোগাযোগ') }}
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- No Result Found -->
    <section v-if="showNoResult" class="no-result-section">
      <div class="container">
        <div class="no-result fade-in-up">
          <i class="fas fa-search"></i>
          <h3>{{ t('Order Not Found', 'অর্ডার পাওয়া যায়নি') }}</h3>
          <p>{{ t('Please check your order ID and email address and try again.', 
                  'অনুগ্রহ করে আপনার অর্ডার আইডি এবং ইমেইল ঠিকানা পরীক্ষা করে আবার চেষ্টা করুন।') }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()
const { t } = languageStore

const orderId = ref('')
const email = ref('')
const showResult = ref(false)
const showNoResult = ref(false)

// Sample tracking data
const trackingData = ref({
  orderId: 'ST-12345',
  statusEn: 'In Transit',
  statusBn: 'ট্রানজিটে',
  statusClass: 'status-transit',
  orderDate: 'January 10, 2026',
  estimatedDelivery: 'January 18, 2026',
  courier: 'Sundarban Courier',
  trackingNumber: 'SUN-9876543210'
})

const timelineSteps = ref([
  { 
    titleEn: 'Order Placed', 
    titleBn: 'অর্ডার সম্পন্ন', 
    icon: 'fas fa-shopping-cart',
    completed: true,
    current: false,
    date: 'Jan 10, 2026 - 10:30 AM',
    location: ''
  },
  { 
    titleEn: 'Processing', 
    titleBn: 'প্রসেসিং', 
    icon: 'fas fa-cog',
    completed: true,
    current: false,
    date: 'Jan 11, 2026 - 2:15 PM',
    location: ''
  },
  { 
    titleEn: 'Shipped', 
    titleBn: 'শিপড', 
    icon: 'fas fa-box',
    completed: true,
    current: false,
    date: 'Jan 12, 2026 - 9:00 AM',
    location: 'Dhaka Hub'
  },
  { 
    titleEn: 'Out for Delivery', 
    titleBn: 'ডেলিভারির জন্য বের', 
    icon: 'fas fa-truck',
    completed: false,
    current: true,
    date: 'Jan 16, 2026',
    location: 'Mirpur, Dhaka'
  },
  { 
    titleEn: 'Delivered', 
    titleBn: 'ডেলিভার্ড', 
    icon: 'fas fa-check-circle',
    completed: false,
    current: false,
    date: '',
    location: ''
  }
])

const progressWidth = computed(() => {
  const completedSteps = timelineSteps.value.filter(s => s.completed).length
  const currentStep = timelineSteps.value.findIndex(s => s.current)
  const totalSteps = timelineSteps.value.length - 1
  
  if (currentStep >= 0) {
    return ((currentStep + 0.5) / totalSteps) * 100
  }
  return (completedSteps / totalSteps) * 100
})

function trackOrder() {
  // Simulate order tracking
  if (orderId.value && email.value) {
    // Demo: Show result for any input
    showNoResult.value = false
    showResult.value = true
    trackingData.value.orderId = orderId.value.toUpperCase()
  } else {
    showResult.value = false
    showNoResult.value = true
  }
}
</script>

<style scoped>
.page-content {
  padding-top: 100px;
  min-height: 100vh;
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

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb i {
  font-size: 10px;
  color: var(--text-light);
}

.breadcrumb span {
  color: var(--text-light);
}

/* Page Header */
.page-header {
  text-align: center;
  padding: 60px 0 40px;
}

.page-title {
  font-family: var(--font-primary);
  font-size: 48px;
  color: var(--text-dark);
  margin-bottom: 15px;
}

.page-subtitle {
  font-size: 18px;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

/* Track Form */
.track-form-section {
  padding: 0 0 60px;
}

.track-form-wrapper {
  max-width: 500px;
  margin: 0 auto;
  background: var(--white);
  padding: 40px;
  border-radius: 20px;
  box-shadow: var(--shadow-md);
}

.track-form .form-group {
  margin-bottom: 25px;
}

.track-form label {
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-dark);
}

.input-with-icon {
  position: relative;
}

.input-with-icon i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary-gold);
}

.input-with-icon input {
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 16px;
  transition: var(--transition-smooth);
}

.input-with-icon input:focus {
  outline: none;
  border-color: var(--primary-gold);
}

.btn-block {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

/* Tracking Result */
.tracking-result-section {
  padding: 0 0 80px;
}

.tracking-result {
  max-width: 800px;
  margin: 0 auto;
}

.order-info-card {
  background: var(--white);
  border-radius: 20px;
  padding: 30px;
  box-shadow: var(--shadow-md);
  margin-bottom: 40px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.order-id .label {
  display: block;
  font-size: 12px;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.order-id .value {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-dark);
  font-family: var(--font-primary);
}

.order-status {
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.status-transit {
  background: #fff3cd;
  color: #856404;
}

.status-delivered {
  background: #d4edda;
  color: #155724;
}

.status-processing {
  background: #cce5ff;
  color: #004085;
}

.order-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.detail-item i {
  font-size: 24px;
  color: var(--primary-gold);
  margin-top: 5px;
}

.detail-item .label {
  display: block;
  font-size: 12px;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
}

.detail-item .value {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
}

/* Timeline */
.tracking-timeline {
  background: var(--white);
  border-radius: 20px;
  padding: 30px;
  box-shadow: var(--shadow-md);
  margin-bottom: 40px;
}

.tracking-timeline h3 {
  font-family: var(--font-primary);
  font-size: 24px;
  margin-bottom: 30px;
  color: var(--text-dark);
}

.progress-bar-container {
  height: 6px;
  background: #eee;
  border-radius: 3px;
  margin-bottom: 40px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-gold), var(--accent));
  border-radius: 3px;
  transition: width 1s ease;
}

.timeline-steps {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.timeline-step {
  flex: 1;
  text-align: center;
  position: relative;
}

.timeline-step::before {
  content: '';
  position: absolute;
  top: 25px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: #eee;
  z-index: 0;
}

.timeline-step:last-child::before {
  display: none;
}

.timeline-step.completed::before {
  background: var(--primary-gold);
}

.step-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  position: relative;
  z-index: 1;
  transition: var(--transition-smooth);
}

.step-icon i {
  font-size: 20px;
  color: var(--text-light);
}

.timeline-step.completed .step-icon {
  background: var(--primary-gold);
}

.timeline-step.completed .step-icon i {
  color: var(--white);
}

.timeline-step.current .step-icon {
  background: var(--white);
  border: 3px solid var(--primary-gold);
  animation: pulse 2s infinite;
}

.timeline-step.current .step-icon i {
  color: var(--primary-gold);
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
  }
  50% {
    box-shadow: 0 0 0 15px rgba(212, 175, 55, 0);
  }
}

.step-content h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 5px;
}

.step-content p {
  font-size: 12px;
  color: var(--text-light);
}

.step-content .location {
  color: var(--primary-gold);
  font-weight: 500;
}

/* Support Section */
.support-section {
  text-align: center;
  padding: 30px;
  background: var(--primary-light);
  border-radius: 20px;
}

.support-section p {
  margin-bottom: 15px;
  color: var(--text-light);
}

/* No Result */
.no-result-section {
  padding: 0 0 80px;
}

.no-result {
  text-align: center;
  padding: 60px 40px;
  background: var(--white);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  max-width: 500px;
  margin: 0 auto;
}

.no-result i {
  font-size: 60px;
  color: var(--text-light);
  margin-bottom: 20px;
}

.no-result h3 {
  font-family: var(--font-primary);
  font-size: 24px;
  margin-bottom: 10px;
}

.no-result p {
  color: var(--text-light);
}

/* Buttons */
.btn {
  padding: 15px 40px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: var(--transition-smooth);
  border: none;
  cursor: pointer;
  text-decoration: none;
}

.btn-primary {
  background: var(--primary-gold);
  color: var(--white);
}

.btn-primary:hover {
  background: var(--accent);
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: transparent;
  color: var(--text-dark);
  border: 2px solid var(--text-dark);
}

.btn-secondary:hover {
  background: var(--text-dark);
  color: var(--white);
}

/* Animations */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }
  
  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .order-details-grid {
    grid-template-columns: 1fr;
  }
  
  .timeline-steps {
    flex-direction: column;
    gap: 30px;
  }
  
  .timeline-step {
    display: flex;
    text-align: left;
    gap: 20px;
  }
  
  .timeline-step::before {
    display: none;
  }
  
  .step-icon {
    margin: 0;
    flex-shrink: 0;
  }
}
</style>
