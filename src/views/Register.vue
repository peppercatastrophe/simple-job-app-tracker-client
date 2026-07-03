<template>
  <div class="auth-page">
    <form @submit.prevent="onRegister" class="auth-form">
      <h1>Create account</h1>
      <p class="subtitle">start tracking your job applications</p>

      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="name" type="text" required placeholder="John Doe" />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required placeholder="you@example.com" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required placeholder="••••••••" minlength="6" />
      </div>

      <div v-if="error" class="error-msg">{{ error }}</div>

      <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
        {{ loading ? 'Creating account...' : 'Create account' }}
      </button>

      <p class="auth-link">
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
