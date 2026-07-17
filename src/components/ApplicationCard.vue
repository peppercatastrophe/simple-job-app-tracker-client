<template>
  <router-link :to="`/applications/${app.id}`" class="card text-decoration-none text-body mb-2 app-card">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start gap-2 mb-1">
        <h3 class="h6 mb-0">{{ app.title }}</h3>
        <StatusBadge :status="app.status" />
      </div>
      <p class="text-secondary small mb-2">{{ app.company }}</p>
      <div class="d-flex gap-3 text-muted small mb-2">
        <span v-if="app.category">{{ app.category }}</span>
        <span v-if="app.apply_date_time">{{ formattedDate }}</span>
      </div>
      <div v-if="app.tech_stack?.length" class="d-flex flex-wrap gap-1">
        <span v-for="tech in app.tech_stack" :key="tech" class="badge text-bg-light border">{{ tech }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
  app: { type: Object, required: true },
})

const formattedDate = computed(() => {
  const d = new Date(props.app.apply_date_time)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
})
</script>

<style scoped>
.app-card {
  transition: box-shadow 0.15s;
}

.app-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
