<template>
  <form @submit.prevent="onSubmit" class="app-form">
    <div class="form-group">
      <label for="title">Title *</label>
      <input id="title" v-model="form.title" type="text" required placeholder="e.g. Senior Frontend Engineer" />
    </div>

    <div class="form-group">
      <label for="company">Company *</label>
      <input id="company" v-model="form.company" type="text" required placeholder="e.g. Acme Corp" />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="category">Category</label>
        <input id="category" v-model="form.category" type="text" placeholder="e.g. Engineering" />
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" v-model="form.status">
          <option value="applied">Applied</option>
          <option value="screening">Screening</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
          <option value="accepted">Accepted</option>
          <option value="withdrawn">Withdrawn</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label for="apply_date">Apply Date</label>
      <input id="apply_date" v-model="applyDate" type="date" />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" v-model="form.description" rows="3" placeholder="Job description, notes..."></textarea>
    </div>

    <div class="form-group">
      <label>Tech Stack</label>
      <div class="tech-input-row">
        <input v-model="newTech" type="text" placeholder="Add a technology" @keydown.enter.prevent="addTech" />
        <button type="button" class="btn btn-secondary" @click="addTech">Add</button>
      </div>
      <div v-if="form.tech_stack?.length" class="tech-list">
        <span v-for="(tech, i) in form.tech_stack" :key="i" class="tech-item">
          {{ tech }}
          <button type="button" class="tech-remove" @click="removeTech(i)">&times;</button>
        </span>
      </div>
    </div>

    <div v-if="error" class="error-msg">{{ error }}</div>

    <div class="form-actions">
      <router-link :to="cancelPath" class="btn btn-ghost">Cancel</router-link>
      <button type="submit" class="btn btn-primary" :disabled="submitting">
        {{ submitting ? 'Saving...' : submitLabel }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'

const props = defineProps({
  initial: { type: Object, default: null },
  submitLabel: { type: String, default: 'Save' },
  cancelPath: { type: String, default: '/' },
})

const emit = defineEmits(['submit'])

const form = reactive({
  title: '',
  company: '',
  category: '',
  status: 'applied',
  description: '',
  tech_stack: [],
})

const applyDate = ref('')
const newTech = ref('')
const submitting = ref(false)
const error = ref('')

watch(() => props.initial, (val) => {
  if (val) {
    form.title = val.title || ''
    form.company = val.company || ''
    form.category = val.category || ''
    form.status = val.status || 'applied'
    form.description = val.description || ''
    form.tech_stack = val.tech_stack ? [...val.tech_stack] : []
    applyDate.value = val.apply_date_time ? val.apply_date_time.slice(0, 10) : ''
  }
}, { immediate: true })

function addTech() {
  const t = newTech.value.trim()
  if (t && !form.tech_stack.includes(t)) {
    form.tech_stack.push(t)
  }
  newTech.value = ''
}

function removeTech(idx) {
  form.tech_stack.splice(idx, 1)
}

async function onSubmit() {
  if (!form.title || !form.company) return
  submitting.value = true
  error.value = ''
  try {
    const payload = {
      title: form.title,
      company: form.company,
      category: form.category || null,
      status: form.status,
      description: form.description || null,
      tech_stack: form.tech_stack.length ? form.tech_stack : null,
      apply_date_time: applyDate.value ? `${applyDate.value}T00:00:00Z` : null,
    }
    emit('submit', payload)
  } catch (err) {
    error.value = err.message
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.app-form {
  max-width: 600px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

input,
select,
textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--color-input-border);
  border-radius: 6px;
  font-size: 14px;
  color: var(--color-text-primary);
  background: var(--color-input-bg);
  box-sizing: border-box;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-focus-ring);
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .form-group {
  flex: 1;
}

.tech-input-row {
  display: flex;
  gap: 8px;
}

.tech-input-row input {
  flex: 1;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.tech-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  background: var(--color-tag-bg);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.tech-remove {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  color: var(--color-text-muted);
  padding: 0;
}

.tech-remove:hover {
  color: var(--color-danger);
}

.form-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 24px;
}

.error-msg {
  color: var(--color-danger);
  font-size: 14px;
  margin-bottom: 12px;
}
</style>
