<template>
  <Transition name="notification">
    <div v-if="notificationStore.isVisible" class="notification">
      {{ notificationStore.message }}
    </div>
  </Transition>
</template>

<script setup>
import { useNotificationStore } from '../stores/notification'

const notificationStore = useNotificationStore()
</script>

<style scoped>
.notification {
  position: fixed;
  top: 100px;
  right: 20px;
  background: var(--primary-gold);
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  z-index: 10000;
}

.notification-enter-active {
  animation: slideInRight 0.3s ease;
}

.notification-leave-active {
  animation: slideOutRight 0.3s ease;
}

@keyframes slideInRight {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
}
</style>
