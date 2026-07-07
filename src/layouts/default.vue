<template>
  <div>
    <header>
      <AppHeader />
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <AppFooter />
    </footer>
    <ToastNotification />
  </div>
</template>
<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import ToastNotification from '@/components/ToastNotification.vue'
</script>
<style scoped>
</style>