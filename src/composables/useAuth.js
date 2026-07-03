import { reactive, computed } from 'vue'
import { post, get, setToken, clearToken, getToken } from '../utils/api.js'
import { useRouter } from 'vue-router'

const state = reactive({
  user: null,
  loading: false,
})

export function useAuth() {
  const router = useRouter()

  const user = computed(() => state.user)
  const loading = computed(() => state.loading)
  const isAuthenticated = computed(() => !!state.user)

  async function login(email, password) {
    state.loading = true
    try {
      const data = await post('/api/auth/login', { email, password })
      setToken(data.token)
      state.user = data.user
      router.push('/')
    } catch (err) {
      state.loading = false
      throw err
    }
    state.loading = false
  }

  async function register(email, password, name) {
    state.loading = true
    try {
      const data = await post('/api/auth/register', { email, password, name })
      return data
    } catch (err) {
      state.loading = false
      throw err
    } finally {
      state.loading = false
    }
  }

  async function fetchMe() {
    const token = getToken()
    if (!token) return
    state.loading = true
    try {
      state.user = await get('/api/auth/me')
    } catch {
      clearToken()
      state.user = null
    }
    state.loading = false
  }

  function logout() {
    clearToken()
    state.user = null
    router.push('/login')
  }

  return { user, loading, isAuthenticated, login, register, fetchMe, logout }
}
