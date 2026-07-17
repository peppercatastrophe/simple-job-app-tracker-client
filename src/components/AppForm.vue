<template>
  <form @submit.prevent="onSubmit" class="mw-600">
    <div class="mb-3">
      <label for="title" class="form-label">Title *</label>
      <input id="title" v-model="form.title" type="text" class="form-control" required placeholder="e.g. Senior Frontend Engineer" />
    </div>

    <div class="mb-3">
      <label for="company" class="form-label">Company *</label>
      <input id="company" v-model="form.company" type="text" class="form-control" required placeholder="e.g. Acme Corp" />
    </div>

    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="category" class="form-label">Category</label>
        <input id="category" v-model="form.category" type="text" class="form-control" placeholder="e.g. Engineering" />
      </div>
      <div class="col-md-6 mb-3">
        <label for="status" class="form-label">Status</label>
        <select id="status" v-model="form.status" class="form-select">
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

    <div class="mb-3">
      <label for="apply_date" class="form-label">Apply Date</label>
      <input id="apply_date" v-model="applyDate" type="date" class="form-control" />
    </div>

    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea id="description" v-model="form.description" class="form-control" rows="3" placeholder="Job description, notes..."></textarea>
    </div>

    <div class="mb-3">
      <label class="form-label">Tech Stack</label>
      <div class="input-group mb-2">
        <input v-model="newTech" type="text" class="form-control" placeholder="Add a technology" @keydown.enter.prevent="addTech" />
        <button type="button" class="btn btn-outline-secondary" @click="addTech">Add</button>
      </div>
      <div v-if="form.tech_stack?.length" class="d-flex flex-wrap gap-2">
        <span
          v-for="(tech, i) in form.tech_stack"
          :key="i"
          class="badge text-bg-light border d-inline-flex align-items-center gap-1"
        >
          {{ tech }}
          <button type="button" class="btn-close" style="font-size: 0.6rem;" aria-label="Remove" @click="removeTech(i)"></button>
        </span>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>

    <div class="d-flex gap-2 justify-content-end mt-4">
      <router-link :to="cancelPath" class="btn btn-link text-secondary">Cancel</router-link>
      <button type="submit" class="btn btn-primary" :disabled="submitting">
        {{ submitting ? 'Saving...' : submitLabel }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

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
