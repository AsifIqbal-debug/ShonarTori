<template>
  <section class="contact" id="contact">
    <div class="container">
      <div class="section-header fade-in-up">
        <h2 class="section-title">{{ t('Get In Touch', 'যোগাযোগ করুন') }}</h2>
        <p class="section-subtitle">
          {{ t('We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.', 
               'আমরা আপনার কাছ থেকে শুনতে চাই। আমাদের একটি বার্তা পাঠান এবং আমরা যত তাড়াতাড়ি সম্ভব সাড়া দেব।') }}
        </p>
      </div>
      
      <div class="contact-wrapper">
        <div class="contact-info fade-in-left">
          <div class="info-item">
            <i class="fas fa-map-marker-alt"></i>
            <div>
              <h4>{{ t('Visit Us', 'আমাদের দেখতে আসুন') }}</h4>
              <p>{{ t('Mirpur 10 BFC, Dhaka, Bangladesh', 'মিরপুর ১০ বিএফসি, ঢাকা, বাংলাদেশ') }}</p>
            </div>
          </div>
          <div class="info-item">
            <i class="fas fa-phone"></i>
            <div>
              <h4>{{ t('Call Us', 'আমাদের কল করুন') }}</h4>
              <p>+880 1234-567890</p>
            </div>
          </div>
          <div class="info-item">
            <i class="fas fa-envelope"></i>
            <div>
              <h4>{{ t('Email Us', 'আমাদের ইমেইল করুন') }}</h4>
              <p>info@shonartori.com</p>
            </div>
          </div>
          <div class="social-links">
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="#" aria-label="Pinterest"><i class="fab fa-pinterest-p"></i></a>
          </div>
        </div>
        
        <form class="contact-form fade-in-right" @submit.prevent="handleSubmit">
          <div class="form-group">
            <input 
              type="text" 
              v-model="formData.name"
              :placeholder="t('Your Name', 'আপনার নাম')"
              required
            >
          </div>
          <div class="form-group">
            <input 
              type="email" 
              v-model="formData.email"
              :placeholder="t('Your Email', 'আপনার ইমেইল')"
              required
            >
          </div>
          <div class="form-group">
            <input 
              type="tel" 
              v-model="formData.phone"
              :placeholder="t('Your Phone', 'আপনার ফোন')"
            >
          </div>
          <div class="form-group">
            <textarea 
              rows="5" 
              v-model="formData.message"
              :placeholder="t('Your Message', 'আপনার বার্তা')"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">{{ t('Send Message', 'বার্তা পাঠান') }}</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useLanguageStore } from '../stores/language'
import { useNotificationStore } from '../stores/notification'

const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const { t } = languageStore

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

function handleSubmit() {
  const message = t(
    'Message sent successfully! We will get back to you soon.', 
    'বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।'
  )
  notificationStore.show(message)
  
  // Reset form
  formData.name = ''
  formData.email = ''
  formData.phone = ''
  formData.message = ''
}
</script>

<style scoped>
.contact {
  padding: var(--section-padding);
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-family: var(--font-primary);
  font-size: 48px;
  margin-bottom: 20px;
  color: var(--text-dark);
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--primary-gold);
}

.section-subtitle {
  font-size: 18px;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.info-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.info-item i {
  font-size: 24px;
  color: var(--primary-gold);
  margin-top: 5px;
}

.info-item h4 {
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: 600;
}

.info-item p {
  color: var(--text-light);
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-links a {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-smooth);
  text-decoration: none;
  color: inherit;
}

.social-links a:hover {
  background: var(--primary-gold);
  color: var(--white);
  transform: translateY(-3px);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  width: 100%;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-family: inherit;
  font-size: 16px;
  transition: var(--transition-smooth);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-gold);
}

.form-group textarea {
  resize: vertical;
}

.btn {
  padding: 15px 40px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  transition: var(--transition-smooth);
  border: none;
  cursor: pointer;
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

/* Animation Classes */
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

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 1024px) {
  .contact-wrapper {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 28px;
  }
}
</style>
