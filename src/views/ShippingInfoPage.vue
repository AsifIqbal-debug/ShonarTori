<template>
  <main class="page-content">
    <!-- Breadcrumb -->
    <section class="breadcrumb-section">
      <div class="container">
        <nav class="breadcrumb fade-in-up">
          <router-link to="/">{{ t('Home', 'হোম') }}</router-link>
          <i class="fas fa-chevron-right"></i>
          <span>{{ t('Shipping Info', 'শিপিং তথ্য') }}</span>
        </nav>
      </div>
    </section>

    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title fade-in-up">{{ t('Shipping Information', 'শিপিং তথ্য') }}</h1>
        <p class="page-subtitle fade-in-up delay-1">
          {{ t('Everything you need to know about our shipping process', 
               'আমাদের শিপিং প্রক্রিয়া সম্পর্কে আপনার যা জানা দরকার') }}
        </p>
      </div>
    </section>

    <!-- Shipping Methods -->
    <section class="shipping-methods-section">
      <div class="container">
        <h2 class="section-title fade-in-up">{{ t('Shipping Methods', 'শিপিং পদ্ধতি') }}</h2>
        
        <div class="shipping-cards">
          <div v-for="(method, index) in shippingMethods" :key="index" 
               class="shipping-card fade-in-up" 
               :class="'delay-' + (index + 1)">
            <div class="card-icon" :style="{ background: method.color }">
              <i :class="method.icon"></i>
            </div>
            <h3>{{ t(method.titleEn, method.titleBn) }}</h3>
            <p class="delivery-time">
              <i class="fas fa-clock"></i>
              {{ t(method.timeEn, method.timeBn) }}
            </p>
            <p class="description">{{ t(method.descEn, method.descBn) }}</p>
            <div class="price">
              <span class="label">{{ t('Starting from', 'শুরু') }}</span>
              <span class="amount">৳{{ method.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Free Shipping Banner -->
    <section class="free-shipping-banner">
      <div class="container">
        <div class="banner-content fade-in-up">
          <i class="fas fa-gift"></i>
          <div>
            <h3>{{ t('Free Shipping on Orders Over ৳5,000!', '৳৫,০০০ এর উপরে অর্ডারে ফ্রি শিপিং!') }}</h3>
            <p>{{ t('Enjoy complimentary delivery on all orders above ৳5,000', 
                    '৳৫,০০০ এর উপরে সকল অর্ডারে বিনামূল্যে ডেলিভারি উপভোগ করুন') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Shipping Costs Table -->
    <section class="shipping-costs-section">
      <div class="container">
        <h2 class="section-title fade-in-up">{{ t('Shipping Costs by Location', 'অবস্থান অনুযায়ী শিপিং খরচ') }}</h2>
        
        <div class="table-wrapper fade-in-up delay-1">
          <table class="shipping-table">
            <thead>
              <tr>
                <th>{{ t('Location', 'অবস্থান') }}</th>
                <th>{{ t('Standard', 'স্ট্যান্ডার্ড') }}</th>
                <th>{{ t('Express', 'এক্সপ্রেস') }}</th>
                <th>{{ t('Delivery Time', 'ডেলিভারি সময়') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(area, index) in deliveryAreas" :key="index">
                <td>{{ t(area.nameEn, area.nameBn) }}</td>
                <td>৳{{ area.standard }}</td>
                <td>৳{{ area.express }}</td>
                <td>{{ t(area.timeEn, area.timeBn) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Packaging Section -->
    <section class="packaging-section">
      <div class="container">
        <div class="packaging-wrapper">
          <div class="packaging-image fade-in-left">
            <div class="image-placeholder">
              <i class="fas fa-box-open"></i>
            </div>
          </div>
          <div class="packaging-content fade-in-right">
            <h2 class="section-title">{{ t('Premium Packaging', 'প্রিমিয়াম প্যাকেজিং') }}</h2>
            <p>{{ t('Every piece of jewelry is carefully packaged to ensure it reaches you in perfect condition.', 
                    'প্রতিটি জুয়েলারি সযত্নে প্যাকেজ করা হয় যাতে এটি আপনার কাছে নিখুঁত অবস্থায় পৌঁছায়।') }}</p>
            
            <ul class="packaging-features">
              <li v-for="(feature, index) in packagingFeatures" :key="index">
                <i class="fas fa-check-circle"></i>
                {{ t(feature.en, feature.bn) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Delivery Areas -->
    <section class="delivery-areas-section">
      <div class="container">
        <h2 class="section-title fade-in-up">{{ t('Delivery Areas in Bangladesh', 'বাংলাদেশে ডেলিভারি এলাকা') }}</h2>
        
        <div class="areas-grid fade-in-up delay-1">
          <div class="area-card" v-for="(division, index) in divisions" :key="index">
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ t(division.en, division.bn) }}</span>
          </div>
        </div>
        
        <p class="areas-note fade-in-up delay-2">
          <i class="fas fa-info-circle"></i>
          {{ t('We deliver to all 64 districts across Bangladesh', 'আমরা বাংলাদেশের সকল ৬৪ জেলায় ডেলিভারি করি') }}
        </p>
      </div>
    </section>

    <!-- International Shipping -->
    <section class="international-section">
      <div class="container">
        <div class="international-card fade-in-up">
          <div class="card-header">
            <i class="fas fa-globe"></i>
            <h2>{{ t('International Shipping', 'আন্তর্জাতিক শিপিং') }}</h2>
          </div>
          <p>{{ t('We ship to selected countries worldwide. International orders are shipped via trusted courier partners with full tracking.', 
                  'আমরা বিশ্বব্যাপী নির্বাচিত দেশে শিপ করি। আন্তর্জাতিক অর্ডার বিশ্বস্ত কুরিয়ার পার্টনারের মাধ্যমে সম্পূর্ণ ট্র্যাকিং সহ শিপ করা হয়।') }}</p>
          
          <div class="international-info">
            <div class="info-item">
              <i class="fas fa-clock"></i>
              <span>{{ t('7-15 business days', '৭-১৫ কর্মদিবস') }}</span>
            </div>
            <div class="info-item">
              <i class="fas fa-shield-alt"></i>
              <span>{{ t('Fully insured shipments', 'সম্পূর্ণ বীমাকৃত শিপমেন্ট') }}</span>
            </div>
            <div class="info-item">
              <i class="fas fa-file-invoice"></i>
              <span>{{ t('Custom duties may apply', 'কাস্টম ডিউটি প্রযোজ্য হতে পারে') }}</span>
            </div>
          </div>
          
          <router-link to="/#contact" class="btn btn-primary">
            {{ t('Contact for International Orders', 'আন্তর্জাতিক অর্ডারের জন্য যোগাযোগ করুন') }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <h2 class="section-title fade-in-up">{{ t('Shipping FAQs', 'শিপিং প্রশ্নোত্তর') }}</h2>
        
        <div class="faq-list fade-in-up delay-1">
          <div v-for="(faq, index) in shippingFaqs" :key="index" 
               class="faq-item" 
               :class="{ 'active': activeFaq === index }">
            <button class="faq-question" @click="toggleFaq(index)">
              <span>{{ t(faq.questionEn, faq.questionBn) }}</span>
              <i class="fas" :class="activeFaq === index ? 'fa-minus' : 'fa-plus'"></i>
            </button>
            <div class="faq-answer" v-show="activeFaq === index">
              <p>{{ t(faq.answerEn, faq.answerBn) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()
const { t } = languageStore

const activeFaq = ref(null)

const shippingMethods = [
  {
    titleEn: 'Standard Shipping',
    titleBn: 'স্ট্যান্ডার্ড শিপিং',
    icon: 'fas fa-truck',
    color: 'linear-gradient(135deg, #667eea, #764ba2)',
    timeEn: '3-5 Business Days',
    timeBn: '৩-৫ কর্মদিবস',
    descEn: 'Reliable delivery for non-urgent orders',
    descBn: 'জরুরি নয় এমন অর্ডারের জন্য নির্ভরযোগ্য ডেলিভারি',
    price: 60
  },
  {
    titleEn: 'Express Shipping',
    titleBn: 'এক্সপ্রেস শিপিং',
    icon: 'fas fa-shipping-fast',
    color: 'linear-gradient(135deg, var(--primary-gold), var(--accent))',
    timeEn: '1-2 Business Days',
    timeBn: '১-২ কর্মদিবস',
    descEn: 'Fast delivery for urgent orders',
    descBn: 'জরুরি অর্ডারের জন্য দ্রুত ডেলিভারি',
    price: 120
  },
  {
    titleEn: 'Same Day Delivery',
    titleBn: 'একই দিন ডেলিভারি',
    icon: 'fas fa-bolt',
    color: 'linear-gradient(135deg, #f093fb, #f5576c)',
    timeEn: 'Within 24 Hours',
    timeBn: '২৪ ঘণ্টার মধ্যে',
    descEn: 'Available in Dhaka only (order before 12 PM)',
    descBn: 'শুধুমাত্র ঢাকায় (দুপুর ১২টার আগে অর্ডার করুন)',
    price: 200
  }
]

const deliveryAreas = [
  { nameEn: 'Dhaka City', nameBn: 'ঢাকা সিটি', standard: 60, express: 120, timeEn: '1-2 days', timeBn: '১-২ দিন' },
  { nameEn: 'Dhaka Division', nameBn: 'ঢাকা বিভাগ', standard: 80, express: 150, timeEn: '2-3 days', timeBn: '২-৩ দিন' },
  { nameEn: 'Chittagong Division', nameBn: 'চট্টগ্রাম বিভাগ', standard: 100, express: 180, timeEn: '3-4 days', timeBn: '৩-৪ দিন' },
  { nameEn: 'Sylhet Division', nameBn: 'সিলেট বিভাগ', standard: 100, express: 180, timeEn: '3-4 days', timeBn: '৩-৪ দিন' },
  { nameEn: 'Rajshahi Division', nameBn: 'রাজশাহী বিভাগ', standard: 100, express: 180, timeEn: '3-5 days', timeBn: '৩-৫ দিন' },
  { nameEn: 'Khulna Division', nameBn: 'খুলনা বিভাগ', standard: 100, express: 180, timeEn: '3-5 days', timeBn: '৩-৫ দিন' },
  { nameEn: 'Barisal Division', nameBn: 'বরিশাল বিভাগ', standard: 120, express: 200, timeEn: '4-5 days', timeBn: '৪-৫ দিন' },
  { nameEn: 'Rangpur Division', nameBn: 'রংপুর বিভাগ', standard: 120, express: 200, timeEn: '4-5 days', timeBn: '৪-৫ দিন' },
  { nameEn: 'Mymensingh Division', nameBn: 'ময়মনসিংহ বিভাগ', standard: 100, express: 180, timeEn: '3-4 days', timeBn: '৩-৪ দিন' }
]

const packagingFeatures = [
  { en: 'Elegant jewelry box with velvet lining', bn: 'ভেলভেট লাইনিং সহ মার্জিত জুয়েলারি বক্স' },
  { en: 'Protective cushioning for safe transit', bn: 'নিরাপদ ট্রানজিটের জন্য প্রতিরক্ষামূলক কুশনিং' },
  { en: 'Tamper-evident sealed packaging', bn: 'ট্যাম্পার-এভিডেন্ট সিলড প্যাকেজিং' },
  { en: 'Gift wrapping available on request', bn: 'অনুরোধে গিফট র‍্যাপিং পাওয়া যায়' },
  { en: 'Authenticity certificate included', bn: 'অথেনটিসিটি সার্টিফিকেট অন্তর্ভুক্ত' }
]

const divisions = [
  { en: 'Dhaka', bn: 'ঢাকা' },
  { en: 'Chittagong', bn: 'চট্টগ্রাম' },
  { en: 'Sylhet', bn: 'সিলেট' },
  { en: 'Rajshahi', bn: 'রাজশাহী' },
  { en: 'Khulna', bn: 'খুলনা' },
  { en: 'Barisal', bn: 'বরিশাল' },
  { en: 'Rangpur', bn: 'রংপুর' },
  { en: 'Mymensingh', bn: 'ময়মনসিংহ' }
]

const shippingFaqs = [
  {
    questionEn: 'How can I track my order?',
    questionBn: 'আমি কিভাবে আমার অর্ডার ট্র্যাক করতে পারি?',
    answerEn: 'Once your order is shipped, you will receive an email with your tracking number and a link to track your shipment. You can also use our Track Order page with your order ID.',
    answerBn: 'আপনার অর্ডার শিপ হওয়ার পরে, আপনি আপনার ট্র্যাকিং নম্বর এবং শিপমেন্ট ট্র্যাক করার লিঙ্ক সহ একটি ইমেইল পাবেন। আপনি আপনার অর্ডার আইডি দিয়ে আমাদের ট্র্যাক অর্ডার পেজও ব্যবহার করতে পারেন।'
  },
  {
    questionEn: 'What if my package is damaged during delivery?',
    questionBn: 'ডেলিভারির সময় আমার প্যাকেজ ক্ষতিগ্রস্ত হলে কী হবে?',
    answerEn: 'All our shipments are fully insured. If your package arrives damaged, please contact us immediately with photos of the damage. We will arrange a replacement or full refund.',
    answerBn: 'আমাদের সকল শিপমেন্ট সম্পূর্ণ বীমাকৃত। আপনার প্যাকেজ ক্ষতিগ্রস্ত অবস্থায় আসলে, অনুগ্রহ করে ক্ষতির ছবি সহ অবিলম্বে আমাদের সাথে যোগাযোগ করুন। আমরা প্রতিস্থাপন বা সম্পূর্ণ রিফান্ডের ব্যবস্থা করব।'
  },
  {
    questionEn: 'Can I change my delivery address after ordering?',
    questionBn: 'অর্ডার করার পরে কি আমি আমার ডেলিভারি ঠিকানা পরিবর্তন করতে পারি?',
    answerEn: 'Yes, you can change your delivery address before your order is shipped. Please contact our customer service as soon as possible to make the change.',
    answerBn: 'হ্যাঁ, আপনার অর্ডার শিপ হওয়ার আগে আপনি আপনার ডেলিভারি ঠিকানা পরিবর্তন করতে পারেন। পরিবর্তন করতে যত তাড়াতাড়ি সম্ভব আমাদের কাস্টমার সার্ভিসে যোগাযোগ করুন।'
  },
  {
    questionEn: 'Do you offer gift delivery?',
    questionBn: 'আপনারা কি গিফট ডেলিভারি অফার করেন?',
    answerEn: 'Yes! We offer special gift packaging and can deliver directly to your recipient. Just select the gift option at checkout and provide the recipient\'s address.',
    answerBn: 'হ্যাঁ! আমরা বিশেষ গিফট প্যাকেজিং অফার করি এবং সরাসরি আপনার প্রাপকের কাছে ডেলিভারি করতে পারি। শুধু চেকআউটে গিফট অপশন সিলেক্ট করুন এবং প্রাপকের ঠিকানা দিন।'
  }
]

function toggleFaq(index) {
  activeFaq.value = activeFaq.value === index ? null : index
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

/* Section Title */
.section-title {
  font-family: var(--font-primary);
  font-size: 36px;
  text-align: center;
  margin-bottom: 40px;
  color: var(--text-dark);
}

/* Shipping Methods */
.shipping-methods-section {
  padding: 60px 0;
}

.shipping-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.shipping-card {
  background: var(--white);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: var(--transition-smooth);
}

.shipping-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
}

.card-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.card-icon i {
  font-size: 32px;
  color: var(--white);
}

.shipping-card h3 {
  font-family: var(--font-primary);
  font-size: 24px;
  margin-bottom: 15px;
}

.delivery-time {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--primary-light);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: var(--primary-gold);
  margin-bottom: 15px;
}

.shipping-card .description {
  color: var(--text-light);
  margin-bottom: 20px;
}

.shipping-card .price {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.shipping-card .price .label {
  display: block;
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 5px;
}

.shipping-card .price .amount {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-gold);
}

/* Free Shipping Banner */
.free-shipping-banner {
  background: linear-gradient(135deg, var(--primary-gold), var(--accent));
  padding: 40px 0;
}

.banner-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  color: var(--white);
  text-align: center;
}

.banner-content i {
  font-size: 50px;
}

.banner-content h3 {
  font-family: var(--font-primary);
  font-size: 28px;
  margin-bottom: 5px;
}

.banner-content p {
  opacity: 0.9;
}

/* Shipping Costs Table */
.shipping-costs-section {
  padding: 80px 0;
  background: var(--primary-light);
}

.table-wrapper {
  overflow-x: auto;
  background: var(--white);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
}

.shipping-table {
  width: 100%;
  border-collapse: collapse;
}

.shipping-table th,
.shipping-table td {
  padding: 20px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.shipping-table th {
  background: var(--primary-gold);
  color: var(--white);
  font-weight: 600;
}

.shipping-table th:first-child {
  border-radius: 20px 0 0 0;
}

.shipping-table th:last-child {
  border-radius: 0 20px 0 0;
}

.shipping-table tr:last-child td {
  border-bottom: none;
}

.shipping-table tr:hover {
  background: var(--primary-light);
}

/* Packaging Section */
.packaging-section {
  padding: 80px 0;
}

.packaging-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.image-placeholder {
  height: 400px;
  background: linear-gradient(135deg, var(--primary-gold), var(--accent));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder i {
  font-size: 120px;
  color: rgba(255, 255, 255, 0.3);
}

.packaging-content .section-title {
  text-align: left;
  margin-bottom: 20px;
}

.packaging-content p {
  color: var(--text-light);
  margin-bottom: 30px;
  line-height: 1.8;
}

.packaging-features {
  list-style: none;
}

.packaging-features li {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.packaging-features li:last-child {
  border-bottom: none;
}

.packaging-features i {
  color: var(--primary-gold);
  font-size: 18px;
}

/* Delivery Areas */
.delivery-areas-section {
  padding: 80px 0;
  background: var(--primary-light);
}

.areas-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.area-card {
  background: var(--white);
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-smooth);
}

.area-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.area-card i {
  font-size: 24px;
  color: var(--primary-gold);
  margin-bottom: 10px;
  display: block;
}

.areas-note {
  text-align: center;
  color: var(--text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.areas-note i {
  color: var(--primary-gold);
}

/* International Section */
.international-section {
  padding: 80px 0;
}

.international-card {
  max-width: 800px;
  margin: 0 auto;
  background: var(--white);
  border-radius: 20px;
  padding: 50px;
  box-shadow: var(--shadow-md);
  text-align: center;
}

.card-header {
  margin-bottom: 20px;
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

.international-card > p {
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto 30px;
  line-height: 1.8;
}

.international-info {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.international-info .info-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.international-info i {
  color: var(--primary-gold);
}

/* FAQ Section */
.faq-section {
  padding: 80px 0;
  background: var(--primary-light);
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: var(--white);
  border-radius: 15px;
  margin-bottom: 15px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.faq-question {
  width: 100%;
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  transition: var(--transition-smooth);
}

.faq-question:hover {
  color: var(--primary-gold);
}

.faq-question i {
  color: var(--primary-gold);
  transition: var(--transition-smooth);
}

.faq-item.active .faq-question {
  color: var(--primary-gold);
}

.faq-answer {
  padding: 0 25px 25px;
  color: var(--text-light);
  line-height: 1.8;
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
  .shipping-cards {
    grid-template-columns: 1fr;
  }
  
  .packaging-wrapper {
    grid-template-columns: 1fr;
  }
  
  .areas-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }
  
  .section-title {
    font-size: 28px;
  }
  
  .banner-content {
    flex-direction: column;
  }
  
  .international-info {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
