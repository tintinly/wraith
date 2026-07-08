import { ref, readonly } from 'vue'

export type TabId = 'websites' | 'stacks' | 'projects'

// 模块级状态（单例，所有调用者共享）
const isOpen = ref(false)
const currentTab = ref<TabId>('websites')
let wheelCleanup: (() => void) | null = null

export function useDrawer() {
  // ---- 打开/关闭 ----
  function open() {
    if (isOpen.value) return
    isOpen.value = true
    document.body.style.overflow = 'hidden' // 阻止背景页面滚动
  }

  function close() {
    if (!isOpen.value) return
    isOpen.value = false
    document.body.style.overflow = '' // 恢复背景页面滚动
  }

  function toggle() {
    if (isOpen.value) close()
    else open()
  }

  // ---- Tab 切换 ----
  function switchTab(tab: TabId) {
    currentTab.value = tab
  }

  // ---- 滚轮事件 ----
  function initWheelListener() {
    if (wheelCleanup) return // 防止重复注册

    const handler = (event: WheelEvent) => {
      if (isOpen.value) {
        // 面板打开时：下滑关闭（面板内容区内的滚动除外）
        if (event.deltaY > 0) {
          // const target = event.target as HTMLElement
          // const isInContent = target.closest('[data-drawer-content]')
          // if (isInContent) return // 面板内容区自然滚动
          close()
          event.preventDefault()
        }
        return
      }

      // 面板关闭时：仅在页面顶部 + 上滑时触发打开
      if (window.scrollY <= 0 && event.deltaY < 0) {
        open()
        event.preventDefault()
      }
    }

    window.addEventListener('wheel', handler, { passive: false })
    wheelCleanup = () => window.removeEventListener('wheel', handler)
  }

  function destroyWheelListener() {
    wheelCleanup?.()
    wheelCleanup = null
  }

  return {
    isOpen: readonly(isOpen),
    currentTab: readonly(currentTab),
    open,
    close,
    toggle,
    switchTab,
    initWheelListener,
    destroyWheelListener,
  }
}
