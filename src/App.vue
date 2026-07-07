<template>
  <component :is="currentLayout">
    <RouterView />
  </component>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()
// 计算当前应显示的布局组件
const currentLayout = computed(() => {
  return (route.meta.layout as string || 'default') + '-layout'
})
</script>