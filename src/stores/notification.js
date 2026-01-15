import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const message = ref('')
  const isVisible = ref(false)
  
  function show(msg) {
    message.value = msg
    isVisible.value = true
    
    setTimeout(() => {
      isVisible.value = false
    }, 3000)
  }
  
  function hide() {
    isVisible.value = false
  }
  
  return {
    message,
    isVisible,
    show,
    hide
  }
})
