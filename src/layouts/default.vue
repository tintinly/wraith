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
  </div>
</template>
<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>
<style scoped>
</style>