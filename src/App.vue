<template>
  <div id="app-root" class="min-vh-100">
    <NavBar v-if="isAuthenticated" />
    <main class="container py-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuth } from './composables/useAuth.js'
import { useTheme } from './composables/useTheme.js'
import NavBar from './components/NavBar.vue'

const { isAuthenticated, fetchMe } = useAuth()
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
  fetchMe()
})
</script>
