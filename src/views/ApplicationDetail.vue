<template>
  <div v-if="loading" class="text-center text-muted py-5">Loading...</div>
  <div v-else-if="!app" class="text-center text-muted py-5">Application not found.</div>

  <div v-else>
    <div class="d-flex justify-content-between align-items-start mb-3">
      <div>
        <h1 class="h3 mb-1">{{ app.title }}</h1>
        <p class="text-secondary mb-0">{{ app.company }}</p>
      </div>
      <div class="d-flex gap-2">
        <router-link :to="`/applications/${app.id}/edit`" class="btn btn-outline-secondary">Edit</router-link>
        <button type="button" class="btn btn-outline-danger" @click="onDelete">Delete</button>
      </div>
    </div>

    <div class="d-flex align-items-center gap-2 flex-wrap mb-4">
      <StatusBadge :status="app.status" />
      <span v-if="app.category" class="badge text-bg-light border">{{ app.category }}</span>
      <span v-if="app.apply_date_time" class="badge text-bg-light border">{{ formattedDate }}</span>
    </div>

    <div v-if="app.tech_stack?.length" class="mb-4">
      <h2 class="h6 mb-2">Tech Stack</h2>
      <div class="d-flex flex-wrap gap-2">
        <span v-for="tech in app.tech_stack" :key="tech" class="badge text-bg-light border">{{ tech }}</span>
      </div>
    </div>

    <div v-if="app.description" class="mb-4">
      <h2 class="h6 mb-2">Description</h2>
      <p class="text-secondary" style="white-space: pre-wrap;">{{ app.description }}</p>
    </div>

    <div class="text-muted small">
      <p class="mb-1">Applied: {{ formatDate(app.apply_date_time) }}</p>
      <p class="mb-1">Created: {{ formatDate(app.created_at) }}</p>
      <p class="mb-0">Updated: {{ formatDate(app.updated_at) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApplications } from '../composables/useApplications.js'
import StatusBadge from '../components/StatusBadge.vue'

const route = useRoute()
const router = useRouter()
const { fetchOne, remove } = useApplications()

const app = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    app.value = await fetchOne(route.params.id)
  } catch {
    app.value = null
  }
  loading.value = false
})

const formattedDate = computed(() => {
  if (!app.value?.apply_date_time) return ''
  return new Date(app.value.apply_date_time).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
})

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

async function onDelete() {
  if (!confirm('Delete this application?')) return
  await remove(route.params.id)
  router.push('/')
}
</script>
