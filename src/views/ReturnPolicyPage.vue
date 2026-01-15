<template>
  <main class="page-content">
    <!-- Breadcrumb -->
    <section class="breadcrumb-section">
      <div class="container">
        <nav class="breadcrumb fade-in-up">
          <router-link to="/">{{ t('Home', 'হোম') }}</router-link>
          <i class="fas fa-chevron-right"></i>
          <span>{{ t('Return Policy', 'রিটার্ন নীতি') }}</span>
        </nav>
      </div>
    </section>

    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title fade-in-up">{{ t('Return & Refund Policy', 'রিটার্ন ও রিফান্ড নীতি') }}</h1>
        <p class="page-subtitle fade-in-up delay-1">
          {{ t('Your satisfaction is our priority. Learn about our hassle-free return process.', 
               'আপনার সন্তুষ্টি আমাদের অগ্রাধিকার। আমাদের ঝামেলামুক্ত রিটার্ন প্রক্রিয়া সম্পর্কে জানুন।') }}
        </p>
      </div>
    </section>

    <!-- Return Eligibility -->
    <section class="eligibility-section">
      <div class="container">
        <div class="eligibility-card fade-in-up">
          <div class="card-header">
            <i class="fas fa-check-circle"></i>
            <h2>{{ t('Return Eligibility', 'রিটার্ন যোগ্যতা') }}</h2>
          </div>
          
          <div class="eligibility-grid">
            <div class="eligibility-item eligible">
              <h4><i class="fas fa-check"></i> {{ t('Eligible for Return', 'রিটার্নের জন্য যোগ্য') }}</h4>
              <ul>
                <li v-for="(item, index) in eligibleItems" :key="index">
                  {{ t(item.en, item.bn) }}
                </li>
              </ul>
            </div>
            <div class="eligibility-item not-eligible">
              <h4><i class="fas fa-times"></i> {{ t('Not Eligible for Return', 'রিটার্নের জন্য অযোগ্য') }}</h4>
              <ul>
                <li v-for="(item, index) in notEligibleItems" :key="index">
                  {{ t(item.en, item.bn) }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Return Timeframe -->
    <section class="timeframe-section">
      <div class="container">
        <h2 class="section-title fade-in-up">{{ t('Return Timeframe', 'রিটার্ন সময়সীমা') }}</h2>
        
        <div class="timeframe-cards">
          <div class="timeframe-card fade-in-up delay-1">
            <div class="days">7</div>
            <h3>{{ t('Days', 'দিন') }}</h3>
            <p>{{ t('Easy Return Window', 'সহজ রিটার্ন উইন্ডো') }}</p>
            <span class="note">{{ t('From delivery date', 'ডেলিভারির তারিখ থেকে') }}</span>
          </div>
          <div class="timeframe-card fade-in-up delay-2">
            <div class="days">14</div>
            <h3>{{ t('Days', 'দিন') }}</h3>
            <p>{{ t('Exchange Window', 'এক্সচেঞ্জ উইন্ডো') }}</p>
            <span class="note">{{ t('For size/style changes', 'সাইজ/স্টাইল পরিবর্তনের জন্য') }}</span>
          </div>
          <div class="timeframe-card fade-in-up delay-3">
            <div class="days">5-7</div>
            <h3>{{ t('Days', 'দিন') }}</h3>
            <p>{{ t('Refund Processing', 'রিফান্ড প্রক্রিয়া') }}</p>
            <span class="note">{{ t('After receiving return', 'রিটার্ন পাওয়ার পর') }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Return Process -->
    <section class="process-section">
      <div class="container">
        <h2 class="section-title fade-in-up">{{ t('How to Return', 'কিভাবে রিটার্ন করবেন') }}</h2>
        
        <div class="process-steps">
          <div v-for="(step, index) in returnSteps" :key="index" 
               class="process-step fade-in-up"
               :class="'delay-' + (index + 1)">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-icon">
              <i :class="step.icon"></i>
            </div>
            <h3>{{ t(step.titleEn, step.titleBn) }}</h3>
            <p>{{ t(step.descEn, step.descBn) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Refund Policy -->
    <section class="refund-section">
      <div class="container">
        <div class="refund-wrapper">
          <div class="refund-content fade-in-left">
            <h2 class="section-title">{{ t('Refund Policy', 'রিফান্ড নীতি') }}</h2>
            <p>{{ t('Once we receive your return, our team will inspect the item and process your refund within 5-7 business days.', 
                    'একবার আমরা আপনার রিটার্ন পাওয়ার পর, আমাদের টিম আইটেমটি পরীক্ষা করবে এবং ৫-৭ কর্মদিবসের মধ্যে আপনার রিফান্ড প্রক্রিয়া করবে।') }}</p>
            
            <div class="refund-methods">
              <h4>{{ t('Refund Methods:', 'রিফান্ড পদ্ধতি:') }}</h4>
              <div class="method-item">
                <i class="fas fa-credit-card"></i>
                <div>
                  <strong>{{ t('Original Payment Method', 'মূল পেমেন্ট পদ্ধতি') }}</strong>
                  <p>{{ t('Refund to the same card/account used for purchase', 'যে কার্ড/অ্যাকাউন্ট দিয়ে কিনেছেন সেখানে রিফান্ড') }}</p>
                </div>
              </div>
              <div class="method-item">
                <i class="fas fa-wallet"></i>
                <div>
                  <strong>{{ t('Store Credit', 'স্টোর ক্রেডিট') }}</strong>
                  <p>{{ t('Get instant store credit for future purchases', 'ভবিষ্যত কেনাকাটার জন্য তাৎক্ষণিক স্টোর ক্রেডিট পান') }}</p>
                </div>
              </div>
              <div class="method-item">
                <i class="fas fa-mobile-alt"></i>
                <div>
                  <strong>{{ t('Mobile Banking', 'মোবাইল ব্যাংকিং') }}</strong>
                  <p>{{ t('bKash, Nagad, Rocket (for COD orders)', 'বিকাশ, নগদ, রকেট (ক্যাশ অন ডেলিভারি অর্ডারের জন্য)') }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="refund-image fade-in-right">
            <div class="image-placeholder">
              <i class="fas fa-hand-holding-usd"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Exchange Policy -->
    <section class="exchange-section">
      <div class="container">
        <div class="exchange-card fade-in-up">
          <div class="exchange-icon">
            <i class="fas fa-exchange-alt"></i>
          </div>
          <h2>{{ t('Exchange Policy', 'এক্সচেঞ্জ নীতি') }}</h2>
          <p>{{ t('Want a different size or style? We offer free exchanges within 14 days of delivery!', 
                  'ভিন্ন সাইজ বা স্টাইল চান? আমরা ডেলিভারির ১৪ দিনের মধ্যে বিনামূল্যে এক্সচেঞ্জ অফার করি!') }}</p>
          
          <div class="exchange-features">
            <div class="feature">
              <i class="fas fa-check-circle"></i>
              <span>{{ t('Free exchange for same-priced items', 'সমান মূল্যের আইটেমের জন্য বিনামূল্যে এক্সচেঞ্জ') }}</span>
            </div>
            <div class="feature">
              <i class="fas fa-check-circle"></i>
              <span>{{ t('Pay the difference for higher-priced items', 'বেশি মূল্যের আইটেমের জন্য পার্থক্য পরিশোধ করুন') }}</span>
            </div>
            <div class="feature">
              <i class="fas fa-check-circle"></i>
              <span>{{ t('Get refund for lower-priced exchanges', 'কম মূল্যের এক্সচেঞ্জের জন্য রিফান্ড পান') }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Return Shipping -->
    <section class="return-shipping-section">
      <div class="container">
        <h2 class="section-title fade-in-up">{{ t('Return Shipping', 'রিটার্ন শিপিং') }}</h2>
        
        <div class="shipping-options">
          <div class="shipping-option fade-in-up delay-1">
            <div class="option-icon free">
              <i class="fas fa-truck"></i>
            </div>
            <h3>{{ t('Free Pickup', 'বিনামূল্যে পিকআপ') }}</h3>
            <p>{{ t('For defective or wrong items, we offer free pickup from your address', 
                    'ত্রুটিপূর্ণ বা ভুল আইটেমের জন্য, আমরা আপনার ঠিকানা থেকে বিনামূল্যে পিকআপ অফার করি') }}</p>
            <span class="badge free">{{ t('FREE', 'বিনামূল্যে') }}</span>
          </div>
          <div class="shipping-option fade-in-up delay-2">
            <div class="option-icon paid">
              <i class="fas fa-box"></i>
            </div>
            <h3>{{ t('Self Ship', 'নিজে শিপ করুন') }}</h3>
            <p>{{ t('For change of mind returns, shipping cost of ৳60-120 applies', 
                    'মন পরিবর্তন রিটার্নের জন্য, ৳৬০-১২০ শিপিং খরচ প্রযোজ্য') }}</p>
            <span class="badge paid">৳60-120</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Return Form -->
    <section class="return-form-section">
      <div class="container">
        <div class="form-wrapper fade-in-up">
          <h2>{{ t('Request a Return', 'রিটার্ন অনুরোধ করুন') }}</h2>
          <p>{{ t('Fill out the form below and our team will contact you within 24 hours', 
                  'নিচের ফর্মটি পূরণ করুন এবং আমাদের টিম ২৪ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করবে') }}</p>
          
          <form @submit.prevent="submitReturn" class="return-form">
            <div class="form-row">
              <div class="form-group">
                <label>{{ t('Order ID', 'অর্ডার আইডি') }} *</label>
                <input type="text" v-model="returnForm.orderId" required 
                       :placeholder="t('e.g., ST-12345', 'যেমন: ST-12345')">
              </div>
              <div class="form-group">
                <label>{{ t('Email', 'ইমেইল') }} *</label>
                <input type="email" v-model="returnForm.email" required 
                       :placeholder="t('Your email address', 'আপনার ইমেইল')">
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>{{ t('Phone', 'ফোন') }} *</label>
                <input type="tel" v-model="returnForm.phone" required 
                       :placeholder="t('Your phone number', 'আপনার ফোন নম্বর')">
              </div>
              <div class="form-group">
                <label>{{ t('Return Type', 'রিটার্ন টাইপ') }} *</label>
                <select v-model="returnForm.type" required>
                  <option value="">{{ t('Select type', 'টাইপ নির্বাচন করুন') }}</option>
                  <option value="refund">{{ t('Refund', 'রিফান্ড') }}</option>
                  <option value="exchange">{{ t('Exchange', 'এক্সচেঞ্জ') }}</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label>{{ t('Reason for Return', 'রিটার্নের কারণ') }} *</label>
              <select v-model="returnForm.reason" required>
                <option value="">{{ t('Select reason', 'কারণ নির্বাচন করুন') }}</option>
                <option value="defective">{{ t('Defective/Damaged item', 'ত্রুটিপূর্ণ/ক্ষতিগ্রস্ত আইটেম') }}</option>
                <option value="wrong">{{ t('Wrong item received', 'ভুল আইটেম পেয়েছি') }}</option>
                <option value="size">{{ t('Size issue', 'সাইজ সমস্যা') }}</option>
                <option value="style">{{ t('Style not as expected', 'স্টাইল প্রত্যাশা অনুযায়ী নয়') }}</option>
                <option value="other">{{ t('Other', 'অন্যান্য') }}</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>{{ t('Additional Details', 'অতিরিক্ত বিবরণ') }}</label>
              <textarea v-model="returnForm.details" rows="4" 
                        :placeholder="t('Please provide more details about your return request', 
                                        'অনুগ্রহ করে আপনার রিটার্ন অনুরোধ সম্পর্কে আরও বিবরণ দিন')"></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-paper-plane"></i>
              {{ t('Submit Return Request', 'রিটার্ন অনুরোধ জমা দিন') }}
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-card fade-in-up">
          <i class="fas fa-headset"></i>
          <h3>{{ t('Need Help with Returns?', 'রিটার্নে সাহায্য দরকার?') }}</h3>
          <p>{{ t('Our customer service team is here to assist you', 'আমাদের কাস্টমার সার্ভিস টিম আপনাকে সাহায্য করতে এখানে আছে') }}</p>
          <div class="contact-options">
            <a href="tel:+8801234567890" class="contact-btn">
              <i class="fas fa-phone"></i>
              +880 1234-567890
            </a>
            <a href="mailto:returns@shonartori.com" class="contact-btn">
              <i class="fas fa-envelope"></i>
              returns@shonartori.com
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useLanguageStore } from '../stores/language'
import { useNotificationStore } from '../stores/notification'

const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const { t } = languageStore

const eligibleItems = [
  { en: 'Unused items in original condition', bn: 'মূল অবস্থায় অব্যবহৃত আইটেম' },
  { en: 'Items with original tags and packaging', bn: 'মূল ট্যাগ এবং প্যাকেজিং সহ আইটেম' },
  { en: 'Defective or damaged products', bn: 'ত্রুটিপূর্ণ বা ক্ষতিগ্রস্ত পণ্য' },
  { en: 'Wrong item delivered', bn: 'ভুল আইটেম ডেলিভারি হয়েছে' },
  { en: 'Size or style issues', bn: 'সাইজ বা স্টাইল সমস্যা' }
]

const notEligibleItems = [
  { en: 'Customized or personalized items', bn: 'কাস্টমাইজড বা ব্যক্তিগতকৃত আইটেম' },
  { en: 'Items damaged by customer', bn: 'গ্রাহকের দ্বারা ক্ষতিগ্রস্ত আইটেম' },
  { en: 'Items without original packaging', bn: 'মূল প্যাকেজিং ছাড়া আইটেম' },
  { en: 'Earrings (for hygiene reasons)', bn: 'কানের দুল (স্বাস্থ্যবিধি কারণে)' },
  { en: 'Items purchased during clearance sale', bn: 'ক্লিয়ারেন্স সেলে কেনা আইটেম' }
]

const returnSteps = [
  {
    titleEn: 'Contact Us',
    titleBn: 'যোগাযোগ করুন',
    descEn: 'Fill out the return form or contact our customer service team',
    descBn: 'রিটার্ন ফর্ম পূরণ করুন বা আমাদের কাস্টমার সার্ভিস টিমে যোগাযোগ করুন',
    icon: 'fas fa-comments'
  },
  {
    titleEn: 'Get Approval',
    titleBn: 'অনুমোদন পান',
    descEn: 'Receive return authorization and shipping instructions',
    descBn: 'রিটার্ন অনুমোদন এবং শিপিং নির্দেশনা পান',
    icon: 'fas fa-check-double'
  },
  {
    titleEn: 'Pack Item',
    titleBn: 'আইটেম প্যাক করুন',
    descEn: 'Securely pack the item in original packaging',
    descBn: 'মূল প্যাকেজিংয়ে আইটেমটি নিরাপদে প্যাক করুন',
    icon: 'fas fa-box'
  },
  {
    titleEn: 'Ship or Pickup',
    titleBn: 'শিপ বা পিকআপ',
    descEn: 'Ship the item or schedule a pickup from your address',
    descBn: 'আইটেমটি শিপ করুন বা আপনার ঠিকানা থেকে পিকআপ সিডিউল করুন',
    icon: 'fas fa-shipping-fast'
  },
  {
    titleEn: 'Get Refund',
    titleBn: 'রিফান্ড পান',
    descEn: 'Receive your refund within 5-7 business days',
    descBn: '৫-৭ কর্মদিবসের মধ্যে আপনার রিফান্ড পান',
    icon: 'fas fa-hand-holding-usd'
  }
]

const returnForm = reactive({
  orderId: '',
  email: '',
  phone: '',
  type: '',
  reason: '',
  details: ''
})

function submitReturn() {
  const message = languageStore.t(
    'Return request submitted! We will contact you within 24 hours.',
    'রিটার্ন অনুরোধ জমা হয়েছে! আমরা ২৪ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করব।'
  )
  notificationStore.show(message)
  
  // Reset form
  Object.keys(returnForm).forEach(key => returnForm[key] = '')
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

.breadcrumb i {
  font-size: 10px;
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

/* Section Title */
.section-title {
  font-family: var(--font-primary);
  font-size: 36px;
  text-align: center;
  margin-bottom: 40px;
  color: var(--text-dark);
}

/* Eligibility Section */
.eligibility-section {
  padding: 60px 0;
}

.eligibility-card {
  background: var(--white);
  border-radius: 20px;
  padding: 40px;
  box-shadow: var(--shadow-md);
}

.card-header {
  text-align: center;
  margin-bottom: 40px;
}

.card-header i {
  font-size: 50px;
  color: var(--primary-gold);
  margin-bottom: 15px;
  display: block;
}

.card-header h2 {
  font-family: var(--font-primary);
  font-size: 32px;
}

.eligibility-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.eligibility-item h4 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid;
}

.eligibility-item.eligible h4 {
  color: #28a745;
  border-color: #28a745;
}

.eligibility-item.not-eligible h4 {
  color: #dc3545;
  border-color: #dc3545;
}

.eligibility-item ul {
  list-style: none;
}

.eligibility-item li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  color: var(--text-light);
}

.eligibility-item li:last-child {
  border-bottom: none;
}

/* Timeframe Section */
.timeframe-section {
  padding: 80px 0;
  background: var(--primary-light);
}

.timeframe-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.timeframe-card {
  background: var(--white);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: var(--transition-smooth);
}

.timeframe-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
}

.timeframe-card .days {
  font-size: 60px;
  font-weight: 700;
  color: var(--primary-gold);
  line-height: 1;
}

.timeframe-card h3 {
  font-size: 24px;
  color: var(--text-light);
  margin-bottom: 15px;
}

.timeframe-card p {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 10px;
}

.timeframe-card .note {
  font-size: 14px;
  color: var(--text-light);
}

/* Process Section */
.process-section {
  padding: 80px 0;
}

.process-steps {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.process-steps::before {
  content: '';
  position: absolute;
  top: 60px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: #eee;
}

.process-step {
  flex: 1;
  text-align: center;
  position: relative;
  padding: 0 15px;
}

.step-number {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  background: var(--primary-gold);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  z-index: 1;
}

.step-icon {
  width: 80px;
  height: 80px;
  background: var(--primary-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto 20px;
}

.step-icon i {
  font-size: 30px;
  color: var(--primary-gold);
}

.process-step h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.process-step p {
  font-size: 14px;
  color: var(--text-light);
}

/* Refund Section */
.refund-section {
  padding: 80px 0;
  background: var(--primary-light);
}

.refund-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.refund-content .section-title {
  text-align: left;
  margin-bottom: 20px;
}

.refund-content > p {
  color: var(--text-light);
  margin-bottom: 30px;
  line-height: 1.8;
}

.refund-methods h4 {
  margin-bottom: 20px;
  font-size: 18px;
}

.method-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  background: var(--white);
  border-radius: 15px;
  margin-bottom: 15px;
}

.method-item i {
  font-size: 24px;
  color: var(--primary-gold);
  margin-top: 5px;
}

.method-item strong {
  display: block;
  margin-bottom: 5px;
}

.method-item p {
  font-size: 14px;
  color: var(--text-light);
  margin: 0;
}

.refund-image .image-placeholder {
  height: 400px;
  background: linear-gradient(135deg, var(--primary-gold), var(--accent));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.refund-image .image-placeholder i {
  font-size: 120px;
  color: rgba(255, 255, 255, 0.3);
}

/* Exchange Section */
.exchange-section {
  padding: 80px 0;
}

.exchange-card {
  max-width: 800px;
  margin: 0 auto;
  background: linear-gradient(135deg, var(--primary-gold), var(--accent));
  border-radius: 20px;
  padding: 50px;
  text-align: center;
  color: var(--white);
}

.exchange-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.exchange-icon i {
  font-size: 36px;
}

.exchange-card h2 {
  font-family: var(--font-primary);
  font-size: 32px;
  margin-bottom: 15px;
}

.exchange-card > p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 30px;
}

.exchange-features {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 500px;
  margin: 0 auto;
}

.exchange-features .feature {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px 20px;
  border-radius: 10px;
}

/* Return Shipping Section */
.return-shipping-section {
  padding: 80px 0;
  background: var(--primary-light);
}

.shipping-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.shipping-option {
  background: var(--white);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: var(--shadow-md);
  position: relative;
}

.option-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.option-icon.free {
  background: #d4edda;
}

.option-icon.free i {
  color: #28a745;
  font-size: 28px;
}

.option-icon.paid {
  background: #fff3cd;
}

.option-icon.paid i {
  color: #856404;
  font-size: 28px;
}

.shipping-option h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.shipping-option p {
  color: var(--text-light);
  font-size: 14px;
}

.shipping-option .badge {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.badge.free {
  background: #d4edda;
  color: #28a745;
}

.badge.paid {
  background: #fff3cd;
  color: #856404;
}

/* Return Form Section */
.return-form-section {
  padding: 80px 0;
}

.form-wrapper {
  max-width: 700px;
  margin: 0 auto;
  background: var(--white);
  border-radius: 20px;
  padding: 50px;
  box-shadow: var(--shadow-md);
}

.form-wrapper h2 {
  font-family: var(--font-primary);
  font-size: 32px;
  text-align: center;
  margin-bottom: 10px;
}

.form-wrapper > p {
  text-align: center;
  color: var(--text-light);
  margin-bottom: 40px;
}

.return-form .form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.return-form .form-group {
  margin-bottom: 20px;
}

.return-form label {
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
}

.return-form input,
.return-form select,
.return-form textarea {
  width: 100%;
  padding: 15px;
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 16px;
  transition: var(--transition-smooth);
}

.return-form input:focus,
.return-form select:focus,
.return-form textarea:focus {
  outline: none;
  border-color: var(--primary-gold);
}

.return-form textarea {
  resize: vertical;
}

/* Contact Section */
.contact-section {
  padding: 80px 0;
  background: var(--primary-light);
}

.contact-card {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  background: var(--white);
  border-radius: 20px;
  padding: 50px;
  box-shadow: var(--shadow-md);
}

.contact-card i {
  font-size: 50px;
  color: var(--primary-gold);
  margin-bottom: 20px;
}

.contact-card h3 {
  font-family: var(--font-primary);
  font-size: 28px;
  margin-bottom: 10px;
}

.contact-card > p {
  color: var(--text-light);
  margin-bottom: 30px;
}

.contact-options {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 25px;
  background: var(--primary-light);
  border-radius: 50px;
  color: var(--text-dark);
  text-decoration: none;
  transition: var(--transition-smooth);
}

.contact-btn:hover {
  background: var(--primary-gold);
  color: var(--white);
}

/* Buttons */
.btn {
  padding: 15px 40px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: var(--transition-smooth);
  border: none;
  cursor: pointer;
  width: 100%;
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

/* Animations */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
}

.fade-in-left {
  opacity: 0;
  transform: translateX(-30px);
  animation: fadeInLeft 0.8s ease forwards;
}

.fade-in-right {
  opacity: 0;
  transform: translateX(30px);
  animation: fadeInRight 0.8s ease forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }
.delay-4 { animation-delay: 0.8s; }
.delay-5 { animation-delay: 1s; }

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInLeft {
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInRight {
  to { opacity: 1; transform: translateX(0); }
}

/* Responsive */
@media (max-width: 1024px) {
  .eligibility-grid {
    grid-template-columns: 1fr;
  }
  
  .refund-wrapper {
    grid-template-columns: 1fr;
  }
  
  .process-steps {
    flex-direction: column;
    gap: 30px;
  }
  
  .process-steps::before {
    display: none;
  }
  
  .process-step {
    display: flex;
    text-align: left;
    gap: 20px;
  }
  
  .step-number {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
  }
  
  .step-icon {
    margin: 0;
    flex-shrink: 0;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }
  
  .section-title {
    font-size: 28px;
  }
  
  .timeframe-cards {
    grid-template-columns: 1fr;
  }
  
  .shipping-options {
    grid-template-columns: 1fr;
  }
  
  .return-form .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
