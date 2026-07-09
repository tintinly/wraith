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
  }

  function close() {
    if (!isOpen.value) return
    isOpen.value = false
  }

  function toggle() {
    if (isOpen.value) close()
    else open()
  }

  // ---- Tab 切换 ----
  function switchTab(tab: TabId) {
    currentTab.value = tab
  }

  // ---- 滚轮 + 触摸事件（PC + 移动端） ----
  function initWheelListener() {
    if (wheelCleanup) return

    // PC：滚轮事件
    const wheelHandler = (event: WheelEvent) => {
      if (isOpen.value) {
        // 面板打开时：下滑关闭（面板内容区内的滚动除外）
        if (event.deltaY > 0) {
          const target = event.target as HTMLElement
          const isInContent = target.closest('[data-drawer-content]')
          if (isInContent) return // 面板内容区自然滚动
          close()
          event.preventDefault()
        }
        return
      }

      if (window.scrollY <= 0 && event.deltaY < 0) {
        open()
        event.preventDefault()
      }
    }

    // 移动端：触摸手势
    let touchStartY = 0
    const SWIPE_THRESHOLD = 30 // 最小滑动距离（px）

    const touchStartHandler = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        touchStartY = event.touches[0].clientY
      }
    }

    const touchMoveHandler = (event: TouchEvent) => {
      if (event.touches.length !== 1) return
      const deltaY = event.touches[0].clientY - touchStartY

      if (isOpen.value) {
        // 面板打开时：下滑关闭
        if (deltaY > SWIPE_THRESHOLD) {
          const target = event.target as HTMLElement
          const isInContent = target.closest('[data-drawer-content]')
          if (isInContent) return // 面板内容区自然滚动
          close()
          touchStartY = event.touches[0].clientY // 重置，防止重复触发
        }
        return
      }

      // 面板关闭时：上滑打开
      if (deltaY < -SWIPE_THRESHOLD) {
        open()
        touchStartY = event.touches[0].clientY
      }
    }

    window.addEventListener('wheel', wheelHandler, { passive: false })
    window.addEventListener('touchstart', touchStartHandler, { passive: true })
    window.addEventListener('touchmove', touchMoveHandler, { passive: true })

    wheelCleanup = () => {
      window.removeEventListener('wheel', wheelHandler)
      window.removeEventListener('touchstart', touchStartHandler)
      window.removeEventListener('touchmove', touchMoveHandler)
    }
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
