<template>
  <div class="min-h-screen flex flex-col items-center justify-center pb-30">
    <div class="border-3 border-border-secondary rounded-full overflow-hidden">
      <img src="@/assets/avatar.webp" alt="avatar" class="w-26 h-26 rounded-full scale-130">
    </div>
    <h1 class="mt-5 text-xl font-bold">Tintinly</h1>
    <h1 class="mt-5 text-xl text-foreground-secondary">A full-time backend developer</h1>
    <nav class="mt-5 flex items-center justify-center gap-2">
      <a v-for="item in navs" :key="item.name"
        :href="item.href"
        :target="item.external ? '_blank' : undefined"
        :rel="item.external ? 'noopener noreferrer' : undefined"
        class="group px-3 py-2 rounded-full bg-background text-foreground-secondary border border-border inline-flex hover:text-foreground hover:border-border-secondary hover:-translate-y-1 active:bg-background-secondary active:transition-none transition-all duration-300"
      >
        <span :class="item.icon"></span>
        <span class="ml-1">{{ item.name }}</span>
      </a>
    </nav>
    <nav class="mt-5 flex items-center justify-center gap-4">
      <!-- 通过 style 设置自定义变量，绕过 Tailwind 无法识别动态类名的限制 -->
      <a v-for="item in socials" :key="item.title"
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
        :data-title="item.title"
        :style="item.color ? { '--social-color': item.color } : {'--social-color': 'var(--color-foreground)'}"
        class="group rounded-full text-foreground-secondary inline-flex"
      >
        <span :class="item.icon" class="group-hover:text-(--social-color) group-active:text-(--social-color) group-active:transition-none group-hover:scale-110 hover:-translate-y-1 transition-all duration-300"></span>
      </a>
    </nav>
    <div v-if="!isOpen">
      <span class="absolute bottom-8 left-1/2 -translate-x-1/2 icon-[fa7-solid--angle-up] text-xl text-foreground-secondary arrow-move"></span>
      <span class="absolute bottom-8 left-1/2 -translate-x-1/2 icon-[fa7-solid--angle-up] text-xl text-foreground-secondary arrow2-move"></span>
      <span class="absolute bottom-4 left-1/2 -translate-x-1/2 text-foreground-secondary text-sm animate-pulse">{{ isMobile ? 'Slide Up' : 'Wheel Up' }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDrawer } from '@/composables/useDrawer'
import { useDevice } from '@/composables/useDevice'
import { navs } from '@/data/navs'
import { socials } from '@/data/socials'

const { isOpen } = useDrawer()
const { isMobile } = useDevice()
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