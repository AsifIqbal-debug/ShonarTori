<template>
  <main class="page-content">
    <!-- Breadcrumb -->
    <section class="breadcrumb-section">
      <div class="container">
        <nav class="breadcrumb fade-in-up">
          <router-link to="/">{{ t('Home', 'হোম') }}</router-link>
          <i class="fas fa-chevron-right"></i>
          <span>{{ t('FAQ', 'প্রশ্নোত্তর') }}</span>
        </nav>
      </div>
    </section>

    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title fade-in-up">{{ t('Frequently Asked Questions', 'সচরাচর জিজ্ঞাসিত প্রশ্ন') }}</h1>
        <p class="page-subtitle fade-in-up delay-1">
          {{ t('Find answers to common questions about our products and services', 
               'আমাদের পণ্য এবং পরিষেবা সম্পর্কে সাধারণ প্রশ্নের উত্তর খুঁজুন') }}
        </p>
        
        <!-- Search Box -->
        <div class="search-box fade-in-up delay-2">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            :placeholder="t('Search for answers...', 'উত্তর খুঁজুন...')"
          >
        </div>
      </div>
    </section>

    <!-- Category Filter -->
    <section class="category-filter">
      <div class="container">
        <div class="filter-tabs fade-in-up">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['filter-btn', { active: activeCategory === category.id }]"
            @click="activeCategory = category.id"
          >
            <i :class="category.icon"></i>
            {{ t(category.nameEn, category.nameBn) }}
          </button>
        </div>
      </div>
    </section>

    <!-- FAQ Content -->
    <section class="faq-section">
      <div class="container">
        <div class="faq-grid">
          <!-- FAQ List -->
          <div class="faq-list">
            <div v-if="filteredFaqs.length === 0" class="no-results fade-in-up">
              <i class="fas fa-search"></i>
              <h3>{{ t('No results found', 'কোনো ফলাফল পাওয়া যায়নি') }}</h3>
              <p>{{ t('Try adjusting your search or browse categories', 'আপনার অনুসন্ধান সামঞ্জস্য করুন বা বিভাগ ব্রাউজ করুন') }}</p>
            </div>
            
            <div 
              v-for="(faq, index) in filteredFaqs" 
              :key="faq.id"
              class="faq-item fade-in-up"
              :class="{ open: openFaqs.includes(faq.id) }"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="faq-question" @click="toggleFaq(faq.id)">
                <div class="question-content">
                  <span class="category-badge">{{ getCategoryName(faq.category) }}</span>
                  <h3>{{ t(faq.questionEn, faq.questionBn) }}</h3>
                </div>
                <div class="toggle-icon">
                  <i :class="openFaqs.includes(faq.id) ? 'fas fa-minus' : 'fas fa-plus'"></i>
                </div>
              </div>
              <div class="faq-answer" v-show="openFaqs.includes(faq.id)">
                <p>{{ t(faq.answerEn, faq.answerBn) }}</p>
                <div v-if="faq.listEn" class="answer-list">
                  <ul>
                    <li v-for="(item, idx) in faq.listEn" :key="idx">
                      {{ t(item, faq.listBn[idx]) }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Sidebar -->
          <div class="faq-sidebar">
            <!-- Quick Links -->
            <div class="sidebar-card fade-in-right">
              <h3><i class="fas fa-link"></i> {{ t('Quick Links', 'দ্রুত লিঙ্ক') }}</h3>
              <ul class="quick-links">
                <li><router-link to="/track-order"><i class="fas fa-truck"></i> {{ t('Track Order', 'অর্ডার ট্র্যাক করুন') }}</router-link></li>
                <li><router-link to="/shipping-info"><i class="fas fa-shipping-fast"></i> {{ t('Shipping Info', 'শিপিং তথ্য') }}</router-link></li>
                <li><router-link to="/return-policy"><i class="fas fa-undo"></i> {{ t('Return Policy', 'রিটার্ন নীতি') }}</router-link></li>
                <li><router-link to="/size-guide"><i class="fas fa-ruler"></i> {{ t('Size Guide', 'সাইজ গাইড') }}</router-link></li>
              </ul>
            </div>
            
            <!-- Contact Card -->
            <div class="sidebar-card contact-card fade-in-right delay-1">
              <h3><i class="fas fa-headset"></i> {{ t("Can't find an answer?", 'উত্তর খুঁজে পাচ্ছেন না?') }}</h3>
              <p>{{ t('Our customer support team is here to help!', 'আমাদের কাস্টমার সাপোর্ট টিম আপনাকে সাহায্য করতে এখানে!') }}</p>
              <div class="contact-options">
                <a href="tel:+8801234567890" class="contact-btn">
                  <i class="fas fa-phone"></i>
                  <span>{{ t('Call Us', 'কল করুন') }}</span>
                </a>
                <a href="mailto:support@shonartori.com" class="contact-btn">
                  <i class="fas fa-envelope"></i>
                  <span>{{ t('Email Us', 'ইমেইল করুন') }}</span>
                </a>
              </div>
            </div>
            
            <!-- Popular Questions -->
            <div class="sidebar-card fade-in-right delay-2">
              <h3><i class="fas fa-fire"></i> {{ t('Popular Questions', 'জনপ্রিয় প্রশ্ন') }}</h3>
              <ul class="popular-questions">
                <li v-for="faq in popularFaqs" :key="faq.id" @click="scrollToFaq(faq.id)">
                  {{ t(faq.questionEn, faq.questionBn).substring(0, 50) }}...
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Still Have Questions -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card fade-in-up">
          <div class="cta-content">
            <h2>{{ t('Still Have Questions?', 'এখনও প্রশ্ন আছে?') }}</h2>
            <p>{{ t("We're here to help! Reach out to us through any of these channels.", 
                    'আমরা সাহায্য করতে এখানে! এই চ্যানেলগুলোর যেকোনো একটির মাধ্যমে আমাদের সাথে যোগাযোগ করুন।') }}</p>
          </div>
          <div class="cta-buttons">
            <a href="#" class="btn btn-primary">
              <i class="fab fa-whatsapp"></i>
              {{ t('WhatsApp', 'হোয়াটসঅ্যাপ') }}
            </a>
            <a href="#" class="btn btn-outline">
              <i class="fas fa-comments"></i>
              {{ t('Live Chat', 'লাইভ চ্যাট') }}
            </a>
          </div>
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

const searchQuery = ref('')
const activeCategory = ref('all')
const openFaqs = ref([])

const categories = [
  { id: 'all', nameEn: 'All', nameBn: 'সব', icon: 'fas fa-th-large' },
  { id: 'orders', nameEn: 'Orders', nameBn: 'অর্ডার', icon: 'fas fa-shopping-bag' },
  { id: 'shipping', nameEn: 'Shipping', nameBn: 'শিপিং', icon: 'fas fa-truck' },
  { id: 'returns', nameEn: 'Returns', nameBn: 'রিটার্ন', icon: 'fas fa-undo' },
  { id: 'products', nameEn: 'Products', nameBn: 'পণ্য', icon: 'fas fa-gem' },
  { id: 'payment', nameEn: 'Payment', nameBn: 'পেমেন্ট', icon: 'fas fa-credit-card' },
  { id: 'care', nameEn: 'Jewelry Care', nameBn: 'জুয়েলারি যত্ন', icon: 'fas fa-sparkles' }
]

const faqs = [
  // Orders
  {
    id: 1,
    category: 'orders',
    questionEn: 'How do I place an order?',
    questionBn: 'আমি কিভাবে অর্ডার করব?',
    answerEn: 'Placing an order is easy! Simply browse our collection, add items to your cart, and proceed to checkout. You can create an account or checkout as a guest.',
    answerBn: 'অর্ডার করা সহজ! শুধু আমাদের কালেকশন ব্রাউজ করুন, আইটেম কার্টে যোগ করুন এবং চেকআউটে যান। আপনি একটি অ্যাকাউন্ট তৈরি করতে পারেন বা গেস্ট হিসেবে চেকআউট করতে পারেন।',
    popular: true
  },
  {
    id: 2,
    category: 'orders',
    questionEn: 'Can I modify or cancel my order after placing it?',
    questionBn: 'অর্ডার দেওয়ার পর কি আমি পরিবর্তন বা বাতিল করতে পারি?',
    answerEn: 'You can modify or cancel your order within 1 hour of placing it. After that, please contact our customer service team. Orders that have already been shipped cannot be cancelled.',
    answerBn: 'অর্ডার দেওয়ার ১ ঘন্টার মধ্যে আপনি পরিবর্তন বা বাতিল করতে পারেন। এর পরে, অনুগ্রহ করে আমাদের কাস্টমার সার্ভিস টিমের সাথে যোগাযোগ করুন। যে অর্ডার ইতিমধ্যে শিপ করা হয়েছে তা বাতিল করা যাবে না।'
  },
  {
    id: 3,
    category: 'orders',
    questionEn: 'How can I track my order?',
    questionBn: 'আমি কিভাবে আমার অর্ডার ট্র্যাক করব?',
    answerEn: 'Once your order is shipped, you will receive a tracking number via email and SMS. You can use this number on our Track Order page or directly on the courier website.',
    answerBn: 'আপনার অর্ডার শিপ হলে, আপনি ইমেইল এবং এসএমএসের মাধ্যমে একটি ট্র্যাকিং নম্বর পাবেন। আপনি এই নম্বরটি আমাদের ট্র্যাক অর্ডার পেজে বা সরাসরি কুরিয়ার ওয়েবসাইটে ব্যবহার করতে পারেন।',
    popular: true
  },
  {
    id: 4,
    category: 'orders',
    questionEn: 'What happens if my order is lost or damaged?',
    questionBn: 'আমার অর্ডার হারিয়ে গেলে বা ক্ষতিগ্রস্ত হলে কি হবে?',
    answerEn: 'We take full responsibility for orders lost or damaged during shipping. Please contact us within 48 hours of delivery with photos of any damage, and we will arrange a replacement or refund.',
    answerBn: 'শিপিংয়ের সময় হারিয়ে যাওয়া বা ক্ষতিগ্রস্ত অর্ডারের জন্য আমরা সম্পূর্ণ দায়িত্ব নিই। অনুগ্রহ করে ডেলিভারির ৪৮ ঘন্টার মধ্যে কোনো ক্ষতির ছবি সহ আমাদের সাথে যোগাযোগ করুন এবং আমরা প্রতিস্থাপন বা রিফান্ডের ব্যবস্থা করব।'
  },

  // Shipping
  {
    id: 5,
    category: 'shipping',
    questionEn: 'What are the shipping options and costs?',
    questionBn: 'শিপিং অপশন এবং খরচ কি?',
    answerEn: 'We offer three shipping options:',
    answerBn: 'আমরা তিনটি শিপিং অপশন অফার করি:',
    listEn: [
      'Standard Shipping (3-5 days): ৳60-80',
      'Express Shipping (1-2 days): ৳100-150',
      'Same Day Delivery (Dhaka only): ৳200'
    ],
    listBn: [
      'স্ট্যান্ডার্ড শিপিং (৩-৫ দিন): ৳৬০-৮০',
      'এক্সপ্রেস শিপিং (১-২ দিন): ৳১০০-১৫০',
      'সেম ডে ডেলিভারি (শুধু ঢাকা): ৳২০০'
    ],
    popular: true
  },
  {
    id: 6,
    category: 'shipping',
    questionEn: 'Do you offer free shipping?',
    questionBn: 'আপনারা কি ফ্রি শিপিং অফার করেন?',
    answerEn: 'Yes! We offer free standard shipping on orders over ৳3,000 within Bangladesh. This is automatically applied at checkout when your order qualifies.',
    answerBn: 'হ্যাঁ! বাংলাদেশের মধ্যে ৳৩,০০০ এর বেশি অর্ডারে আমরা ফ্রি স্ট্যান্ডার্ড শিপিং অফার করি। আপনার অর্ডার যোগ্য হলে এটি স্বয়ংক্রিয়ভাবে চেকআউটে প্রয়োগ হবে।'
  },
  {
    id: 7,
    category: 'shipping',
    questionEn: 'Do you ship internationally?',
    questionBn: 'আপনারা কি আন্তর্জাতিক শিপিং করেন?',
    answerEn: 'Yes, we ship to select countries including USA, UK, Canada, UAE, and Singapore. International shipping takes 7-14 business days. Customs duties may apply based on your country.',
    answerBn: 'হ্যাঁ, আমরা USA, UK, কানাডা, UAE এবং সিঙ্গাপুর সহ নির্বাচিত দেশে শিপ করি। আন্তর্জাতিক শিপিংয়ে ৭-১৪ কর্মদিবস লাগে। আপনার দেশের উপর ভিত্তি করে কাস্টমস ডিউটি প্রযোজ্য হতে পারে।'
  },
  {
    id: 8,
    category: 'shipping',
    questionEn: 'How is my jewelry packaged?',
    questionBn: 'আমার জুয়েলারি কিভাবে প্যাকেজ করা হয়?',
    answerEn: 'All jewelry comes in our signature gift box with anti-tarnish packaging. Each piece is individually wrapped and placed in a padded box to ensure safe delivery.',
    answerBn: 'সব জুয়েলারি আমাদের সিগনেচার গিফট বক্সে অ্যান্টি-টার্নিশ প্যাকেজিং সহ আসে। প্রতিটি পিস আলাদাভাবে মোড়ানো হয় এবং নিরাপদ ডেলিভারি নিশ্চিত করতে প্যাডেড বক্সে রাখা হয়।'
  },

  // Returns
  {
    id: 9,
    category: 'returns',
    questionEn: 'What is your return policy?',
    questionBn: 'আপনাদের রিটার্ন পলিসি কি?',
    answerEn: 'We offer a 7-day easy return policy for unused items in original condition with tags attached. For exchanges, you have 14 days from the delivery date.',
    answerBn: 'মূল অবস্থায় ট্যাগ সংযুক্ত অব্যবহৃত আইটেমের জন্য আমরা ৭ দিনের সহজ রিটার্ন পলিসি অফার করি। এক্সচেঞ্জের জন্য, ডেলিভারির তারিখ থেকে আপনার কাছে ১৪ দিন আছে।',
    popular: true
  },
  {
    id: 10,
    category: 'returns',
    questionEn: 'How do I initiate a return?',
    questionBn: 'আমি কিভাবে রিটার্ন শুরু করব?',
    answerEn: 'To initiate a return, visit our Return Policy page and fill out the return request form. You can also contact our customer service team via phone or email. We will respond within 24 hours.',
    answerBn: 'রিটার্ন শুরু করতে, আমাদের রিটার্ন পলিসি পেজে যান এবং রিটার্ন রিকোয়েস্ট ফর্ম পূরণ করুন। আপনি ফোন বা ইমেইলের মাধ্যমেও আমাদের কাস্টমার সার্ভিস টিমের সাথে যোগাযোগ করতে পারেন। আমরা ২৪ ঘন্টার মধ্যে সাড়া দেব।'
  },
  {
    id: 11,
    category: 'returns',
    questionEn: 'How long does it take to receive a refund?',
    questionBn: 'রিফান্ড পেতে কতদিন লাগে?',
    answerEn: 'Once we receive and inspect your return, refunds are processed within 5-7 business days. The amount will be credited to your original payment method or as store credit, based on your preference.',
    answerBn: 'আমরা আপনার রিটার্ন পেয়ে পরীক্ষা করার পর, ৫-৭ কর্মদিবসের মধ্যে রিফান্ড প্রক্রিয়া করা হয়। আপনার পছন্দের উপর ভিত্তি করে, পরিমাণটি আপনার মূল পেমেন্ট পদ্ধতিতে বা স্টোর ক্রেডিট হিসাবে জমা হবে।'
  },
  {
    id: 12,
    category: 'returns',
    questionEn: 'Which items cannot be returned?',
    questionBn: 'কোন আইটেম রিটার্ন করা যাবে না?',
    answerEn: 'The following items cannot be returned:',
    answerBn: 'নিম্নলিখিত আইটেমগুলো রিটার্ন করা যাবে না:',
    listEn: [
      'Customized or personalized jewelry',
      'Earrings (for hygiene reasons)',
      'Items purchased during clearance sales',
      'Items without original packaging or tags'
    ],
    listBn: [
      'কাস্টমাইজড বা ব্যক্তিগতকৃত জুয়েলারি',
      'কানের দুল (স্বাস্থ্যবিধি কারণে)',
      'ক্লিয়ারেন্স সেলে কেনা আইটেম',
      'মূল প্যাকেজিং বা ট্যাগ ছাড়া আইটেম'
    ]
  },

  // Products
  {
    id: 13,
    category: 'products',
    questionEn: 'Are your jewelry pieces made of real gold?',
    questionBn: 'আপনাদের জুয়েলারি পিস কি আসল সোনার তৈরি?',
    answerEn: 'We offer both gold-plated and solid gold jewelry. Each product description clearly mentions the material. Our gold-plated items use high-quality 18K gold plating, while solid gold pieces are available in 18K and 22K.',
    answerBn: 'আমরা গোল্ড-প্লেটেড এবং সলিড গোল্ড উভয় জুয়েলারি অফার করি। প্রতিটি পণ্যের বিবরণে উপাদান স্পষ্টভাবে উল্লেখ করা হয়। আমাদের গোল্ড-প্লেটেড আইটেমগুলোতে উচ্চমানের ১৮ক্যারেট গোল্ড প্লেটিং ব্যবহার করা হয়, যখন সলিড গোল্ড পিসগুলো ১৮ক্যারেট এবং ২২ক্যারেটে পাওয়া যায়।',
    popular: true
  },
  {
    id: 14,
    category: 'products',
    questionEn: 'Do you offer customization or engraving?',
    questionBn: 'আপনারা কি কাস্টমাইজেশন বা এনগ্রেভিং অফার করেন?',
    answerEn: 'Yes! Many of our pieces can be customized with engravings, different stones, or size adjustments. Look for the "Customize" option on product pages or contact us for special requests.',
    answerBn: 'হ্যাঁ! আমাদের অনেক পিস এনগ্রেভিং, বিভিন্ন পাথর বা সাইজ অ্যাডজাস্টমেন্ট দিয়ে কাস্টমাইজ করা যায়। পণ্য পেজে "কাস্টমাইজ" অপশন দেখুন বা বিশেষ রিকোয়েস্টের জন্য আমাদের সাথে যোগাযোগ করুন।'
  },
  {
    id: 15,
    category: 'products',
    questionEn: 'How do I find my ring or bracelet size?',
    questionBn: 'আমি কিভাবে আমার রিং বা ব্রেসলেট সাইজ খুঁজব?',
    answerEn: 'Visit our Size Guide page for detailed instructions on measuring your ring, bracelet, and necklace sizes. We provide printable size guides and interactive calculators.',
    answerBn: 'আপনার রিং, ব্রেসলেট এবং নেকলেস সাইজ মাপার বিস্তারিত নির্দেশনার জন্য আমাদের সাইজ গাইড পেজ দেখুন। আমরা প্রিন্টযোগ্য সাইজ গাইড এবং ইন্টারঅ্যাক্টিভ ক্যালকুলেটর প্রদান করি।'
  },
  {
    id: 16,
    category: 'products',
    questionEn: 'Do you have a warranty on your products?',
    questionBn: 'আপনাদের পণ্যে কি ওয়ারেন্টি আছে?',
    answerEn: 'Yes, all our jewelry comes with a 1-year warranty against manufacturing defects. This covers issues like stone falling out, clasp breaking, or plating defects under normal use.',
    answerBn: 'হ্যাঁ, আমাদের সব জুয়েলারিতে উৎপাদন ত্রুটির বিরুদ্ধে ১ বছরের ওয়ারেন্টি আছে। এটি সাধারণ ব্যবহারে পাথর পড়ে যাওয়া, ক্লাস্প ভাঙা বা প্লেটিং ত্রুটির মতো সমস্যাগুলো কভার করে।'
  },

  // Payment
  {
    id: 17,
    category: 'payment',
    questionEn: 'What payment methods do you accept?',
    questionBn: 'আপনারা কোন পেমেন্ট মেথড গ্রহণ করেন?',
    answerEn: 'We accept multiple payment methods:',
    answerBn: 'আমরা একাধিক পেমেন্ট পদ্ধতি গ্রহণ করি:',
    listEn: [
      'Credit/Debit Cards (Visa, MasterCard, Amex)',
      'Mobile Banking (bKash, Nagad, Rocket)',
      'Bank Transfer',
      'Cash on Delivery (COD)'
    ],
    listBn: [
      'ক্রেডিট/ডেবিট কার্ড (ভিসা, মাস্টারকার্ড, অ্যামেক্স)',
      'মোবাইল ব্যাংকিং (বিকাশ, নগদ, রকেট)',
      'ব্যাংক ট্রান্সফার',
      'ক্যাশ অন ডেলিভারি (COD)'
    ],
    popular: true
  },
  {
    id: 18,
    category: 'payment',
    questionEn: 'Is it safe to pay online on your website?',
    questionBn: 'আপনাদের ওয়েবসাইটে অনলাইনে পেমেন্ট করা কি নিরাপদ?',
    answerEn: 'Absolutely! Our website uses SSL encryption and secure payment gateways. We never store your full card details. All transactions are processed through trusted payment providers.',
    answerBn: 'অবশ্যই! আমাদের ওয়েবসাইট SSL এনক্রিপশন এবং সিকিউর পেমেন্ট গেটওয়ে ব্যবহার করে। আমরা কখনো আপনার সম্পূর্ণ কার্ডের তথ্য সংরক্ষণ করি না। সমস্ত লেনদেন বিশ্বস্ত পেমেন্ট প্রদানকারীদের মাধ্যমে প্রক্রিয়া করা হয়।'
  },
  {
    id: 19,
    category: 'payment',
    questionEn: 'Do you offer installment payment options?',
    questionBn: 'আপনারা কি কিস্তি পেমেন্ট অপশন অফার করেন?',
    answerEn: 'Yes, we offer EMI (Equal Monthly Installments) on orders above ৳5,000 through select bank cards. EMI options of 3, 6, and 12 months are available at checkout.',
    answerBn: 'হ্যাঁ, আমরা নির্বাচিত ব্যাংক কার্ডের মাধ্যমে ৳৫,০০০ এর বেশি অর্ডারে EMI (সমান মাসিক কিস্তি) অফার করি। চেকআউটে ৩, ৬ এবং ১২ মাসের EMI অপশন পাওয়া যায়।'
  },

  // Care
  {
    id: 20,
    category: 'care',
    questionEn: 'How should I care for my gold jewelry?',
    questionBn: 'আমি কিভাবে আমার সোনার জুয়েলারির যত্ন নেব?',
    answerEn: 'To keep your gold jewelry beautiful:',
    answerBn: 'আপনার সোনার জুয়েলারি সুন্দর রাখতে:',
    listEn: [
      'Remove before swimming, showering, or exercising',
      'Avoid contact with perfumes, lotions, and chemicals',
      'Store in a soft pouch or lined jewelry box',
      'Clean gently with a soft cloth after wearing'
    ],
    listBn: [
      'সাঁতার কাটা, গোসল বা ব্যায়ামের আগে খুলে রাখুন',
      'পারফিউম, লোশন এবং রাসায়নিকের সংস্পর্শ এড়িয়ে চলুন',
      'নরম থলি বা লাইনযুক্ত জুয়েলারি বক্সে সংরক্ষণ করুন',
      'পরার পর নরম কাপড় দিয়ে আলতো করে পরিষ্কার করুন'
    ]
  },
  {
    id: 21,
    category: 'care',
    questionEn: 'How do I clean tarnished silver jewelry?',
    questionBn: 'আমি কিভাবে কালো হয়ে যাওয়া রূপার জুয়েলারি পরিষ্কার করব?',
    answerEn: 'For tarnished silver, you can use a silver polishing cloth or make a paste with baking soda and water. Gently rub, rinse with warm water, and dry thoroughly. For heavy tarnish, use a professional jewelry cleaner.',
    answerBn: 'কালো হয়ে যাওয়া রূপার জন্য, আপনি সিলভার পলিশিং কাপড় ব্যবহার করতে পারেন বা বেকিং সোডা এবং পানি দিয়ে পেস্ট তৈরি করতে পারেন। আলতো করে ঘষুন, গরম পানি দিয়ে ধুয়ে ভালোভাবে শুকিয়ে নিন। ভারী টার্নিশের জন্য, পেশাদার জুয়েলারি ক্লিনার ব্যবহার করুন।'
  },
  {
    id: 22,
    category: 'care',
    questionEn: 'Can I wear my jewelry in the shower?',
    questionBn: 'আমি কি গোসলের সময় আমার জুয়েলারি পরতে পারি?',
    answerEn: 'We recommend removing all jewelry before showering. Water, soap, and shampoo can cause buildup and accelerate tarnishing. This is especially important for gold-plated and silver pieces.',
    answerBn: 'আমরা গোসলের আগে সব জুয়েলারি খুলে রাখার পরামর্শ দিই। পানি, সাবান এবং শ্যাম্পু জমাট বাঁধতে পারে এবং টার্নিশিং ত্বরান্বিত করতে পারে। এটি বিশেষ করে গোল্ড-প্লেটেড এবং সিলভার পিসের জন্য গুরুত্বপূর্ণ।'
  },
  {
    id: 23,
    category: 'care',
    questionEn: 'How should I store my jewelry?',
    questionBn: 'আমি কিভাবে আমার জুয়েলারি সংরক্ষণ করব?',
    answerEn: 'Proper storage helps prevent damage:',
    answerBn: 'সঠিক সংরক্ষণ ক্ষতি প্রতিরোধে সাহায্য করে:',
    listEn: [
      'Store each piece separately to prevent scratching',
      'Use anti-tarnish pouches or strips',
      'Keep away from direct sunlight and moisture',
      'Close clasps before storing to prevent tangling'
    ],
    listBn: [
      'স্ক্র্যাচ প্রতিরোধে প্রতিটি পিস আলাদাভাবে সংরক্ষণ করুন',
      'অ্যান্টি-টার্নিশ থলি বা স্ট্রিপ ব্যবহার করুন',
      'সরাসরি সূর্যালোক এবং আর্দ্রতা থেকে দূরে রাখুন',
      'জট বাঁধা প্রতিরোধে সংরক্ষণের আগে ক্লাস্প বন্ধ করুন'
    ]
  }
]

const popularFaqs = computed(() => {
  return faqs.filter(faq => faq.popular).slice(0, 5)
})

const filteredFaqs = computed(() => {
  let result = faqs
  
  // Filter by category
  if (activeCategory.value !== 'all') {
    result = result.filter(faq => faq.category === activeCategory.value)
  }
  
  // Filter by search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(faq => 
      faq.questionEn.toLowerCase().includes(query) ||
      faq.questionBn.includes(searchQuery.value) ||
      faq.answerEn.toLowerCase().includes(query) ||
      faq.answerBn.includes(searchQuery.value)
    )
  }
  
  return result
})

