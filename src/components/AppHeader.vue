<template>
    <div class="flex items-center justify-between">
        <button
            class="absolute top-[5%] right-[5%] rounded-full outline-outline p-2 inline-flex cursor-pointer
                   hover:outline"
            title="切换明暗模式"
            @click="toggleTheme(themePreference)"
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
import { useToast } from '@/composables/useToast'
const { show } = useToast()

const toggleTheme = (pref: 'dark' | 'light' | 'system') => {
    if (pref === 'system') {
        toggle('light')
        // show('切换为 亮色 模式')
    } else if (pref === 'light') {
        toggle('dark')
        // show('切换为 暗色 模式')
    } else if (pref === 'dark') {
        toggle('system')
        // show('切换为 跟随系统 模式')
    }
}

</script>
<style scoped>
</style>