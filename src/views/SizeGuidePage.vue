<template>
  <main class="page-content">
    <!-- Breadcrumb -->
    <section class="breadcrumb-section">
      <div class="container">
        <nav class="breadcrumb fade-in-up">
          <router-link to="/">{{ t('Home', 'হোম') }}</router-link>
          <i class="fas fa-chevron-right"></i>
          <span>{{ t('Size Guide', 'সাইজ গাইড') }}</span>
        </nav>
      </div>
    </section>

    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title fade-in-up">{{ t('Jewelry Size Guide', 'জুয়েলারি সাইজ গাইড') }}</h1>
        <p class="page-subtitle fade-in-up delay-1">
          {{ t('Find your perfect fit with our comprehensive sizing guide', 
               'আমাদের ব্যাপক সাইজিং গাইডের সাথে আপনার নিখুঁত ফিট খুঁজুন') }}
        </p>
      </div>
    </section>

    <!-- Size Calculator Tabs -->
    <section class="calculator-section">
      <div class="container">
        <div class="tabs fade-in-up">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            :class="['tab-btn', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            <i :class="tab.icon"></i>
            {{ t(tab.nameEn, tab.nameBn) }}
          </button>
        </div>

        <!-- Ring Size Tab -->
        <div v-show="activeTab === 'ring'" class="tab-content fade-in-up">
          <div class="size-guide-card">
            <h2>{{ t('Ring Size Guide', 'রিং সাইজ গাইড') }}</h2>
            
            <!-- Ring Size Calculator -->
            <div class="calculator-box">
              <h3><i class="fas fa-calculator"></i> {{ t('Ring Size Calculator', 'রিং সাইজ ক্যালকুলেটর') }}</h3>
              <div class="calculator-inputs">
                <div class="input-group">
                  <label>{{ t('Inner Diameter (mm)', 'ভেতরের ব্যাস (মিমি)') }}</label>
                  <input type="number" v-model.number="ringDiameter" step="0.1" min="14" max="24"
                         :placeholder="t('e.g., 17.3', 'যেমন: ১৭.৩')">
                </div>
                <span class="or">{{ t('OR', 'অথবা') }}</span>
                <div class="input-group">
                  <label>{{ t('Inner Circumference (mm)', 'ভেতরের পরিধি (মিমি)') }}</label>
                  <input type="number" v-model.number="ringCircumference" step="0.1" min="44" max="76"
                         :placeholder="t('e.g., 54.4', 'যেমন: ৫৪.৪')">
                </div>
              </div>
              <div v-if="calculatedRingSize" class="calculator-result">
                <div class="result-box">
                  <span class="label">{{ t('Your Ring Size', 'আপনার রিং সাইজ') }}</span>
                  <span class="value">US {{ calculatedRingSize.us }} / UK {{ calculatedRingSize.uk }}</span>
                </div>
              </div>
            </div>

            <!-- Ring Size Chart -->
            <div class="size-chart">
              <h3><i class="fas fa-table"></i> {{ t('Ring Size Chart', 'রিং সাইজ চার্ট') }}</h3>
              <div class="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>{{ t('US Size', 'US সাইজ') }}</th>
                      <th>{{ t('UK Size', 'UK সাইজ') }}</th>
                      <th>{{ t('EU Size', 'EU সাইজ') }}</th>
                      <th>{{ t('Diameter (mm)', 'ব্যাস (মিমি)') }}</th>
                      <th>{{ t('Circumference (mm)', 'পরিধি (মিমি)') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="size in ringSizes" :key="size.us" 
                        :class="{ highlight: calculatedRingSize && calculatedRingSize.us === size.us }">
                      <td>{{ size.us }}</td>
                      <td>{{ size.uk }}</td>
                      <td>{{ size.eu }}</td>
                      <td>{{ size.diameter }}</td>
                      <td>{{ size.circumference }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- How to Measure -->
            <div class="how-to-measure">
              <h3><i class="fas fa-ruler"></i> {{ t('How to Measure Your Ring Size', 'কিভাবে আপনার রিং সাইজ মাপবেন') }}</h3>
              <div class="measure-methods">
                <div class="method">
                  <div class="method-header">
                    <span class="method-number">1</span>
                    <h4>{{ t('Using an Existing Ring', 'বিদ্যমান রিং ব্যবহার করে') }}</h4>
                  </div>
                  <ol>
                    <li>{{ t('Find a ring that fits the desired finger', 'যে আঙুলে পরতে চান সেই আঙুলে মানানসই একটি রিং খুঁজুন') }}</li>
                    <li>{{ t('Measure the inner diameter in mm', 'মিমিতে ভেতরের ব্যাস মাপুন') }}</li>
                    <li>{{ t('Use our calculator above to find your size', 'আপনার সাইজ খুঁজতে উপরের ক্যালকুলেটর ব্যবহার করুন') }}</li>
                  </ol>
                </div>
                <div class="method">
                  <div class="method-header">
                    <span class="method-number">2</span>
                    <h4>{{ t('Using String or Paper', 'সুতা বা কাগজ ব্যবহার করে') }}</h4>
                  </div>
                  <ol>
                    <li>{{ t('Wrap a string or paper strip around your finger', 'আপনার আঙুলের চারপাশে সুতা বা কাগজের স্ট্রিপ মোড়ান') }}</li>
                    <li>{{ t('Mark where the ends meet', 'যেখানে প্রান্তগুলো মিলিত হয় সেখানে চিহ্ন দিন') }}</li>
                    <li>{{ t('Measure the length in mm (this is the circumference)', 'মিমিতে দৈর্ঘ্য মাপুন (এটি পরিধি)') }}</li>
                    <li>{{ t('Enter the measurement in our calculator', 'আমাদের ক্যালকুলেটরে পরিমাপ দিন') }}</li>
                  </ol>
                </div>
              </div>
            </div>

            <!-- Tips -->
            <div class="tips-section">
              <h3><i class="fas fa-lightbulb"></i> {{ t('Sizing Tips', 'সাইজিং টিপস') }}</h3>
              <div class="tips-grid">
                <div v-for="(tip, index) in ringTips" :key="index" class="tip-card">
                  <i :class="tip.icon"></i>
                  <p>{{ t(tip.en, tip.bn) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bracelet Size Tab -->
        <div v-show="activeTab === 'bracelet'" class="tab-content fade-in-up">
          <div class="size-guide-card">
            <h2>{{ t('Bracelet Size Guide', 'ব্রেসলেট সাইজ গাইড') }}</h2>
            
            <!-- Bracelet Size Chart -->
            <div class="size-chart">
              <h3><i class="fas fa-table"></i> {{ t('Bracelet Size Chart', 'ব্রেসলেট সাইজ চার্ট') }}</h3>
              <div class="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>{{ t('Size', 'সাইজ') }}</th>
                      <th>{{ t('Wrist Size (cm)', 'কব্জির সাইজ (সেমি)') }}</th>
                      <th>{{ t('Bracelet Length (cm)', 'ব্রেসলেট দৈর্ঘ্য (সেমি)') }}</th>
                      <th>{{ t('Best For', 'উপযুক্ত') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="size in braceletSizes" :key="size.size">
                      <td><strong>{{ size.size }}</strong></td>
                      <td>{{ size.wrist }}</td>
                      <td>{{ size.bracelet }}</td>
                      <td>{{ t(size.bestForEn, size.bestForBn) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- How to Measure -->
            <div class="how-to-measure">
              <h3><i class="fas fa-ruler"></i> {{ t('How to Measure Your Wrist', 'কিভাবে আপনার কব্জি মাপবেন') }}</h3>
              <div class="measure-steps">
                <div v-for="(step, index) in braceletSteps" :key="index" class="step-item">
                  <div class="step-circle">{{ index + 1 }}</div>
                  <div class="step-content">
                    <h4>{{ t(step.titleEn, step.titleBn) }}</h4>
                    <p>{{ t(step.descEn, step.descBn) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Fit Guide -->
            <div class="fit-guide">
              <h3><i class="fas fa-hand-paper"></i> {{ t('Bracelet Fit Guide', 'ব্রেসলেট ফিট গাইড') }}</h3>
              <div class="fit-options">
                <div v-for="fit in braceletFits" :key="fit.type" class="fit-card">
                  <div class="fit-icon">
                    <i :class="fit.icon"></i>
                  </div>
                  <h4>{{ t(fit.typeEn, fit.typeBn) }}</h4>
                  <p>{{ t(fit.descEn, fit.descBn) }}</p>
                  <span class="add-length">+{{ fit.addCm }} cm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Necklace Size Tab -->
        <div v-show="activeTab === 'necklace'" class="tab-content fade-in-up">
          <div class="size-guide-card">
            <h2>{{ t('Necklace Length Guide', 'নেকলেস দৈর্ঘ্য গাইড') }}</h2>
            
            <!-- Visual Guide -->
            <div class="necklace-visual">
              <div class="visual-diagram">
                <div class="neck-outline">
                  <div v-for="length in necklaceLengths" :key="length.name"
                       class="length-line"
                       :style="{ '--length': length.visual + '%' }"
                       :class="{ active: selectedNecklaceLength === length.name }"
                       @click="selectedNecklaceLength = length.name">
                    <span class="length-label">{{ length.cm }}cm</span>
                  </div>
                </div>
              </div>
              <div class="length-details" v-if="selectedNecklaceInfo">
                <h4>{{ t(selectedNecklaceInfo.nameEn, selectedNecklaceInfo.nameBn) }}</h4>
                <p class="length-cm">{{ selectedNecklaceInfo.cm }} cm / {{ selectedNecklaceInfo.inch }}"</p>
                <p class="length-desc">{{ t(selectedNecklaceInfo.descEn, selectedNecklaceInfo.descBn) }}</p>
              </div>
            </div>

            <!-- Necklace Size Chart -->
            <div class="size-chart">
              <h3><i class="fas fa-table"></i> {{ t('Necklace Length Chart', 'নেকলেস দৈর্ঘ্য চার্ট') }}</h3>
              <div class="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>{{ t('Style', 'স্টাইল') }}</th>
                      <th>{{ t('Length (cm)', 'দৈর্ঘ্য (সেমি)') }}</th>
                      <th>{{ t('Length (inch)', 'দৈর্ঘ্য (ইঞ্চি)') }}</th>
                      <th>{{ t('Sits At', 'যেখানে থাকে') }}</th>
                      <th>{{ t('Best For', 'উপযুক্ত') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="length in necklaceLengths" :key="length.name"
                        :class="{ highlight: selectedNecklaceLength === length.name }"
                        @click="selectedNecklaceLength = length.name">
                      <td><strong>{{ t(length.nameEn, length.nameBn) }}</strong></td>
                      <td>{{ length.cm }}</td>
                      <td>{{ length.inch }}</td>
                      <td>{{ t(length.sitsAtEn, length.sitsAtBn) }}</td>
                      <td>{{ t(length.bestForEn, length.bestForBn) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Layering Tips -->
            <div class="layering-section">
              <h3><i class="fas fa-layer-group"></i> {{ t('Necklace Layering Tips', 'নেকলেস লেয়ারিং টিপস') }}</h3>
              <div class="layering-tips">
                <div v-for="(tip, index) in layeringTips" :key="index" class="layering-tip">
                  <span class="tip-number">{{ index + 1 }}</span>
                  <p>{{ t(tip.en, tip.bn) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bangle Size Tab -->
        <div v-show="activeTab === 'bangle'" class="tab-content fade-in-up">
          <div class="size-guide-card">
            <h2>{{ t('Bangle Size Guide', 'চুড়ি সাইজ গাইড') }}</h2>
            
            <!-- Bangle Calculator -->
            <div class="calculator-box">
              <h3><i class="fas fa-calculator"></i> {{ t('Bangle Size Calculator', 'চুড়ি সাইজ ক্যালকুলেটর') }}</h3>
              <div class="bangle-measure-guide">
                <p>{{ t('Measure your hand at its widest point (thumb tucked in) to find your bangle size.', 
                        'আপনার চুড়ি সাইজ খুঁজতে আপনার হাতের সবচেয়ে চওড়া অংশ মাপুন (বুড়ো আঙুল ভেতরে)।') }}</p>
              </div>
              <div class="calculator-inputs single">
                <div class="input-group">
                  <label>{{ t('Hand Circumference (mm)', 'হাতের পরিধি (মিমি)') }}</label>
                  <input type="number" v-model.number="handCircumference" step="1" min="150" max="250"
                         :placeholder="t('e.g., 200', 'যেমন: ২০০')">
                </div>
              </div>
              <div v-if="calculatedBangleSize" class="calculator-result">
                <div class="result-box">
                  <span class="label">{{ t('Recommended Bangle Diameter', 'প্রস্তাবিত চুড়ি ব্যাস') }}</span>
                  <span class="value">{{ calculatedBangleSize }} mm</span>
                </div>
              </div>
            </div>

            <!-- Bangle Size Chart -->
            <div class="size-chart">
              <h3><i class="fas fa-table"></i> {{ t('Bangle Size Chart', 'চুড়ি সাইজ চার্ট') }}</h3>
              <div class="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>{{ t('Size', 'সাইজ') }}</th>
                      <th>{{ t('Inner Diameter (mm)', 'ভেতরের ব্যাস (মিমি)') }}</th>
                      <th>{{ t('Hand Circumference (mm)', 'হাতের পরিধি (মিমি)') }}</th>
                      <th>{{ t('Fit Type', 'ফিট টাইপ') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="size in bangleSizes" :key="size.size">
                      <td><strong>{{ size.size }}</strong></td>
                      <td>{{ size.diameter }}</td>
                      <td>{{ size.circumference }}</td>
                      <td>{{ t(size.fitEn, size.fitBn) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Measuring Instructions -->
            <div class="how-to-measure bangle-measure">
              <h3><i class="fas fa-hand-paper"></i> {{ t('How to Measure for Bangles', 'চুড়ির জন্য কিভাবে মাপবেন') }}</h3>
              <div class="bangle-steps">
                <div class="bangle-step">
                  <div class="step-image">
                    <i class="fas fa-hand-point-right"></i>
                  </div>
                  <div class="step-text">
                    <h4>{{ t('Step 1: Prepare Your Hand', 'ধাপ ১: আপনার হাত প্রস্তুত করুন') }}</h4>
                    <p>{{ t('Bring your thumb and pinky finger together, making your hand as narrow as possible.', 
                            'আপনার বুড়ো আঙুল এবং কনিষ্ঠ আঙুল একসাথে আনুন, আপনার হাত যতটা সম্ভব সরু করুন।') }}</p>
                  </div>
                </div>
                <div class="bangle-step">
                  <div class="step-image">
                    <i class="fas fa-tape"></i>
                  </div>
                  <div class="step-text">
                    <h4>{{ t('Step 2: Measure', 'ধাপ ২: মাপুন') }}</h4>
                    <p>{{ t('Wrap a measuring tape around the widest part of your hand (usually around the knuckles).', 
                            'আপনার হাতের সবচেয়ে চওড়া অংশের চারপাশে মাপার ফিতা মোড়ান (সাধারণত গাঁটের চারপাশে)।') }}</p>
                  </div>
                </div>
                <div class="bangle-step">
                  <div class="step-image">
                    <i class="fas fa-check-circle"></i>
                  </div>
                  <div class="step-text">
                    <h4>{{ t('Step 3: Find Your Size', 'ধাপ ৩: আপনার সাইজ খুঁজুন') }}</h4>
                    <p>{{ t('Use the measurement in our calculator above or check the size chart.', 
                            'উপরের আমাদের ক্যালকুলেটরে পরিমাপ ব্যবহার করুন বা সাইজ চার্ট দেখুন।') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Printable Guide CTA -->
    <section class="print-section">
      <div class="container">
        <div class="print-card fade-in-up">
          <i class="fas fa-print"></i>
          <div class="print-content">
            <h3>{{ t('Need a Printable Size Guide?', 'প্রিন্টযোগ্য সাইজ গাইড দরকার?') }}</h3>
            <p>{{ t('Download our printable ring sizer and size guide for accurate measurements at home.', 
                    'বাড়িতে সঠিক পরিমাপের জন্য আমাদের প্রিন্টযোগ্য রিং সাইজার এবং সাইজ গাইড ডাউনলোড করুন।') }}</p>
          </div>
          <button class="btn btn-primary" @click="downloadGuide">
            <i class="fas fa-download"></i>
            {{ t('Download PDF', 'পিডিএফ ডাউনলোড করুন') }}
          </button>
        </div>
      </div>
    </section>

    <!-- Help Section -->
    <section class="help-section">
      <div class="container">
        <div class="help-card fade-in-up">
          <i class="fas fa-question-circle"></i>
          <h3>{{ t('Still Not Sure About Your Size?', 'এখনও আপনার সাইজ নিয়ে অনিশ্চিত?') }}</h3>
          <p>{{ t('Our jewelry experts are here to help you find the perfect fit.', 
                  'আমাদের জুয়েলারি বিশেষজ্ঞরা আপনাকে নিখুঁত ফিট খুঁজে পেতে সাহায্য করতে এখানে আছেন।') }}</p>
          <div class="help-options">
            <a href="tel:+8801234567890" class="help-btn">
              <i class="fas fa-phone"></i>
              {{ t('Call Us', 'কল করুন') }}
            </a>
            <a href="mailto:help@shonartori.com" class="help-btn">
              <i class="fas fa-envelope"></i>
              {{ t('Email Us', 'ইমেইল করুন') }}
            </a>
            <button class="help-btn" @click="openChat">
              <i class="fas fa-comments"></i>
              {{ t('Live Chat', 'লাইভ চ্যাট') }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useLanguageStore } from '../stores/language'
import { useNotificationStore } from '../stores/notification'

const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const { t } = languageStore

const activeTab = ref('ring')

const tabs = [
  { id: 'ring', nameEn: 'Rings', nameBn: 'রিং', icon: 'fas fa-ring' },
  { id: 'bracelet', nameEn: 'Bracelets', nameBn: 'ব্রেসলেট', icon: 'fas fa-link' },
  { id: 'necklace', nameEn: 'Necklaces', nameBn: 'নেকলেস', icon: 'fas fa-gem' },
  { id: 'bangle', nameEn: 'Bangles', nameBn: 'চুড়ি', icon: 'fas fa-circle-notch' }
]

// Ring Size Data
const ringDiameter = ref(null)
const ringCircumference = ref(null)

const ringSizes = [
  { us: '4', uk: 'H', eu: '46.5', diameter: '14.9', circumference: '46.8' },
  { us: '5', uk: 'J', eu: '49.3', diameter: '15.7', circumference: '49.3' },
  { us: '6', uk: 'L', eu: '51.9', diameter: '16.5', circumference: '51.9' },
  { us: '7', uk: 'N', eu: '54.4', diameter: '17.3', circumference: '54.4' },
  { us: '8', uk: 'P', eu: '57.0', diameter: '18.1', circumference: '57.0' },
  { us: '9', uk: 'R', eu: '59.5', diameter: '19.0', circumference: '59.5' },
  { us: '10', uk: 'T', eu: '62.1', diameter: '19.8', circumference: '62.1' },
  { us: '11', uk: 'V', eu: '64.6', diameter: '20.6', circumference: '64.6' },
  { us: '12', uk: 'X', eu: '67.2', diameter: '21.4', circumference: '67.2' },
  { us: '13', uk: 'Z', eu: '69.7', diameter: '22.2', circumference: '69.7' }
]

const calculatedRingSize = computed(() => {
  let searchDiameter = null
  
  if (ringDiameter.value) {
    searchDiameter = ringDiameter.value
  } else if (ringCircumference.value) {
    searchDiameter = ringCircumference.value / Math.PI
  }
  
  if (!searchDiameter) return null
  
  // Find closest size
  let closest = ringSizes[0]
  let minDiff = Math.abs(parseFloat(closest.diameter) - searchDiameter)
  
  for (const size of ringSizes) {
    const diff = Math.abs(parseFloat(size.diameter) - searchDiameter)
    if (diff < minDiff) {
      minDiff = diff
      closest = size
    }
  }
  
  return closest
})

// Watch for changes and clear the other field
watch(ringDiameter, (val) => {
  if (val) ringCircumference.value = null
})
watch(ringCircumference, (val) => {
  if (val) ringDiameter.value = null
})

const ringTips = [
  { icon: 'fas fa-sun', en: 'Measure at the end of the day when fingers are largest', bn: 'দিনের শেষে মাপুন যখন আঙুল সবচেয়ে বড় থাকে' },
  { icon: 'fas fa-thermometer-half', en: 'Avoid measuring when hands are cold', bn: 'হাত ঠান্ডা থাকলে মাপা এড়িয়ে চলুন' },
  { icon: 'fas fa-redo', en: 'Measure 3-4 times for accuracy', bn: 'সঠিকতার জন্য ৩-৪ বার মাপুন' },
  { icon: 'fas fa-hand-paper', en: 'Wide bands need a larger size', bn: 'চওড়া ব্যান্ডের জন্য বড় সাইজ দরকার' }
]

// Bracelet Data
const braceletSizes = [
  { size: 'XS', wrist: '13-14', bracelet: '15-16', bestForEn: 'Petite women', bestForBn: 'ছোট মহিলা' },
  { size: 'S', wrist: '14-15', bracelet: '16-17', bestForEn: 'Small women', bestForBn: 'ছোট মহিলা' },
  { size: 'M', wrist: '15-16.5', bracelet: '17-18.5', bestForEn: 'Average women', bestForBn: 'গড় মহিলা' },
  { size: 'L', wrist: '16.5-18', bracelet: '18.5-20', bestForEn: 'Large women/Small men', bestForBn: 'বড় মহিলা/ছোট পুরুষ' },
  { size: 'XL', wrist: '18-20', bracelet: '20-22', bestForEn: 'Average men', bestForBn: 'গড় পুরুষ' },
  { size: 'XXL', wrist: '20+', bracelet: '22+', bestForEn: 'Large men', bestForBn: 'বড় পুরুষ' }
]

const braceletSteps = [
  { titleEn: 'Wrap a tape', titleBn: 'টেপ মোড়ান', descEn: 'Wrap a flexible measuring tape around your wrist just below the wrist bone.', descBn: 'কব্জির হাড়ের ঠিক নিচে আপনার কব্জির চারপাশে নমনীয় মাপার টেপ মোড়ান।' },
  { titleEn: 'Note measurement', titleBn: 'পরিমাপ নোট করুন', descEn: 'Record the measurement in centimeters where the tape meets.', descBn: 'যেখানে টেপ মিলিত হয় সেখানে সেন্টিমিটারে পরিমাপ রেকর্ড করুন।' },
  { titleEn: 'Add for comfort', titleBn: 'আরামের জন্য যোগ করুন', descEn: 'Add 1-2 cm based on your preferred fit (snug, comfort, or loose).', descBn: 'আপনার পছন্দের ফিটের উপর ভিত্তি করে ১-২ সেমি যোগ করুন (টাইট, আরামদায়ক, বা ঢিলা)।' }
]

const braceletFits = [
  { type: 'snug', typeEn: 'Snug Fit', typeBn: 'টাইট ফিট', descEn: 'Sits close to the skin', descBn: 'ত্বকের কাছাকাছি থাকে', addCm: '0.5-1', icon: 'fas fa-compress-arrows-alt' },
  { type: 'comfort', typeEn: 'Comfort Fit', typeBn: 'আরামদায়ক ফিট', descEn: 'Moves slightly on wrist', descBn: 'কব্জিতে সামান্য নড়াচড়া করে', addCm: '1-1.5', icon: 'fas fa-check-circle' },
  { type: 'loose', typeEn: 'Loose Fit', typeBn: 'ঢিলা ফিট', descEn: 'Moves freely on wrist', descBn: 'কব্জিতে স্বাধীনভাবে নড়াচড়া করে', addCm: '2-2.5', icon: 'fas fa-expand-arrows-alt' }
]

// Necklace Data
const selectedNecklaceLength = ref('princess')

const necklaceLengths = [
  { name: 'collar', nameEn: 'Collar', nameBn: 'কলার', cm: 35, inch: 14, visual: 20, sitsAtEn: 'Base of neck', sitsAtBn: 'গলার গোড়ায়', bestForEn: 'V-necks, off-shoulder', bestForBn: 'ভি-নেক, অফ-শোল্ডার', descEn: 'Sits tightly around the neck, perfect for formal occasions.', descBn: 'গলার চারপাশে টাইটলি থাকে, আনুষ্ঠানিক অনুষ্ঠানের জন্য উপযুক্ত।' },
  { name: 'choker', nameEn: 'Choker', nameBn: 'চোকার', cm: 40, inch: 16, visual: 30, sitsAtEn: 'Around throat', sitsAtBn: 'গলার চারপাশে', bestForEn: 'Most necklines', bestForBn: 'অধিকাংশ নেকলাইন', descEn: 'Classic length that works with almost any outfit.', descBn: 'ক্লাসিক দৈর্ঘ্য যা প্রায় যেকোনো পোশাকের সাথে কাজ করে।' },
  { name: 'princess', nameEn: 'Princess', nameBn: 'প্রিন্সেস', cm: 45, inch: 18, visual: 40, sitsAtEn: 'Collarbone', sitsAtBn: 'কলারবোন', bestForEn: 'Most popular, versatile', bestForBn: 'সবচেয়ে জনপ্রিয়, বহুমুখী', descEn: 'The most popular length, sits at the collarbone.', descBn: 'সবচেয়ে জনপ্রিয় দৈর্ঘ্য, কলারবোনে থাকে।' },
  { name: 'matinee', nameEn: 'Matinee', nameBn: 'ম্যাটিনি', cm: 55, inch: 22, visual: 55, sitsAtEn: 'Above bust', sitsAtBn: 'বক্ষের উপরে', bestForEn: 'Business, casual', bestForBn: 'ব্যবসায়িক, ক্যাজুয়াল', descEn: 'Elegant length perfect for professional settings.', descBn: 'পেশাদার পরিবেশের জন্য নিখুঁত মার্জিত দৈর্ঘ্য।' },
  { name: 'opera', nameEn: 'Opera', nameBn: 'অপেরা', cm: 75, inch: 30, visual: 75, sitsAtEn: 'At bust/breastbone', sitsAtBn: 'বক্ষে', bestForEn: 'Evening wear, formal', bestForBn: 'সন্ধ্যার পোশাক, আনুষ্ঠানিক', descEn: 'Long and elegant, can be doubled for a layered look.', descBn: 'লম্বা এবং মার্জিত, লেয়ারড লুকের জন্য দ্বিগুণ করা যায়।' },
  { name: 'rope', nameEn: 'Rope/Lariat', nameBn: 'রোপ/ল্যারিয়াট', cm: 90, inch: 36, visual: 90, sitsAtEn: 'Below bust', sitsAtBn: 'বক্ষের নিচে', bestForEn: 'Statement pieces, creative styling', bestForBn: 'স্টেটমেন্ট পিস, সৃজনশীল স্টাইলিং', descEn: 'Extra long, can be worn multiple ways.', descBn: 'অতিরিক্ত লম্বা, একাধিক উপায়ে পরা যায়।' }
]

const selectedNecklaceInfo = computed(() => {
  return necklaceLengths.find(l => l.name === selectedNecklaceLength.value)
})

const layeringTips = [
  { en: 'Start with a choker or short chain as your base layer', bn: 'আপনার বেস লেয়ার হিসাবে একটি চোকার বা ছোট চেইন দিয়ে শুরু করুন' },
  { en: 'Add 2-3 inches between each layer for visual separation', bn: 'ভিজ্যুয়াল সেপারেশনের জন্য প্রতিটি লেয়ারের মধ্যে ২-৩ ইঞ্চি যোগ করুন' },
  { en: 'Mix chain styles and pendant sizes for interest', bn: 'আগ্রহের জন্য চেইন স্টাইল এবং পেন্ডেন্ট সাইজ মিক্স করুন' },
  { en: 'Keep metals consistent or intentionally mix for contrast', bn: 'ধাতু সামঞ্জস্যপূর্ণ রাখুন বা কন্ট্রাস্টের জন্য ইচ্ছাকৃতভাবে মিক্স করুন' }
]

// Bangle Data
const handCircumference = ref(null)

const bangleSizes = [
  { size: '2-2', diameter: '54', circumference: '170', fitEn: 'Extra Small', fitBn: 'অতিরিক্ত ছোট' },
  { size: '2-4', diameter: '57', circumference: '179', fitEn: 'Small', fitBn: 'ছোট' },
  { size: '2-6', diameter: '60', circumference: '188', fitEn: 'Medium Small', fitBn: 'মাঝারি ছোট' },
  { size: '2-8', diameter: '63', circumference: '198', fitEn: 'Medium', fitBn: 'মাঝারি' },
  { size: '2-10', diameter: '67', circumference: '210', fitEn: 'Medium Large', fitBn: 'মাঝারি বড়' },
  { size: '2-12', diameter: '70', circumference: '220', fitEn: 'Large', fitBn: 'বড়' },
  { size: '2-14', diameter: '73', circumference: '229', fitEn: 'Extra Large', fitBn: 'অতিরিক্ত বড়' }
]

const calculatedBangleSize = computed(() => {
  if (!handCircumference.value) return null
  // Diameter = circumference / π
  return Math.round(handCircumference.value / Math.PI)
})

// Functions
function downloadGuide() {
  notificationStore.show(t('Size guide PDF will be downloaded shortly!', 'সাইজ গাইড পিডিএফ শীঘ্রই ডাউনলোড হবে!'))
}

function openChat() {
  notificationStore.show(t('Live chat feature coming soon!', 'লাইভ চ্যাট ফিচার শীঘ্রই আসছে!'))
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

/* Calculator Section */
.calculator-section {
  padding: 40px 0 80px;
}

/* Tabs */
.tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  border: 2px solid #eee;
  border-radius: 50px;
  background: var(--white);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.tab-btn:hover {
  border-color: var(--primary-gold);
}

.tab-btn.active {
  background: var(--primary-gold);
  border-color: var(--primary-gold);
  color: var(--white);
}

.tab-btn i {
  font-size: 18px;
}

/* Size Guide Card */
.size-guide-card {
  background: var(--white);
  border-radius: 20px;
  padding: 50px;
  box-shadow: var(--shadow-md);
}

.size-guide-card h2 {
  font-family: var(--font-primary);
  font-size: 32px;
  text-align: center;
  margin-bottom: 40px;
}

.size-guide-card h3 {
  font-size: 22px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.size-guide-card h3 i {
  color: var(--primary-gold);
}

/* Calculator Box */
.calculator-box {
  background: var(--primary-light);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 40px;
}

.calculator-inputs {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
}

.calculator-inputs.single {
  max-width: 400px;
}

.calculator-inputs .or {
  font-weight: 600;
  color: var(--text-light);
  padding-bottom: 15px;
}

.input-group {
  flex: 1;
  min-width: 200px;
}

.input-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
}

.input-group input {
  width: 100%;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  transition: var(--transition-smooth);
}

.input-group input:focus {
  outline: none;
  border-color: var(--primary-gold);
}

.calculator-result {
  margin-top: 25px;
  text-align: center;
}

.result-box {
  display: inline-block;
  background: var(--white);
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
}

.result-box .label {
  display: block;
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 5px;
}

.result-box .value {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-gold);
}

/* Size Chart Table */
.size-chart {
  margin-bottom: 40px;
}

.table-wrapper {
  overflow-x: auto;
}

.table-wrapper table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.table-wrapper th,
.table-wrapper td {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.table-wrapper th {
  background: var(--primary-light);
  font-weight: 600;
}

.table-wrapper tr:hover {
  background: rgba(212, 175, 55, 0.05);
}

.table-wrapper tr.highlight {
  background: rgba(212, 175, 55, 0.15);
}

.table-wrapper tr.highlight td {
  font-weight: 600;
}

/* How to Measure */
.how-to-measure {
  margin-bottom: 40px;
}

.measure-methods {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.method {
  background: var(--primary-light);
  border-radius: 15px;
  padding: 25px;
}

.method-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.method-number {
  width: 35px;
  height: 35px;
  background: var(--primary-gold);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.method h4 {
  font-size: 18px;
}

.method ol {
  padding-left: 20px;
  color: var(--text-light);
}

.method li {
  padding: 8px 0;
}

/* Measure Steps */
.measure-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  background: var(--primary-light);
  border-radius: 15px;
}

.step-circle {
  width: 40px;
  height: 40px;
  background: var(--primary-gold);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content h4 {
  margin-bottom: 5px;
}

.step-content p {
  color: var(--text-light);
}

/* Tips Section */
.tips-section {
  margin-bottom: 20px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.tip-card {
  text-align: center;
  padding: 25px 15px;
  background: var(--primary-light);
  border-radius: 15px;
}

.tip-card i {
  font-size: 30px;
  color: var(--primary-gold);
  margin-bottom: 15px;
}

.tip-card p {
  font-size: 14px;
  color: var(--text-light);
}

/* Fit Guide */
.fit-guide {
  margin-bottom: 40px;
}

.fit-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.fit-card {
  text-align: center;
  padding: 30px 20px;
  background: var(--primary-light);
  border-radius: 15px;
}

.fit-icon {
  width: 60px;
  height: 60px;
  background: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

.fit-icon i {
  font-size: 24px;
  color: var(--primary-gold);
}

.fit-card h4 {
  margin-bottom: 10px;
}

.fit-card p {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 15px;
}

.fit-card .add-length {
  display: inline-block;
  padding: 5px 15px;
  background: var(--primary-gold);
  color: var(--white);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

/* Necklace Visual */
.necklace-visual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  margin-bottom: 40px;
  padding: 30px;
  background: var(--primary-light);
  border-radius: 15px;
}

.visual-diagram {
  display: flex;
  justify-content: center;
}

.neck-outline {
  width: 200px;
  height: 300px;
  position: relative;
  background: linear-gradient(to bottom, transparent 0%, var(--white) 30%);
  border-radius: 0 0 100px 100px;
}

.length-line {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 80%;
  height: 2px;
  background: #ccc;
  top: calc(var(--length) * 1%);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.length-line::before {
  content: '';
  position: absolute;
  left: 0;
  top: -4px;
  width: 10px;
  height: 10px;
  background: #ccc;
  border-radius: 50%;
}

.length-line::after {
  content: '';
  position: absolute;
  right: 0;
  top: -4px;
  width: 10px;
  height: 10px;
  background: #ccc;
  border-radius: 50%;
}

.length-line.active {
  background: var(--primary-gold);
}

.length-line.active::before,
.length-line.active::after {
  background: var(--primary-gold);
}

.length-label {
  position: absolute;
  right: -50px;
  top: -10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-light);
}

.length-line.active .length-label {
  color: var(--primary-gold);
}

.length-details {
  text-align: center;
}

.length-details h4 {
  font-size: 24px;
  color: var(--primary-gold);
  margin-bottom: 10px;
}

.length-details .length-cm {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
}

.length-details .length-desc {
  color: var(--text-light);
}

/* Layering Section */
.layering-section {
  margin-bottom: 20px;
}

.layering-tips {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.layering-tip {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: var(--primary-light);
  border-radius: 10px;
}

.tip-number {
  width: 35px;
  height: 35px;
  background: var(--primary-gold);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.layering-tip p {
  color: var(--text-light);
}

/* Bangle Measure */
.bangle-measure-guide {
  text-align: center;
  color: var(--text-light);
  margin-bottom: 20px;
}

.bangle-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.bangle-step {
  display: flex;
  align-items: flex-start;
  gap: 25px;
  padding: 25px;
  background: var(--primary-light);
  border-radius: 15px;
}

.bangle-step .step-image {
  width: 80px;
  height: 80px;
  background: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bangle-step .step-image i {
  font-size: 32px;
  color: var(--primary-gold);
}

.bangle-step .step-text h4 {
  margin-bottom: 10px;
}

.bangle-step .step-text p {
  color: var(--text-light);
}

/* Print Section */
.print-section {
  padding: 40px 0;
}

.print-card {
  display: flex;
  align-items: center;
  gap: 30px;
  background: var(--primary-light);
  padding: 40px;
  border-radius: 20px;
}

.print-card > i {
  font-size: 50px;
  color: var(--primary-gold);
}

.print-content {
  flex: 1;
}

.print-content h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.print-content p {
  color: var(--text-light);
}

/* Help Section */
.help-section {
  padding: 60px 0 80px;
  background: var(--primary-light);
}

.help-card {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  background: var(--white);
  padding: 50px;
  border-radius: 20px;
  box-shadow: var(--shadow-md);
}

.help-card > i {
  font-size: 50px;
  color: var(--primary-gold);
  margin-bottom: 20px;
}

.help-card h3 {
  font-family: var(--font-primary);
  font-size: 28px;
  margin-bottom: 10px;
}

.help-card > p {
  color: var(--text-light);
  margin-bottom: 30px;
}

.help-options {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.help-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 25px;
  background: var(--primary-light);
  border: none;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  color: var(--text-dark);
  transition: var(--transition-smooth);
}

.help-btn:hover {
  background: var(--primary-gold);
  color: var(--white);
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
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.btn-primary {
  background: var(--primary-gold);
  color: var(--white);
}

.btn-primary:hover {
  background: var(--accent);
  transform: translateY(-3px);
}

/* Animations */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
}

.delay-1 { animation-delay: 0.2s; }

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 1024px) {
  .tips-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .fit-options {
    grid-template-columns: 1fr;
  }
  
  .necklace-visual {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }
  
  .tabs {
    flex-direction: column;
  }
  
  .tab-btn {
    justify-content: center;
  }
  
  .size-guide-card {
    padding: 30px 20px;
  }
  
  .measure-methods {
    grid-template-columns: 1fr;
  }
  
  .calculator-inputs {
    flex-direction: column;
    align-items: stretch;
  }
  
  .calculator-inputs .or {
    text-align: center;
    padding: 0;
  }
  
  .print-card {
    flex-direction: column;
    text-align: center;
  }
  
  .print-card .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
