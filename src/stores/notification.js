import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const message = ref('')
  const type = ref('info') // 'success', 'error', 'info', 'warning'
  const isVisible = ref(false)
  
  function show(msg, notificationType = 'info') {
    message.value = msg
    type.value = notificationType
    isVisible.value = true
    
    setTimeout(() => {
      isVisible.value = false
    }, 3000)
  }

  function success(msg) {
    show(msg, 'success')
  }

  function error(msg) {
    show(msg, 'error')
  }

  function info(msg) {
    show(msg, 'info')
  }

  function warning(msg) {
    show(msg, 'warning')
  }
  
  function hide() {
    isVisible.value = false
  }
  
  return {
    message,
    type,
    isVisible,
    show,
    success,
    error,
    info,
    warning,
    hide
  }
})
