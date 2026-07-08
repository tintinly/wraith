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
        class="absolute left-1/2 translate-x-[-50%] h-[70vh] max-h-250 max-w-content flex flex-col rounded-xl border border-border bg-background shadow-2xl z-50
        bottom-1 w-[calc(100%-8px)] sm:bottom-10 sm:w-[calc(100%-80px)] md:bottom-20 md:w-[calc(100%-160px)]"
        @click.stop
      >
        <!-- 头部：Tab + 关闭 -->
        <div class="flex shrink-0 items-center justify-between  px-4 py-3">
          <div class="flex gap-4">
            <button
              v-for="tab in tabs" 
              :key="tab.id"
              class="relative cursor-pointer rounded-full text-sm font-bold transition-colors duration-200 after:absolute after:-bottom-2 after:left-1/2 after:translate-x-[-50%] after:content-[''] after:h-0.5 after:w-[70%] after:bg-foreground-secondary after:rounded-full"
              :class="currentTab === tab.id
                ? 'text-foreground'
                : 'after:hidden text-foreground-secondary hover:text-foreground'"
              @click="switchTab(tab.id)"
            >
              {{ tab.label }}
            </button>
          </div>

          <button
            class="inline-flex cursor-pointer rounded-full p-1.5 text-foreground-secondary transition-colors duration-200 hover:bg-background-secondary hover:text-foreground active:bg-background-secondary active:text-foreground"
            title="关闭"
            @click="close"
          >
            <span class="icon-[fa7-solid--close] w-5 h-5" />
          </button>
        </div>

        <!-- 内容区：横向滑动切换 -->
        <div class="flex-1 overflow-x-auto snap-x snap-mandatory scrollbar-none" data-drawer-content>
          <div class="flex h-full">
            <div v-for="tab in tabs" :key="tab.id" :ref="(el) => panelRefs[tab.id] = el as HTMLElement"
                 class="w-full shrink-0 snap-start overflow-y-auto p-6">
              <DrawerTabAbout v-if="tab.id === 'about'" />
              <DrawerTabProjects v-else-if="tab.id === 'projects'" />
              <DrawerTabContact v-else-if="tab.id === 'contact'" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue'
import { useDrawer, type TabId } from '@/composables/useDrawer'
import DrawerTabAbout from '@/components/DrawerTabAbout.vue'
import DrawerTabProjects from '@/components/DrawerTabProjects.vue'
import DrawerTabContact from '@/components/DrawerTabContact.vue'

const { isOpen, currentTab, close, switchTab: setTab, initWheelListener, destroyWheelListener } = useDrawer()

const tabs: { id: TabId; label: string }[] = [
  { id: 'about', label: '关于我' },
  { id: 'projects', label: '项目' },
  { id: 'contact', label: '联系' },
]

const panelRefs = reactive<Record<TabId, HTMLElement | null>>({
  about: null,
  projects: null,
  contact: null,
})

// 点击 Tab 时滚动到对应面板
function switchTab(tab: TabId) {
  setTab(tab)
  panelRefs[tab]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
}

onMounted(initWheelListener)
onUnmounted(destroyWheelListener)
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
