<template>
  <div class="my-orders-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb-section">
      <div class="container">
        <nav class="breadcrumb">
          <router-link to="/">{{ t('home') }}</router-link>
          <i class="fas fa-chevron-right"></i>
          <span>{{ t('myOrders') }}</span>
        </nav>
      </div>
    </div>

    <div class="container">
      <h1 class="page-title">{{ t('myOrders') }}</h1>

      <!-- Empty State -->
      <div v-if="orders.length === 0" class="empty-orders">
        <div class="empty-icon">
          <i class="fas fa-box-open"></i>
        </div>
        <h2>{{ t('noOrders') }}</h2>
        <p>{{ t('noOrdersDesc') }}</p>
        <router-link to="/" class="btn btn-primary">
          <i class="fas fa-shopping-bag"></i> {{ t('startShopping') }}
        </router-link>
      </div>

      <!-- Orders List -->
      <div v-else class="orders-list">
        <div v-for="order in orders" :key="order.id" class="order-card" :class="{ expanded: expandedOrder === order.id }">
          <!-- Order Header -->
          <div class="order-header" @click="toggleOrder(order.id)">
            <div class="order-info">
              <div class="order-id">
                <span class="label">{{ t('orderId') }}</span>
                <span class="value">{{ order.id }}</span>
              </div>
              <div class="order-date">
                <span class="label">{{ t('date') }}</span>
                <span class="value">{{ formatDate(order.createdAt) }}</span>
              </div>
              <div class="order-items-count">
                <span class="label">{{ t('items') }}</span>
                <span class="value">{{ order.items?.length || 0 }}</span>
              </div>
              <div class="order-total">
                <span class="label">{{ t('total') }}</span>
                <span class="value">৳{{ (order.total || 0).toLocaleString() }}</span>
              </div>
            </div>
            <div class="order-status" :class="getStatusClass(order.status)">
              {{ t(order.status || 'pending') }}
            </div>
            <div class="expand-icon">
              <i class="fas" :class="expandedOrder === order.id ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
            </div>
          </div>

          <!-- Order Details (Expanded) -->
          <div v-show="expandedOrder === order.id" class="order-details">
            <!-- Timeline -->
            <div class="order-timeline">
              <h4><i class="fas fa-history"></i> {{ t('orderTimeline') }}</h4>
              <div class="timeline">
                <div class="timeline-item" :class="{ active: isStatusReached(order.status, 'pending') }">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <span class="timeline-title">{{ t('orderPlaced') }}</span>
                    <span class="timeline-date">{{ formatDate(order.createdAt) }}</span>
                  </div>
                </div>
                <div class="timeline-item" :class="{ active: isStatusReached(order.status, 'confirmed') }">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <span class="timeline-title">{{ t('confirmed') }}</span>
                    <span v-if="isStatusReached(order.status, 'confirmed')" class="timeline-date">{{ formatDate(order.confirmedAt) }}</span>
                  </div>
                </div>
                <div class="timeline-item" :class="{ active: isStatusReached(order.status, 'processing') }">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <span class="timeline-title">{{ t('processing') }}</span>
                    <span v-if="isStatusReached(order.status, 'processing')" class="timeline-date">{{ formatDate(order.processingAt) }}</span>
                  </div>
                </div>
                <div class="timeline-item" :class="{ active: isStatusReached(order.status, 'shipped') }">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <span class="timeline-title">{{ t('shipped') }}</span>
                    <span v-if="isStatusReached(order.status, 'shipped')" class="timeline-date">{{ formatDate(order.shippedAt) }}</span>
                  </div>
                </div>
                <div class="timeline-item" :class="{ active: isStatusReached(order.status, 'delivered') }">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <span class="timeline-title">{{ t('delivered') }}</span>
                    <span v-if="isStatusReached(order.status, 'delivered')" class="timeline-date">{{ formatDate(order.deliveredAt) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div class="order-items-section">
              <h4><i class="fas fa-box"></i> {{ t('orderItems') }}</h4>
              <div class="items-list">
                <div v-for="item in order.items" :key="item.itemKey" class="item-row">
                  <div class="item-image">
                    <img v-if="item.image" :src="item.image" :alt="item.name?.[lang] || item.name">
                    <i v-else class="fas fa-gem"></i>
                  </div>
                  <div class="item-info">
                    <h5>{{ item.name?.[lang] || item.name }}</h5>
                    <p>{{ item.category }} - {{ item.type }}</p>
                  </div>
                  <div class="item-qty">× {{ item.quantity }}</div>
                  <div class="item-price">৳{{ (item.price * item.quantity).toLocaleString() }}</div>
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="order-summary-section">
              <div class="summary-grid">
                <div class="summary-card">
                  <h4><i class="fas fa-truck"></i> {{ t('shippingAddress') }}</h4>
                  <p><strong>{{ order.shipping?.fullName }}</strong></p>
                  <p>{{ order.shipping?.address1 }}</p>
                  <p>{{ order.shipping?.city }}, {{ order.shipping?.postalCode }}</p>
                  <p>+880 {{ order.shipping?.phone }}</p>
                </div>
                <div class="summary-card">
                  <h4><i class="fas fa-credit-card"></i> {{ t('payment') }}</h4>
                  <p><strong>{{ getPaymentMethodName(order.paymentMethod) }}</strong></p>
                  <div class="summary-amounts">
                    <div class="amount-row">
                      <span>{{ t('subtotal') }}</span>
                      <span>৳{{ (order.subtotal || 0).toLocaleString() }}</span>
                    </div>
                    <div v-if="order.discount" class="amount-row discount">
                      <span>{{ t('discount') }}</span>
                      <span>-৳{{ order.discount.toLocaleString() }}</span>
                    </div>
                    <div class="amount-row">
                      <span>{{ t('shipping') }}</span>
                      <span>{{ order.shippingCost === 0 ? t('free') : '৳' + order.shippingCost }}</span>
                    </div>
                    <div class="amount-row total">
                      <span>{{ t('total') }}</span>
                      <span>৳{{ (order.total || 0).toLocaleString() }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Actions -->
            <div class="order-actions">
              <button class="btn btn-outline" @click="reorder(order)">
                <i class="fas fa-redo"></i> {{ t('reorder') }}
              </button>
              <router-link :to="`/track-order?id=${order.id}`" class="btn btn-secondary">
                <i class="fas fa-map-marker-alt"></i> {{ t('trackOrder') }}
              </router-link>
              <button v-if="canCancel(order.status)" class="btn btn-danger" @click="cancelOrder(order.id)">
                <i class="fas fa-times"></i> {{ t('cancelOrder') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOrdersStore } from '../stores/orders'
import { useCartStore } from '../stores/cart'
import { useLanguageStore } from '../stores/language'
import { useNotificationStore } from '../stores/notification'

const router = useRouter()
const ordersStore = useOrdersStore()
const cartStore = useCartStore()
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()

const lang = computed(() => languageStore.currentLanguage)
const orders = computed(() => ordersStore.orders || [])
const expandedOrder = ref(null)

const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']

const translations = {
  en: {
    home: 'Home',
    myOrders: 'My Orders',
    noOrders: 'No Orders Yet',
    noOrdersDesc: 'You haven\'t placed any orders yet. Start shopping to see your orders here.',
    startShopping: 'Start Shopping',
    orderId: 'Order ID',
    date: 'Date',
    items: 'Items',
    total: 'Total',
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    orderTimeline: 'Order Timeline',
    orderPlaced: 'Order Placed',
    orderItems: 'Order Items',
    shippingAddress: 'Shipping Address',
    payment: 'Payment Details',
    subtotal: 'Subtotal',
    discount: 'Discount',
    shipping: 'Shipping',
    free: 'FREE',
    reorder: 'Reorder',
    trackOrder: 'Track Order',
    cancelOrder: 'Cancel Order',
    orderCancelled: 'Order cancelled successfully'
  },
  bn: {
    home: 'হোম',
    myOrders: 'আমার অর্ডার',
    noOrders: 'কোনো অর্ডার নেই',
    noOrdersDesc: 'আপনি এখনো কোনো অর্ডার করেননি। শপিং শুরু করুন।',
    startShopping: 'শপিং শুরু করুন',
    orderId: 'অর্ডার আইডি',
    date: 'তারিখ',
    items: 'আইটেম',
    total: 'মোট',
    pending: 'পেন্ডিং',
    confirmed: 'কনফার্মড',
    processing: 'প্রসেসিং',
    shipped: 'শিপড',
    delivered: 'ডেলিভারড',
    cancelled: 'বাতিল',
    orderTimeline: 'অর্ডার টাইমলাইন',
    orderPlaced: 'অর্ডার প্লেসড',
    orderItems: 'অর্ডার আইটেম',
    shippingAddress: 'শিপিং ঠিকানা',
    payment: 'পেমেন্ট বিবরণ',
    subtotal: 'সাবটোটাল',
    discount: 'ছাড়',
    shipping: 'শিপিং',
    free: 'ফ্রি',
    reorder: 'পুনরায় অর্ডার',
    trackOrder: 'অর্ডার ট্র্যাক',
    cancelOrder: 'অর্ডার বাতিল',
    orderCancelled: 'অর্ডার সফলভাবে বাতিল হয়েছে'
  }
}

function t(key) {
  return translations[lang.value]?.[key] || translations.en[key] || key
}

function formatDate(date) {
  if (!date) return '-'
  return new Date(date).toLocaleDateString(lang.value === 'bn' ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function toggleOrder(orderId) {
  expandedOrder.value = expandedOrder.value === orderId ? null : orderId
}

function getStatusClass(status) {
  const classes = {
    pending: 'status-pending',
    confirmed: 'status-confirmed',
    processing: 'status-processing',
    shipped: 'status-shipped',
    delivered: 'status-delivered',
    cancelled: 'status-cancelled'
  }
  return classes[status] || 'status-pending'
}

function isStatusReached(currentStatus, checkStatus) {
  const currentIndex = statusOrder.indexOf(currentStatus)
  const checkIndex = statusOrder.indexOf(checkStatus)
  return currentIndex >= checkIndex
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

function canCancel(status) {
  return ['pending', 'confirmed'].includes(status)
}

function reorder(order) {
  order.items?.forEach(item => {
    cartStore.addItem({
      ...item,
      quantity: item.quantity
    })
  })
  notificationStore.success(lang.value === 'bn' ? 'আইটেম কার্টে যোগ করা হয়েছে' : 'Items added to cart')
  router.push('/cart')
}

function cancelOrder(orderId) {
  if (confirm(lang.value === 'bn' ? 'আপনি কি নিশ্চিত যে অর্ডার বাতিল করতে চান?' : 'Are you sure you want to cancel this order?')) {
    ordersStore.cancelOrder(orderId)
    notificationStore.success(t('orderCancelled'))
  }
}
</script>

<style scoped>
.my-orders-page {
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

/* Empty State */
.empty-orders {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  width: 120px;
  height: 120px;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
}

.empty-icon i {
  font-size: 50px;
  color: #ccc;
}

.empty-orders h2 {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  margin-bottom: 15px;
}

.empty-orders p {
  color: #666;
  margin-bottom: 30px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

/* Orders List */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.order-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 2px 15px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.order-card:hover {
  box-shadow: 0 5px 25px rgba(0,0,0,0.1);
}

.order-card.expanded {
  box-shadow: 0 5px 30px rgba(0,0,0,0.12);
}

/* Order Header */
.order-header {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.order-header:hover {
  background: #fafafa;
}

.order-info {
  display: flex;
  flex: 1;
  gap: 40px;
}

.order-info > div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.order-info .label {
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
}

.order-info .value {
  font-weight: 600;
  color: #333;
}

.order-id .value {
  color: #D4AF37;
}

.order-total .value {
  color: #27ae60;
}

.order-status {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-right: 20px;
}

.status-pending { background: #fff3cd; color: #856404; }
.status-confirmed { background: #d4edda; color: #155724; }
.status-processing { background: #cce5ff; color: #004085; }
.status-shipped { background: #d1ecf1; color: #0c5460; }
.status-delivered { background: #d4edda; color: #155724; }
.status-cancelled { background: #f8d7da; color: #721c24; }

.expand-icon {
  color: #999;
  transition: transform 0.3s ease;
}

.order-card.expanded .expand-icon {
  transform: rotate(180deg);
}

/* Order Details */
.order-details {
  border-top: 1px solid #eee;
  padding: 25px;
  background: #fafafa;
}

/* Timeline */
.order-timeline {
  margin-bottom: 30px;
}

.order-timeline h4 {
  font-size: 16px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.order-timeline h4 i {
  color: #D4AF37;
}

.timeline {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 20px;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 50px;
  right: 50px;
  height: 3px;
  background: #e0e0e0;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 1;
}

.timeline-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e0e0e0;
  border: 3px solid #fafafa;
  transition: all 0.3s ease;
}

.timeline-item.active .timeline-dot {
  background: #27ae60;
}

.timeline-content {
  text-align: center;
}

.timeline-title {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #666;
}

.timeline-item.active .timeline-title {
  color: #27ae60;
}

.timeline-date {
  display: block;
  font-size: 11px;
  color: #999;
  margin-top: 3px;
}

/* Order Items Section */
.order-items-section {
  margin-bottom: 30px;
}

.order-items-section h4 {
  font-size: 16px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.order-items-section h4 i {
  color: #D4AF37;
}

.items-list {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.item-row:last-child {
  border-bottom: none;
}

.item-image {
  width: 60px;
  height: 60px;
  background: #f5f5f5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-image i {
  font-size: 24px;
  color: #D4AF37;
}

.item-info {
  flex: 1;
}

.item-info h5 {
  font-size: 15px;
  margin-bottom: 3px;
}

.item-info p {
  font-size: 13px;
  color: #888;
}

.item-qty {
  color: #666;
  min-width: 50px;
  text-align: center;
}

.item-price {
  font-weight: 600;
  color: #D4AF37;
  min-width: 100px;
  text-align: right;
}

/* Order Summary Section */
.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 25px;
}

.summary-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
}

.summary-card h4 {
  font-size: 14px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.summary-card h4 i {
  color: #D4AF37;
}

.summary-card p {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.summary-amounts {
  margin-top: 15px;
}

.amount-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
}

.amount-row.discount span:last-child {
  color: #27ae60;
}

.amount-row.total {
  border-top: 1px solid #eee;
  margin-top: 10px;
  padding-top: 12px;
  font-weight: 700;
}

.amount-row.total span:last-child {
  color: #D4AF37;
}

/* Order Actions */
.order-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
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

.btn-secondary {
  background: #333;
  color: white;
}

.btn-secondary:hover {
  background: #555;
}

.btn-outline {
  background: transparent;
  border: 2px solid #D4AF37;
  color: #D4AF37;
}

.btn-outline:hover {
  background: #D4AF37;
  color: white;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background: #c0392b;
}

/* Responsive */
@media (max-width: 768px) {
  .order-info {
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .order-info > div {
    min-width: 80px;
  }
  
  .order-status {
    order: 5;
    width: 100%;
    text-align: center;
    margin: 10px 0 0 0;
  }
  
  .expand-icon {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  
  .order-header {
    flex-wrap: wrap;
    position: relative;
  }
  
  .summary-grid {
    grid-template-columns: 1fr;
  }
  
  .timeline {
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .timeline::before {
    display: none;
  }
  
  .order-actions {
    flex-direction: column;
  }
  
  .btn {
    justify-content: center;
  }
}
</style>
