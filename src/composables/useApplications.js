import { ref } from 'vue'
import { get, post, put, del } from '../utils/api.js'

export function useApplications() {
  const applications = ref([])
  const loading = ref(false)

  async function fetchAll() {
    loading.value = true
    try {
      applications.value = await get('/api/applications')
    } finally {
      loading.value = false
    }
  }

  async function fetchOne(id) {
    return get(`/api/applications/${id}`)
  }

  async function create(data) {
    const app = await post('/api/applications', data)
    applications.value.unshift(app)
    return app
  }

  async function update(id, data) {
    const app = await put(`/api/applications/${id}`, data)
    const idx = applications.value.findIndex(a => a.id === id)
    if (idx !== -1) applications.value[idx] = app
    return app
  }

  async function remove(id) {
    await del(`/api/applications/${id}`)
    applications.value = applications.value.filter(a => a.id !== id)
  }

  return { applications, loading, fetchAll, fetchOne, create, update, remove }
}
