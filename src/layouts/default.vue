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
    <DrawerPanel />
  </div>
</template>
<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import ToastNotification from '@/components/ToastNotification.vue'
import DrawerPanel from '@/components/DrawerPanel.vue'
</script>
<style scoped>
</style>