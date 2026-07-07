import { computed, ref, watchEffect } from 'vue'

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

export function useTheme() {
  function toggle(pref: 'dark' | 'light' | 'system') {
    if (pref === 'system') {
      theme.value = getInitialTheme()
      themePreference.value = 'system'
    } else {
      theme.value = pref
      themePreference.value = pref
    }
  }

  function setTheme(t: 'dark' | 'light') {
    theme.value = t
  }

  return { theme, themePreference, toggle, setTheme }
}
