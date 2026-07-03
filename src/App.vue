<template>
  <div id="app-root">
    <NavBar v-if="isAuthenticated" />
    <main :class="{ 'with-nav': isAuthenticated }">
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

<style scoped>
#app-root {
  min-height: 100vh;
  background: var(--color-bg);
  transition: background 0.2s;
}

main {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 24px;
}

main.with-nav {
  padding-top: 24px;
}
</style>
