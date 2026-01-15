<template>
  <button class="scroll-top" :class="{ active: isVisible }" @click="scrollToTop">
    <i class="fas fa-arrow-up"></i>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

function handleScroll() {
  isVisible.value = window.scrollY > 500
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-gold);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition-smooth);
  z-index: 999;
  box-shadow: var(--shadow-md);
  border: none;
  cursor: pointer;
}

.scroll-top.active {
  opacity: 1;
  visibility: visible;
}

.scroll-top:hover {
  background: var(--accent);
  transform: translateY(-5px);
}
</style>
