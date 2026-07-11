<template>
    <div>
        <a :href="projectLink" target="_blank" class="group h-full p-4 flex items-center justify-between gap-6 border border-border/50 rounded-xl bg-surface/50 hover:border-border-secondary hover:shadow-lg hover:shadow-border/30 active:border-border-secondary active:shadow-2xl active:shadow-border active:transition-none transition-all duration-300">
            <div class="flex-1 flex flex-col gap-1 items-start">
                <div>
                    <span class="font-bold after:icon-[fa7-solid--angle-right] after:w-5 after:h-5 after:align-[-4px] after:opacity-0 group-hover:after:opacity-100 group-hover:after:translate-x-1 after:transition-all after:duration-300">{{ projectName }}</span>
                </div>
                <span class="text-sm text-foreground-secondary line-clamp-2 overflow-hidden">{{ projectDescription }}</span>
            </div>
            <span :class="projectIcon" class="text-3xl group-hover:-rotate-10 group-hover:scale-110 transition-all duration-300"></span>
        </a>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    projectName: {
        type: String,
        default: ''
    },
    projectDescription: {
        type: String,
        default: ''
    },
    projectLink: {
        type: String,
        default: ''
    },
    projectIcon: {
        type: String,
        default: ''
    }
})
</script>
<style scoped>
</style>