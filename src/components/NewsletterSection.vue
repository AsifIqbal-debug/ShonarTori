<template>
  <section class="newsletter">
    <div class="container">
      <div class="newsletter-content fade-in-up">
        <h2>{{ t('Stay Updated', 'আপডেট থাকুন') }}</h2>
        <p>
          {{ t('Subscribe to our newsletter for exclusive offers and new arrivals', 
               'এক্সক্লুসিভ অফার এবং নতুন পণ্যের জন্য আমাদের নিউজলেটার সাবস্ক্রাইব করুন') }}
        </p>
        <form class="newsletter-form" @submit.prevent="handleSubmit">
          <input 
            type="email" 
            v-model="email"
            :placeholder="t('Enter your email address', 'আপনার ইমেইল ঠিকানা লিখুন')"
            required
          >
          <button type="submit">{{ t('Subscribe', 'সাবস্ক্রাইব') }}</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useLanguageStore } from '../stores/language'
import { useNotificationStore } from '../stores/notification'

const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const { t } = languageStore

const email = ref('')

function handleSubmit() {
  if (email.value) {
    const message = t('Thank you for subscribing!', 'সাবস্ক্রাইব করার জন্য ধন্যবাদ!')
    notificationStore.show(message)
    email.value = ''
  }
}
</script>

<style scoped>
.newsletter {
  background: linear-gradient(135deg, var(--primary-gold) 0%, var(--accent) 100%);
  color: var(--white);
  text-align: center;
  padding: 80px 0;
}

.newsletter-content h2 {
  font-family: var(--font-primary);
  font-size: 42px;
  margin-bottom: 15px;
}

.newsletter-content p {
  font-size: 18px;
  margin-bottom: 40px;
  opacity: 0.9;
}

.newsletter-form {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  gap: 10px;
}

.newsletter-form input {
  flex: 1;
  padding: 15px 25px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  outline: none;
}

.newsletter-form button {
  padding: 15px 40px;
  background: var(--white);
  color: var(--primary-gold);
  border-radius: 50px;
  font-weight: 600;
  white-space: nowrap;
  transition: var(--transition-smooth);
  border: none;
  cursor: pointer;
}

.newsletter-form button:hover {
  background: var(--text-dark);
  color: var(--white);
}

/* Animation Classes */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .newsletter-form {
    flex-direction: column;
  }
}
</style>
