import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../utils/api.js'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/applications/new',
    name: 'NewApplication',
    component: () => import('../views/ApplicationForm.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/applications/:id',
    name: 'ApplicationDetail',
    component: () => import('../views/ApplicationDetail.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/applications/:id/edit',
    name: 'EditApplication',
    component: () => import('../views/ApplicationForm.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if ((to.name === 'Login' || to.name === 'Register') && token) {
    next('/')
  } else {
    next()
  }
})

export default router
