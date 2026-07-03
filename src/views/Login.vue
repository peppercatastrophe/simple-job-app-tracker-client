<template>
  <div class="auth-page">
    <form @submit.prevent="onLogin" class="auth-form">
      <h1>Sign in</h1>
      <p class="subtitle">to your job tracker</p>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required placeholder="you@example.com" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required placeholder="••••••••" />
      </div>

      <div v-if="error" class="error-msg">{{ error }}</div>

      <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </button>

      <p class="auth-link">
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

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  padding-top: 80px;
}

.auth-form {
  width: 100%;
  max-width: 380px;
  background: var(--color-surface);
  padding: 32px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition: background 0.2s, border-color 0.2s;
}

h1 {
  margin: 0 0 4px;
  font-size: 24px;
  color: var(--color-text-primary);
}

.subtitle {
  color: var(--color-text-muted);
  margin: 0 0 24px;
  font-size: 14px;
}

.auth-link {
  text-align: center;
  font-size: 14px;
  color: var(--color-text-muted);
  margin-top: 16px;
}
</style>
