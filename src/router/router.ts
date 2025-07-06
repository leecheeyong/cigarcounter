import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import Dashboard from '../views/Dashboard.vue'
import Auth from '../views/Auth.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router