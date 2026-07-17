<template>
  <div class="d-flex justify-content-center">
    <form @submit.prevent="onLogin" class="card p-4 w-100" style="max-width: 380px;">
      <h1 class="h4 mb-1">Sign in</h1>
      <p class="text-muted small mb-4">to your job tracker</p>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input id="email" v-model="email" type="email" class="form-control" required placeholder="you@example.com" />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input id="password" v-model="password" type="password" class="form-control" required placeholder="••••••••" />
      </div>

      <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>

      <button type="submit" class="btn btn-primary w-100" :disabled="loading">
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </button>

      <p class="text-center text-muted small mt-3 mb-0">
        No account? <router-link to="/register">Register</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth.js'

const email = ref('')
const password = ref('')
const error = ref('')

const { login, loading } = useAuth()

async function onLogin() {
  error.value = ''
  try {
    await login(email.value, password.value)
  } catch (err) {
    error.value = err.message
  }
}
</script>
