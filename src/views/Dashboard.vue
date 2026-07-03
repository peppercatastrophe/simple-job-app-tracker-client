<template>
  <div>
    <div class="dash-header">
      <h1>Applications</h1>
      <router-link to="/applications/new" class="btn btn-primary">+ New Application</router-link>
    </div>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-else-if="!applications.length" class="empty">
      <p>No job applications yet.</p>
      <router-link to="/applications/new" class="btn btn-primary">Add your first application</router-link>
    </div>

    <div v-else class="app-grid">
      <ApplicationCard v-for="app in applications" :key="app.id" :app="app" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useApplications } from '../composables/useApplications.js'
import ApplicationCard from '../components/ApplicationCard.vue'

const { applications, loading, fetchAll } = useApplications()

onMounted(fetchAll)
</script>

<style scoped>
.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.dash-header h1 {
  margin: 0;
  font-size: 24px;
  color: var(--color-text-primary);
}

.loading {
  text-align: center;
  color: var(--color-text-muted);
  padding: 48px 0;
}

.empty {
  text-align: center;
  padding: 48px 0;
  color: var(--color-text-muted);
}

.empty p {
  margin: 0 0 16px;
}

.app-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
