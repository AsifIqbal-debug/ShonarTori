<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-logo">
            <i class="fas fa-gem"></i>
            <span>ShonarTori</span>
          </div>
          <p>{{ t('Crafting timeless elegance since 2010', '২০১০ সাল থেকে চিরন্তন কমনীয়তা তৈরি করছি') }}</p>
          <div class="footer-social">
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="#" aria-label="Pinterest"><i class="fab fa-pinterest-p"></i></a>
          </div>
        </div>
        
        <div class="footer-section">
          <h4>{{ t('Quick Links', 'দ্রুত লিংক') }}</h4>
          <ul>
            <li><router-link to="/#home">{{ t('Home', 'হোম') }}</router-link></li>
            <li><router-link to="/#categories">{{ t('Categories', 'ক্যাটাগরি') }}</router-link></li>
            <li><router-link to="/#products">{{ t('Products', 'পণ্য') }}</router-link></li>
            <li><router-link to="/#about">{{ t('About', 'আমাদের সম্পর্কে') }}</router-link></li>
            <li><router-link to="/#contact">{{ t('Contact', 'যোগাযোগ') }}</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>{{ t('Customer Service', 'গ্রাহক সেবা') }}</h4>
          <ul>
            <li><router-link to="/track-order">{{ t('Track Order', 'অর্ডার ট্র্যাক করুন') }}</router-link></li>
            <li><router-link to="/shipping-info">{{ t('Shipping Info', 'শিপিং তথ্য') }}</router-link></li>
            <li><router-link to="/return-policy">{{ t('Return Policy', 'রিটার্ন নীতি') }}</router-link></li>
            <li><router-link to="/size-guide">{{ t('Size Guide', 'সাইজ গাইড') }}</router-link></li>
            <li><router-link to="/faq">{{ t('FAQ', 'প্রশ্নোত্তর') }}</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>{{ t('Contact Info', 'যোগাযোগের তথ্য') }}</h4>
          <ul class="contact-list">
            <li>
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ t('Mirpur 10 BFC, Dhaka, Bangladesh', 'মিরপুর ১০ বিএফসি, ঢাকা, বাংলাদেশ') }}</span>
            </li>
            <li>
              <i class="fas fa-phone"></i>
              <span>+880 1234-567890</span>
            </li>
            <li>
              <i class="fas fa-envelope"></i>
              <span>info@shonartori.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 Nexily. {{ t('All rights reserved.', 'সর্বস্বত্ব সংরক্ষিত।') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()
const { t } = languageStore
</script>

<style scoped>
.footer {
  background: var(--primary-dark);
  color: var(--white);
  padding: 60px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h4 {
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 600;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-primary);
  font-size: 24px;
  margin-bottom: 15px;
}

.footer-logo i {
  font-size: 28px;
  color: var(--primary-gold);
}

.footer-section p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin-bottom: 20px;
}

.footer-social {
  display: flex;
  gap: 10px;
}

.footer-social a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-smooth);
  color: inherit;
  text-decoration: none;
}

.footer-social a:hover {
  background: var(--primary-gold);
  transform: translateY(-3px);
}

.footer-section ul {
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li a {
  color: rgba(255, 255, 255, 0.7);
  transition: var(--transition-smooth);
  text-decoration: none;
}

.footer-section ul li a:hover {
  color: var(--primary-gold);
  padding-left: 5px;
}

.contact-list li {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.contact-list i {
  color: var(--primary-gold);
  margin-top: 3px;
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
