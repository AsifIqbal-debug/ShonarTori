import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCheckoutStore = defineStore('checkout', () => {
  // Current checkout step
  const currentStep = ref(1)
  const totalSteps = 3

  // Shipping information
  const shippingInfo = ref({
    fullName: '',
    fullNameBn: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: 'Bangladesh',
    deliveryInstructions: '',
    saveAddress: false
  })

  // Saved addresses
  const savedAddresses = ref([])

  // Payment information
  const paymentMethod = ref('')
  const paymentDetails = ref({
    // bKash/Nagad/Rocket
    mobileNumber: '',
    transactionId: '',
    
    // Bank Transfer
    bankProof: null,
    
    // Card
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: ''
  })

  // Gift options
  const giftOptions = ref({
    isGift: false,
    giftWrap: false,
    giftMessage: ''
  })

  // Order notes
  const orderNotes = ref('')

  // Bangladesh districts
  const bangladeshDistricts = [
    'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh',
    'Comilla', 'Gazipur', 'Narayanganj', 'Tongi', 'Cox\'s Bazar', 'Jessore', 'Dinajpur',
    'Brahmanbaria', 'Bogra', 'Narsingdi', 'Savar', 'Tangail', 'Jamalpur', 'Sirajganj',
    'Nawabganj', 'Naogaon', 'Kushtia', 'Faridpur', 'Pabna', 'Natore', 'Kishoreganj'
  ].sort()

  // Initialize from localStorage
  function initCheckout() {
    const savedShipping = localStorage.getItem('shonartori_shipping')
    if (savedShipping) {
      shippingInfo.value = { ...shippingInfo.value, ...JSON.parse(savedShipping) }
    }

    const savedAddr = localStorage.getItem('shonartori_addresses')
    if (savedAddr) {
      savedAddresses.value = JSON.parse(savedAddr)
    }
  }

  // Save shipping info to localStorage
  function saveShippingInfo() {
    localStorage.setItem('shonartori_shipping', JSON.stringify(shippingInfo.value))
  }

  // Add saved address
  function addSavedAddress(address) {
    const newAddress = {
      id: Date.now(),
      ...address,
      isDefault: savedAddresses.value.length === 0
    }
    savedAddresses.value.push(newAddress)
    localStorage.setItem('shonartori_addresses', JSON.stringify(savedAddresses.value))
  }

  // Remove saved address
  function removeSavedAddress(addressId) {
    savedAddresses.value = savedAddresses.value.filter(a => a.id !== addressId)
    localStorage.setItem('shonartori_addresses', JSON.stringify(savedAddresses.value))
  }

  // Set default address
  function setDefaultAddress(addressId) {
    savedAddresses.value.forEach(a => {
      a.isDefault = a.id === addressId
    })
    localStorage.setItem('shonartori_addresses', JSON.stringify(savedAddresses.value))
  }

  // Load address into form
  function loadAddress(addressId) {
    const address = savedAddresses.value.find(a => a.id === addressId)
    if (address) {
      shippingInfo.value = { ...shippingInfo.value, ...address }
    }
  }

  // Validation functions
  function validatePhone(phone) {
    // Bangladesh phone number format
    const bdPhoneRegex = /^(\+880|880|0)?1[3-9]\d{8}$/
    return bdPhoneRegex.test(phone.replace(/\s|-/g, ''))
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function validatePostalCode(code) {
    // Bangladesh postal codes are 4 digits
    return /^\d{4}$/.test(code)
  }

  function validateCardNumber(number) {
    // Basic card number validation (16 digits)
    const cleaned = number.replace(/\s|-/g, '')
    return /^\d{16}$/.test(cleaned)
  }

  function validateCardExpiry(expiry) {
    // MM/YY format
    const match = expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/)
    if (!match) return false
    
    const month = parseInt(match[1])
    const year = parseInt('20' + match[2])
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1
    
    if (year < currentYear) return false
    if (year === currentYear && month < currentMonth) return false
    
    return true
  }

  function validateCvv(cvv) {
    return /^\d{3,4}$/.test(cvv)
  }

  // Validate current step
  function validateStep(step) {
    const errors = []

    if (step === 1) {
      if (!shippingInfo.value.fullName.trim()) {
        errors.push({ field: 'fullName', message: { en: 'Full name is required', bn: 'পুরো নাম আবশ্যক' } })
      }
      if (!validatePhone(shippingInfo.value.phone)) {
        errors.push({ field: 'phone', message: { en: 'Valid phone number required', bn: 'সঠিক ফোন নম্বর আবশ্যক' } })
      }
      if (!validateEmail(shippingInfo.value.email)) {
        errors.push({ field: 'email', message: { en: 'Valid email required', bn: 'সঠিক ইমেইল আবশ্যক' } })
      }
      if (!shippingInfo.value.addressLine1.trim()) {
        errors.push({ field: 'addressLine1', message: { en: 'Address is required', bn: 'ঠিকানা আবশ্যক' } })
      }
      if (!shippingInfo.value.city) {
        errors.push({ field: 'city', message: { en: 'City is required', bn: 'শহর আবশ্যক' } })
      }
      if (!validatePostalCode(shippingInfo.value.postalCode)) {
        errors.push({ field: 'postalCode', message: { en: 'Valid postal code required', bn: 'সঠিক পোস্টাল কোড আবশ্যক' } })
      }
    }

    if (step === 2) {
      if (!paymentMethod.value) {
        errors.push({ field: 'paymentMethod', message: { en: 'Select a payment method', bn: 'পেমেন্ট পদ্ধতি নির্বাচন করুন' } })
      }

      if (['bkash', 'nagad', 'rocket'].includes(paymentMethod.value)) {
        if (!validatePhone(paymentDetails.value.mobileNumber)) {
          errors.push({ field: 'mobileNumber', message: { en: 'Valid mobile number required', bn: 'সঠিক মোবাইল নম্বর আবশ্যক' } })
        }
      }

      if (paymentMethod.value === 'card') {
        if (!validateCardNumber(paymentDetails.value.cardNumber)) {
          errors.push({ field: 'cardNumber', message: { en: 'Valid card number required', bn: 'সঠিক কার্ড নম্বর আবশ্যক' } })
        }
        if (!validateCardExpiry(paymentDetails.value.cardExpiry)) {
          errors.push({ field: 'cardExpiry', message: { en: 'Valid expiry date required', bn: 'সঠিক মেয়াদ শেষের তারিখ আবশ্যক' } })
        }
        if (!validateCvv(paymentDetails.value.cardCvv)) {
          errors.push({ field: 'cardCvv', message: { en: 'Valid CVV required', bn: 'সঠিক CVV আবশ্যক' } })
        }
        if (!paymentDetails.value.cardName.trim()) {
          errors.push({ field: 'cardName', message: { en: 'Cardholder name required', bn: 'কার্ডধারীর নাম আবশ্যক' } })
        }
      }
    }

    return errors
  }

  // Navigate steps
  function nextStep() {
    if (currentStep.value < totalSteps) {
      currentStep.value++
    }
  }

  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  function goToStep(step) {
    if (step >= 1 && step <= totalSteps) {
      currentStep.value = step
    }
  }

  // Reset checkout
  function resetCheckout() {
    currentStep.value = 1
    paymentMethod.value = ''
    paymentDetails.value = {
      mobileNumber: '',
      transactionId: '',
      bankProof: null,
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      cardName: ''
    }
    giftOptions.value = {
      isGift: false,
      giftWrap: false,
      giftMessage: ''
    }
    orderNotes.value = ''
  }

  return {
    currentStep,
    totalSteps,
    shippingInfo,
    savedAddresses,
    paymentMethod,
    paymentDetails,
    giftOptions,
    orderNotes,
    bangladeshDistricts,
    initCheckout,
    saveShippingInfo,
    addSavedAddress,
    removeSavedAddress,
    setDefaultAddress,
    loadAddress,
    validatePhone,
    validateEmail,
    validatePostalCode,
    validateCardNumber,
    validateCardExpiry,
    validateCvv,
    validateStep,
    nextStep,
    prevStep,
    goToStep,
    resetCheckout
  }
})
