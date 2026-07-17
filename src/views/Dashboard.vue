<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">Applications</h1>
      <router-link to="/applications/new" class="btn btn-primary">+ New Application</router-link>
    </div>

    <div v-if="loading" class="text-center text-muted py-5">Loading...</div>

    <div v-else-if="!applications.length" class="text-center text-muted py-5">
      <p class="mb-3">No job applications yet.</p>
      <router-link to="/applications/new" class="btn btn-primary">Add your first application</router-link>
    </div>

    <div v-else>
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
