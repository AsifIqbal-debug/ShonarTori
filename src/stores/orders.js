import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOrdersStore = defineStore('orders', () => {
  // State
  const orders = ref([])
  const currentOrder = ref(null)

  // Initialize from localStorage
  function initOrders() {
    const savedOrders = localStorage.getItem('shonartori_orders')
    if (savedOrders) {
      orders.value = JSON.parse(savedOrders)
    }
  }

  // Save to localStorage
  function saveOrders() {
    localStorage.setItem('shonartori_orders', JSON.stringify(orders.value))
  }

  // Generate unique order ID
  function generateOrderId() {
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `ST-${timestamp}-${random}`
  }

  // Create new order
  function createOrder(orderData) {
    const order = {
      id: generateOrderId(),
      ...orderData,
      status: 'pending',
      statusHistory: [
        {
          status: 'pending',
          date: new Date().toISOString(),
          message: 'Order placed successfully'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    orders.value.unshift(order)
    currentOrder.value = order
    saveOrders()
    
    return order
  }

  // Get order by ID
  function getOrderById(orderId) {
    return orders.value.find(order => order.id === orderId)
  }

  // Update order status
  function updateOrderStatus(orderId, status, message = '') {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      order.status = status
      order.statusHistory.push({
        status,
        date: new Date().toISOString(),
        message: message || `Order status changed to ${status}`
      })
      order.updatedAt = new Date().toISOString()
      saveOrders()
    }
  }

  // Get orders by status
  const pendingOrders = computed(() => 
    orders.value.filter(o => o.status === 'pending')
  )

  const processingOrders = computed(() => 
    orders.value.filter(o => o.status === 'processing')
  )

  const completedOrders = computed(() => 
    orders.value.filter(o => o.status === 'delivered')
  )

  // Get recent orders
  const recentOrders = computed(() => 
    orders.value.slice(0, 5)
  )

  // Calculate estimated delivery date
  function getEstimatedDelivery(shippingMethod = 'standard') {
    const today = new Date()
    let days = 5 // default standard
    
    switch (shippingMethod) {
      case 'express':
        days = 2
        break
      case 'same-day':
        days = 0
        break
      default:
        days = 5
    }
    
    const deliveryDate = new Date(today)
    deliveryDate.setDate(deliveryDate.getDate() + days)
    return deliveryDate
  }

  // Cancel order
  function cancelOrder(orderId) {
    const order = orders.value.find(o => o.id === orderId)
    if (order && ['pending', 'confirmed'].includes(order.status)) {
      order.status = 'cancelled'
      order.statusHistory.push({
        status: 'cancelled',
        date: new Date().toISOString(),
        message: 'Order cancelled by customer'
      })
      order.updatedAt = new Date().toISOString()
      order.cancelledAt = new Date().toISOString()
      saveOrders()
      return true
    }
    return false
  }

  return {
    orders,
    currentOrder,
    pendingOrders,
    processingOrders,
    completedOrders,
    recentOrders,
    initOrders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
    generateOrderId,
    getEstimatedDelivery
  }
})
