<template>
    <div>
        <a :href="websiteLink" target="_blank" class="group h-full p-8 flex items-center justify-between gap-8 border border-border/50 rounded-xl bg-surface/50 hover:border-border-secondary hover:shadow-lg hover:shadow-border/30 active:border-border-secondary active:shadow-2xl active:shadow-border transition-all duration-300">
            <span :class="websiteIcon" class="text-3xl"></span>
            <div class="flex-1 flex flex-col gap-1 items-start">
                <div>
                    <span class="font-bold after:icon-[fa7-solid--angle-right] after:w-5 after:h-5 after:align-[-4px] after:opacity-0 group-hover:after:opacity-100 group-hover:after:translate-x-1 after:transition-all after:duration-300">{{ websiteName }}</span>
                </div>
                <span class="text-sm text-foreground-secondary line-clamp-2 overflow-hidden">{{ websiteDescription }}</span>
            </div>
        </a>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    websiteName: {
        type: String,
        default: ''
    },
    websiteDescription: {
        type: String,
        default: ''
    },
    websiteLink: {
        type: String,
        default: ''
    },
    websiteIcon: {
        type: String,
        default: ''
    }
})
</script>
<style scoped>
</style>