function toggleFaq(id) {
  const index = openFaqs.value.indexOf(id)
  if (index === -1) {
    openFaqs.value.push(id)
  } else {
    openFaqs.value.splice(index, 1)
  }
}

function getCategoryName(categoryId) {
  const category = categories.find(c => c.id === categoryId)
  return category ? t(category.nameEn, category.nameBn) : ''
}

function scrollToFaq(id) {
  activeCategory.value = 'all'
  searchQuery.value = ''
  
  if (!openFaqs.value.includes(id)) {
    openFaqs.value.push(id)
  }
  
  // Scroll to the FAQ item
  setTimeout(() => {
    const element = document.querySelector(`.faq-item:nth-child(${faqs.findIndex(f => f.id === id) + 1})`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, 100)
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
  margin: 0 auto 30px;
}

/* Search Box */
.search-box {
  max-width: 500px;
  margin: 0 auto;
  position: relative;
}

.search-box i {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
}

.search-box input {
  width: 100%;
  padding: 18px 20px 18px 55px;
  border: 2px solid #eee;
  border-radius: 50px;
  font-size: 16px;
  transition: var(--transition-smooth);
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary-gold);
  box-shadow: 0 0 0 5px rgba(212, 175, 55, 0.1);
}

/* Category Filter */
.category-filter {
  padding: 30px 0;
}

.filter-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 2px solid #eee;
  border-radius: 50px;
  background: var(--white);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.filter-btn:hover {
  border-color: var(--primary-gold);
}

.filter-btn.active {
  background: var(--primary-gold);
  border-color: var(--primary-gold);
  color: var(--white);
}

/* FAQ Section */
.faq-section {
  padding: 40px 0 80px;
}

.faq-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;
  align-items: start;
}

