<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="border-3 border-border-secondary rounded-full overflow-hidden">
      <img src="@/assets/avatar2.png" alt="avatar" class="w-26 h-26 rounded-full scale-130">
    </div>
    <h1 class="mt-5 text-xl font-bold">Tintinly</h1>
    <h1 class="mt-5 text-xl text-foreground-secondary">A full-time backend developer</h1>
    <nav class="mt-5 flex items-center justify-center gap-2">
      <a href="https://github.com/tintinly" target="_blank" rel="noopener noreferrer" 
      class="group px-3 py-2 rounded-full bg-background-secondary text-foreground-secondary border border-border inline-flex hover:text-foreground hover:-translate-y-1 transition-transform duration-300">
        <span class="icon-[fa7-brands--github] group-hover:scale-110 transition-all duration-300"></span>
      </a>
      <a href="https://space.bilibili.com/406137704" target="_blank" rel="noopener noreferrer" 
      class="group px-3 py-2 rounded-full bg-background-secondary text-foreground-secondary border border-border inline-flex hover:text-[#FB7299] hover:-translate-y-0.5 transition-transform duration-300">
        <span class="icon-[fa7-brands--bilibili] group-hover:scale-110 transition-all duration-300"></span>
      </a>
      <a href="https://twitter.com/TintinMrLiu" target="_blank" rel="noopener noreferrer" 
      class="group px-3 py-2 rounded-full bg-background-secondary text-foreground-secondary border border-border inline-flex hover:text-foreground hover:-translate-y-0.5 transition-transform duration-300">
        <span class="icon-[fa7-brands--x-twitter] group-hover:scale-110 transition-all duration-300"></span>
      </a>
      <a href="https://www.youtube.com/@丁丁-i2b" target="_blank" rel="noopener noreferrer" 
      class="group px-3 py-2 rounded-full bg-background-secondary text-foreground-secondary border border-border inline-flex hover:text-[#FF0033] hover:-translate-y-0.5 transition-transform duration-300">
        <span class="icon-[fa7-brands--youtube] group-hover:scale-110 transition-all duration-300"></span>
      </a>
    </nav>
    <div v-if="!isOpen">
      <span class="absolute bottom-8 left-1/2 -translate-x-1/2 icon-[fa7-solid--angle-up] text-xl text-foreground-secondary arrow-move"></span>
      <span class="absolute bottom-8 left-1/2 -translate-x-1/2 icon-[fa7-solid--angle-up] text-xl text-foreground-secondary arrow2-move"></span>
      <span class="absolute bottom-4 left-1/2 -translate-x-1/2 text-foreground-secondary text-sm animate-pulse">Wheel Up</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDrawer } from '@/composables/useDrawer'

const { isOpen } = useDrawer()
</script>
<style scoped>
  .arrow-move {
    animation: arrow-movement 2s ease-in-out infinite;
  }
  .arrow2-move {
    animation: arrow-movement 2s 1s ease-in-out infinite backwards;
  }
  @keyframes arrow-movement {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      bottom: 50px;
    }
  }
</style>