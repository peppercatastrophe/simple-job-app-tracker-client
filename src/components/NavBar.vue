<template>
  <header class="navbar navbar-expand bg-body-tertiary border-bottom sticky-top">
    <div class="container d-flex align-items-center justify-content-between">
      <router-link to="/" class="navbar-brand fw-bold mb-0">Job Tracker</router-link>
      <nav v-if="isAuthenticated" class="d-flex align-items-center gap-2">
        <button
          type="button"
          class="btn btn-outline-secondary btn-sm"
          @click="toggleTheme"
          :title="isDark ? 'Light mode' : 'Dark mode'"
        >
          <i class="bi" :class="isDark ? 'bi-sun' : 'bi-moon'"></i>
        </button>
        <router-link to="/applications/new" class="btn btn-primary btn-sm">+ New</router-link>
        <span class="text-secondary small">{{ user.name }}</span>
        <button type="button" class="btn btn-link btn-sm text-secondary" @click="logout">Logout</button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useAuth } from '../composables/useAuth.js'
import { useTheme } from '../composables/useTheme.js'

const { user, isAuthenticated, logout } = useAuth()
const { isDark, toggleTheme } = useTheme()
</script>