/* FAQ List */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.faq-item {
  background: var(--white);
  border-radius: 15px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: var(--transition-smooth);
}

.faq-item:hover {
  box-shadow: var(--shadow-md);
}

.faq-item.open {
  box-shadow: var(--shadow-md);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px;
  cursor: pointer;
  gap: 20px;
}

.question-content {
  flex: 1;
}

.category-badge {
  display: inline-block;
  padding: 4px 12px;
  background: var(--primary-light);
  border-radius: 20px;
  font-size: 12px;
  color: var(--primary-gold);
  font-weight: 600;
  margin-bottom: 8px;
}

.faq-question h3 {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
}

.toggle-icon {
  width: 35px;
  height: 35px;
  background: var(--primary-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: var(--transition-smooth);
}

.faq-item.open .toggle-icon {
  background: var(--primary-gold);
  color: var(--white);
}

.faq-answer {
  padding: 0 25px 25px;
  color: var(--text-light);
  line-height: 1.8;
}

.answer-list {
  margin-top: 15px;
}

.answer-list ul {
  padding-left: 20px;
}

.answer-list li {
  padding: 5px 0;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 60px 20px;
  background: var(--white);
  border-radius: 15px;
}

.no-results i {
  font-size: 50px;
  color: var(--text-light);
  opacity: 0.5;
  margin-bottom: 20px;
}

.no-results h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.no-results p {
  color: var(--text-light);
}

/* Sidebar */
.faq-sidebar {
  position: sticky;
  top: 120px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar-card {
  background: var(--white);
  border-radius: 15px;
  padding: 25px;
  box-shadow: var(--shadow-sm);
}

.sidebar-card h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  margin-bottom: 20px;
}

.sidebar-card h3 i {
  color: var(--primary-gold);
}

/* Quick Links */
.quick-links {
  list-style: none;
}

.quick-links li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.quick-links li:last-child {
  border-bottom: none;
}

.quick-links a {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-dark);
  text-decoration: none;
  transition: var(--transition-smooth);
}

