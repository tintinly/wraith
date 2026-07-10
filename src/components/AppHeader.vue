<template>
    <div class="flex items-center justify-between">
        <button
            class="absolute top-[5%] right-[5%] rounded-full outline-outline p-2 inline-flex cursor-pointer
                   hover:outline"
            title="切换明暗模式"
            @click="toggle($event, true)"
        >
            <!-- 当前为暗色模式时显示太阳图标（点击切换亮色） -->
            <span v-if="themePreference === 'light'" class="icon-[mynaui--sun] text-amber-500"></span>
            <!-- 当前为亮色模式时显示月亮图标（点击切换暗色） -->
            <span v-else-if="themePreference === 'dark'" class="icon-[mynaui--moon] text-cyan-700"></span>
            <!-- 跟随系统主题 -->
             <span v-else class="icon-[mynaui--circle-half-circle-solid] text-gray-500"></span>
        </button>
    </div>
</template>
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
const { themePreference, toggle } = useTheme()

</script>