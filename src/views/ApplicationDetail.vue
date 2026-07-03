<template>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else-if="!app" class="empty">Application not found.</div>

  <div v-else class="detail">
    <div class="detail-header">
      <div>
        <h1>{{ app.title }}</h1>
        <p class="company">{{ app.company }}</p>
      </div>
      <div class="detail-actions">
        <router-link :to="`/applications/${app.id}/edit`" class="btn btn-secondary">Edit</router-link>
        <button class="btn btn-danger" @click="onDelete">Delete</button>
      </div>
    </div>

    <div class="meta-row">
      <StatusBadge :status="app.status" />
      <span v-if="app.category" class="meta-chip">{{ app.category }}</span>
      <span v-if="app.apply_date_time" class="meta-chip">{{ formattedDate }}</span>
    </div>

    <div v-if="app.tech_stack?.length" class="section">
      <h2>Tech Stack</h2>
      <div class="tech-stack">
        <span v-for="tech in app.tech_stack" :key="tech" class="tech-tag">{{ tech }}</span>
      </div>
    </div>

    <div v-if="app.description" class="section">
      <h2>Description</h2>
      <p class="description">{{ app.description }}</p>
    </div>

    <div class="section timestamps">
      <p>Applied: {{ formatDate(app.apply_date_time) }}</p>
      <p>Created: {{ formatDate(app.created_at) }}</p>
      <p>Updated: {{ formatDate(app.updated_at) }}</p>
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

<style scoped>
.loading,
.empty {
  text-align: center;
  padding: 48px 0;
  color: var(--color-text-muted);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.detail-header h1 {
  margin: 0;
  font-size: 24px;
  color: var(--color-text-primary);
}

.company {
  color: var(--color-text-secondary);
  margin: 4px 0 0;
  font-size: 16px;
}

.detail-actions {
  display: flex;
  gap: 8px;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.meta-chip {
  font-size: 13px;
  color: var(--color-text-secondary);
  background: var(--color-tag-bg);
  padding: 2px 10px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.section {
  margin-bottom: 24px;
}

.section h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--color-text-primary);
}

.description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-tag {
  display: inline-block;
  padding: 4px 12px;
  background: var(--color-tag-bg);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 13px;
  color: var(--color-text-secondary);
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.timestamps {
  color: var(--color-text-subtle);
  font-size: 13px;
}

.timestamps p {
  margin: 2px 0;
}
</style>
