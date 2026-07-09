<template>
  <Teleport to="body">
    <!-- 遮罩层 -->
    <Transition name="drawer-overlay">
      <div
        v-if="isOpen"
        class="absolute inset-0 z-40 backdrop-blur-[2px]"
        @click="close"
      />
    </Transition>

    <!-- 面板 -->
    <Transition name="drawer-panel">
      <div
        v-if="isOpen"
        class="absolute left-1/2 translate-x-[-50%] h-[65vh] max-h-250 max-w-content flex flex-col rounded-xl border border-border bg-background shadow-2xl z-50
        bottom-1 w-[calc(100%-8px)] sm:bottom-10 sm:w-[calc(100%-80px)] md:bottom-20 md:w-[calc(100%-160px)]"
        @click.stop
      >
        <div v-if="isMobile" class="mx-auto my-1  h-1.5 w-[15%] rounded-full bg-foreground-secondary/30"></div>
        
        <!-- 头部：Tab + 关闭 -->
        <div class="flex shrink-0 items-center px-4 py-3"
          :class="isMobile ? 'justify-center' : 'justify-between'">
          <div ref="tabContainer" class="relative w-full flex gap-4 "
            :class="isMobile ? 'justify-around' : 'justify-start'">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              :ref="(el) => tabRefs[tab.id] = el as HTMLElement"
              class="cursor-pointer rounded-full text-sm font-bold transition-colors duration-200"
              :class="currentTab === tab.id
                ? 'text-foreground'
                : 'text-foreground-secondary hover:text-foreground'"
              @click="switchTab(tab.id)"
            >
              {{ tab.label }}
            </button>
            <!-- 滑动指示器 -->
            <span
              class="absolute -bottom-2 h-0.5 rounded-full bg-foreground-secondary transition-all duration-300"
              :style="indicatorStyle"
            />
          </div>

          <button v-if="!isMobile" 
            class="inline-flex cursor-pointer rounded-full p-1.5 text-foreground-secondary transition-colors duration-200 hover:bg-background-secondary hover:text-foreground active:bg-background-secondary active:text-foreground"
            title="关闭"
            @click="close"
          >
            <span class="icon-[fa7-solid--close] w-5 h-5" />
          </button>
        </div>

        <!-- 内容区：横向滑动切换 -->
        <div ref="scrollContainer" class="flex-1 overflow-x-auto snap-x snap-mandatory scrollbar-none" data-drawer-content flex h-full @scrollend="onContentScrollEnd">
          <div class="flex h-full">
            <div v-for="tab in tabs" :key="tab.id" :ref="(el) => panelRefs[tab.id] = el as HTMLElement"
                 class="w-full shrink-0 snap-start overflow-y-auto p-3 md:p-6 ">
              <DrawerTabStacks v-if="tab.id === 'stacks'" />
              <DrawerTabProjects v-else-if="tab.id === 'projects'" />
              <DrawerTabWebsites v-else-if="tab.id === 'websites'" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useDrawer, type TabId } from '@/composables/useDrawer'
import { useDevice } from '@/composables/useDevice'
import DrawerTabStacks from '@/components/DrawerTabStacks.vue'
import DrawerTabProjects from '@/components/DrawerTabProjects.vue'
import DrawerTabWebsites from '@/components/DrawerTabWebsites.vue'

const { isMobile } = useDevice()

const { isOpen, currentTab, close, switchTab, initWheelListener, destroyWheelListener } = useDrawer()

const tabs: { id: TabId; label: string }[] = [
  { id: 'websites', label: 'Websites' },
  { id: 'projects', label: 'Projects' },
  { id: 'stacks', label: 'Stacks' },
]

const panelRefs = reactive<Record<TabId, HTMLElement | null>>({
  websites: null,
  projects: null,
  stacks: null,
})

const tabRefs = reactive<Record<TabId, HTMLElement | null>>({
  websites: null,
  projects: null,
  stacks: null,
})

const tabContainer = ref<HTMLElement | null>(null)
const scrollContainer = ref<HTMLElement | null>(null)

// 指示器位置样式
const indicatorStyle = reactive({ left: '0px', width: '0px' })

function updateIndicator() {
  const tab = tabRefs[currentTab.value]
  const container = tabContainer.value
  if (!tab || !container) return
  const tabRect = tab.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  indicatorStyle.left = `${tabRect.left - containerRect.left}px`
  indicatorStyle.width = `${tabRect.width}px`
}

// 横滑内容区时同步更新 currentTab
function onContentScrollEnd() {
  const el = scrollContainer.value
  if (!el) return
  const index = Math.round(el.scrollLeft / el.clientWidth)
  const tabId = tabs[index]?.id
  if (tabId) switchTab(tabId)
}

// 滚动到指定 Tab 面板（仅容器内滚动，不影响页面）
function scrollToTab(behavior: ScrollBehavior = 'smooth') {
  const el = scrollContainer.value
  if (!el) return
  const index = tabs.findIndex(t => t.id === currentTab.value)
  if (index === -1) return
  el.scrollTo({ left: index * el.clientWidth, behavior })
}

// currentTab 变化时更新指示器位置，滚动到对应面板
watch(currentTab, () => {
  updateIndicator()
  scrollToTab()
})

// 面板打开后更新指示器 + 恢复滚动位置（此时按钮和容器 DOM 才渲染）
watch(isOpen, (open) => {
  if (open) {
    nextTick(() => {
      updateIndicator()
      scrollToTab('instant')
    })
  }
})

onMounted(() => {
  initWheelListener()
  nextTick(updateIndicator)
})
onUnmounted(() => {
  destroyWheelListener()
})
</script>

<style scoped>
/* 遮罩淡入/淡出 */
.drawer-overlay-enter-active {
  transition: opacity 0.6s ease;
}
.drawer-overlay-leave-active {
  transition: opacity 0.4s ease;
}
.drawer-overlay-enter-from,
.drawer-overlay-leave-to {
  opacity: 0;
}

/* 面板滑入/滑出 */
.drawer-panel-enter-active {
  transition: transform 1s cubic-bezier(0.32, 0.72, 0, 1);
}
.drawer-panel-leave-active {
  transition: transform 0.6s cubic-bezier(0.32, 0.72, 0, 1);
}
.drawer-panel-enter-from,
.drawer-panel-leave-to {
  transform: translateY(calc(100% + 80px));
}
</style>
