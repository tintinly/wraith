import { ref, readonly } from 'vue'

// 模块级状态（单例），判断当前是否为移动端（触屏设备）
const isMobile = ref(false)

function checkMobile() {
  // 触屏 + 无精确指针（鼠标）→ 移动端
  isMobile.value =
    'ontouchstart' in window &&
    window.matchMedia('(pointer: coarse)').matches
}

// 初始化（确保只在客户端执行）
if (typeof window !== 'undefined') {
  checkMobile()
}

export function useDevice() {
  return { isMobile: readonly(isMobile) }
}
