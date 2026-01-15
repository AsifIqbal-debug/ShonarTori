<template>
  <!-- Language toggle is now integrated into Navbar -->
  <div class="language-toggle-hidden"></div>
</template>

<script setup>
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()
</script>

<style scoped>
.language-toggle-hidden {
  display: none;
}
</style>
