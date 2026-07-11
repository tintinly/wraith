import { nextTick, ref, watchEffect } from 'vue'
const THEME_PREFERENCE_KEY = 'theme-preference'

// 从 localStorage 读取偏好，若无则跟随系统
function getInitialTheme(): 'dark' | 'light' {
  const stored = localStorage.getItem(THEME_PREFERENCE_KEY)
  if (stored === 'dark' || stored === 'light') {
    return stored
  } else if (stored === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
}

function getThemePreference(): 'dark' | 'light' | 'system' {
  const stored = localStorage.getItem(THEME_PREFERENCE_KEY)
  if (stored === 'dark' || stored === 'light') {
    return stored
  } else {
    return 'system'
  }
}

const theme = ref<'dark' | 'light'>(getInitialTheme())
const themePreference = ref<'dark' | 'light' | 'system'>(getThemePreference())

// 应用主题到 DOM
function applyTheme(t: 'dark' | 'light') {
  const el = document.documentElement
  if (t === 'dark') {
    el.classList.add('darkTheme')
  } else {
    el.classList.remove('darkTheme')
  }
  // 设置 color-scheme，影响浏览器原生 UI（滚动条、表单控件等）
  el.style.colorScheme = t
}

// 初始化时立即应用（避免闪烁）
applyTheme(theme.value)

// 监听系统主题变化
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
mediaQuery.addEventListener('change', (e) => {
  // 仅在用户偏好跟随系统或无偏好时，跟随系统
  if (!localStorage.getItem(THEME_PREFERENCE_KEY) || localStorage.getItem(THEME_PREFERENCE_KEY) === 'system') {
    theme.value = e.matches ? 'dark' : 'light'
  }
})

// 响应式同步 DOM 与 localStorage
watchEffect(() => {
  const t = theme.value
  applyTheme(t)
  localStorage.setItem(THEME_PREFERENCE_KEY, themePreference.value)
})

// 检查浏览器是否支持 View Transitions API 且用户未偏好减少动画
const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

export function useTheme() {
  async function toggle(e: MouseEvent, withTransition = false) {
    // 切换主题偏好、计算最终主题值
    const currentPref = themePreference.value
    const currentTheme = theme.value
    if (currentPref === 'system') {
        setThemePreference('light')
        // show('切换为 亮色 模式')
    } else if (currentPref === 'light') {
        setThemePreference('dark')
        // show('切换为 暗色 模式')
    } else if (currentPref === 'dark') {
        setThemePreference('system')
        // show('切换为 跟随系统 模式')
    }
    const finalTheme = themePreference.value === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : themePreference.value
    
    // 应用主题
    if (withTransition && enableTransitions() && currentTheme !== finalTheme) {
      // 带动画过渡 且 浏览器支持 View Transitions API 且 主题有变化
      const x = e.clientX
      const y = e.clientY

      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${Math.hypot(
          Math.max(x, innerWidth - x),
          Math.max(y, innerHeight - y)
        )}px at ${x}px ${y}px)`
      ]

      await document.startViewTransition(async () => {
        setTheme(finalTheme)
        await nextTick()
      }).ready

      document.documentElement.animate(
        { clipPath: finalTheme === 'dark' ? clipPath.reverse() : clipPath },
        {
          duration: 300,
          easing: 'ease-in',
          fill: 'forwards',
          pseudoElement: `::view-transition-${finalTheme === 'dark' ? 'old' : 'new'}(root)`
        }
      )
    } else {
      // 无需动画过渡
      setTheme(finalTheme)
    }
  }

  function setTheme(t: 'dark' | 'light') {
    theme.value = t
  }

  function setThemePreference(t: 'dark' | 'light' | 'system') {
    themePreference.value = t
  }

  return { theme, themePreference, toggle, setTheme }
}
