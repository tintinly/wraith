<template>
  <div class="space-y-2 p-2">
    <h2 class="text-lg font-semibold text-foreground">My stacks</h2>
    <p class="leading-relaxed text-foreground-secondary">Here are some of my skill stacks.</p>
  </div>
  <div class="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
    <div class="flex-1 flex flex-wrap items-center text-2xl justify-center gap-2 p-4 border border-border bg-surface rounded-xl">
      <a v-for="skill in skills" :key="skill.skillName" :href="skill.skillLink" target="_blank" :title="skill.skillName">
        <span :class="theme === 'dark' ? skill.darkIcon || skill.lightIcon : skill.lightIcon" class="block hover:scale-110 transition-transform duration-300 ease-in-out"></span>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { skills } from '@/data/skills'
import { useTheme } from '@/composables/useTheme'
const theme = useTheme().theme
</script>
<style scoped>
</style>
