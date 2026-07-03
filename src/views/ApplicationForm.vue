<template>
  <div>
    <h1>{{ isEdit ? 'Edit Application' : 'New Application' }}</h1>
    <p class="subtitle">{{ isEdit ? 'Update the details below.' : 'Fill in the details of the job you applied for.' }}</p>
    <AppForm
      :initial="existing"
      :submit-label="isEdit ? 'Update' : 'Create'"
      cancel-path="/"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApplications } from '../composables/useApplications.js'
import AppForm from '../components/AppForm.vue'

const route = useRoute()
const router = useRouter()
const { create, update, fetchOne } = useApplications()

const isEdit = computed(() => !!route.params.id)
const existing = ref(null)

onMounted(async () => {
  if (isEdit.value) {
    existing.value = await fetchOne(route.params.id)
  }
})

async function onSubmit(payload) {
  if (isEdit.value) {
    await update(route.params.id, payload)
  } else {
    await create(payload)
  }
  router.push('/')
}
</script>

<style scoped>
h1 {
  margin: 0 0 4px;
  font-size: 24px;
  color: var(--color-text-primary);
}

.subtitle {
  color: var(--color-text-muted);
  font-size: 14px;
  margin: 0 0 24px;
}
</style>
