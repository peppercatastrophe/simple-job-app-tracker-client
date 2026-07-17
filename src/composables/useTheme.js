import { ref, watch } from 'vue'

const STORAGE_KEY = 'job-tracker-theme'

const isDark = ref(false)

function applyTheme(dark) {
  document.documentElement.setAttribute('data-bs-theme', dark ? 'dark' : 'light')
  isDark.value = dark
}

function initTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    applyTheme(stored === 'dark')
  } else {
    applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches)
  }
}

function toggleTheme() {
  applyTheme(!isDark.value)
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
}

export function useTheme() {
  return { isDark, initTheme, toggleTheme }
}
