<template>
  <div class="space-y-4 p-2">
    <p class="leading-relaxed text-foreground-secondary">Here are some of my websites and works.</p>
  </div>
  <div class="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
    <WebsiteCard v-for="website in websites" :key="website.websiteName" :websiteName="website.websiteName" :websiteDescription="website.websiteDescription" :websiteLink="website.websiteLink" :websiteIcon="website.websiteIcon" />
  </div>
</template>
<script setup lang="ts">
import { websites } from '@/data/websites'
import WebsiteCard from '@/components/WebsiteCard.vue'
</script>
