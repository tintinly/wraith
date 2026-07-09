<template>
  <div class="space-y-2 p-2">
    <p class="leading-relaxed text-foreground-secondary">Here are some of my personal projects.</p>
  </div>
  <div class="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
    <ProjectCard v-for="project in projects" :key="project.projectName" :projectName="project.projectName" :projectDescription="project.projectDescription" :projectLink="project.projectLink" :projectIcon="project.projectIcon" />
  </div>
</template>
<script setup lang="ts">
import ProjectCard from './ProjectCard.vue'
import { projects } from '@/data/projects'
</script>
<style scoped>
</style>
