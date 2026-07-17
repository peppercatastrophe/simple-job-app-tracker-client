<template>
  <div class="d-flex justify-content-center">
    <form @submit.prevent="onRegister" class="card p-4 w-100" style="max-width: 380px;">
      <h1 class="h4 mb-1">Create account</h1>
      <p class="text-muted small mb-4">start tracking your job applications</p>

      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input id="name" v-model="name" type="text" class="form-control" required placeholder="John Doe" />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input id="email" v-model="email" type="email" class="form-control" required placeholder="you@example.com" />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input id="password" v-model="password" type="password" class="form-control" required placeholder="••••••••" minlength="6" />
      </div>

      <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>

      <button type="submit" class="btn btn-primary w-100" :disabled="loading">
        {{ loading ? 'Creating account...' : 'Create account' }}
      </button>

      <p class="text-center text-muted small mt-3 mb-0">
        Already have an account? <router-link to="/login">Sign in</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { register, loading } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

async function onRegister() {
  error.value = ''
  try {
    await register(email.value, password.value, name.value)
    router.push('/login')
  } catch (err) {
    error.value = err.message
  }
}
</script>
