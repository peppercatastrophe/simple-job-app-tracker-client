<template>
  <header class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="logo">Job Tracker</router-link>
      <nav v-if="isAuthenticated">
        <button class="btn btn-icon theme-btn" @click="toggleTheme" :title="isDark ? 'Light mode' : 'Dark mode'">
          {{ isDark ? '\u2600\uFE0F' : '\uD83C\uDF19' }}
        </button>
        <router-link to="/applications/new" class="btn btn-primary">+ New</router-link>
        <span class="user-name">{{ user.name }}</span>
        <button class="btn btn-ghost" @click="logout">Logout</button>
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

<style scoped>
.navbar {
  background: var(--color-nav-bg);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 10;
  transition: background 0.2s, border-color 0.2s;
}

.navbar-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: 700;
  font-size: 18px;
  color: var(--color-text-primary);
  text-decoration: none;
}

nav {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.theme-btn {
  font-size: 18px;
  padding: 4px 8px;
  line-height: 1;
}
</style>
