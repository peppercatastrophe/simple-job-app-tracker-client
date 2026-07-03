<template>
  <router-link :to="`/applications/${app.id}`" class="card">
    <div class="card-body">
      <div class="card-header">
        <h3>{{ app.title }}</h3>
        <StatusBadge :status="app.status" />
      </div>
      <p class="company">{{ app.company }}</p>
      <div class="card-meta">
        <span v-if="app.category">{{ app.category }}</span>
        <span v-if="app.apply_date_time">{{ formattedDate }}</span>
      </div>
      <div v-if="app.tech_stack?.length" class="tech-stack">
        <span v-for="tech in app.tech_stack" :key="tech" class="tech-tag">{{ tech }}</span>
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
.card {
  display: block;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.15s, background 0.2s, border-color 0.2s;
}

.card:hover {
  box-shadow: 0 2px 8px var(--card-shadow);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 4px;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.company {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin: 0 0 8px;
}

.card-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tech-tag {
  display: inline-block;
  padding: 1px 8px;
  background: var(--color-tag-bg);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 11px;
  color: var(--color-text-secondary);
}
</style>