.quick-links a:hover {
  color: var(--primary-gold);
}

.quick-links i {
  width: 20px;
  color: var(--text-light);
}

/* Contact Card */
.contact-card p {
  color: var(--text-light);
  margin-bottom: 20px;
}

.contact-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  background: var(--primary-light);
  border-radius: 10px;
  text-decoration: none;
  color: var(--text-dark);
  transition: var(--transition-smooth);
}

.contact-btn:hover {
  background: var(--primary-gold);
  color: var(--white);
}

/* Popular Questions */
.popular-questions {
  list-style: none;
}

.popular-questions li {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  color: var(--text-light);
  font-size: 14px;
  transition: var(--transition-smooth);
}

.popular-questions li:hover {
  color: var(--primary-gold);
}

.popular-questions li:last-child {
  border-bottom: none;
}

/* CTA Section */
.cta-section {
  padding: 60px 0;
  background: var(--primary-light);
}

.cta-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  background: linear-gradient(135deg, var(--primary-gold), var(--accent));
  border-radius: 20px;
  padding: 50px;
  color: var(--white);
}

.cta-content h2 {
  font-family: var(--font-primary);
  font-size: 32px;
  margin-bottom: 10px;
}

.cta-content p {
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 15px;
}

/* Buttons */
.btn {
  padding: 15px 30px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: var(--transition-smooth);
  text-decoration: none;
  white-space: nowrap;
}

.btn-primary {
  background: var(--white);
  color: var(--primary-gold);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--white);
  color: var(--white);
}

.btn-outline:hover {
  background: var(--white);
  color: var(--primary-gold);
}

/* Animations */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
}

.fade-in-right {
  opacity: 0;
  transform: translateX(30px);
  animation: fadeInRight 0.8s ease forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInRight {
  to { opacity: 1; transform: translateX(0); }
}

/* Responsive */
@media (max-width: 1024px) {
  .faq-grid {
    grid-template-columns: 1fr;
  }
  
  .faq-sidebar {
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .sidebar-card {
    flex: 1;
    min-width: 280px;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }
  
  .filter-tabs {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 10px;
    flex-wrap: nowrap;
  }
  
  .filter-btn {
    white-space: nowrap;
  }
  
  .cta-card {
    flex-direction: column;
    text-align: center;
    padding: 40px 30px;
  }
  
  .cta-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .cta-buttons .btn {
    justify-content: center;
  }
  
  .faq-sidebar {
    flex-direction: column;
  }
  
  .sidebar-card {
    min-width: auto;
  }
}
</style>
