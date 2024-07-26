import { createRouter, createWebHistory } from 'vue-router'

import Auth from '../app/Auth.vue';
import Home from '../app/Home.vue';

const routes = [
  {
    path: '/',
    name: 'auth',
    component: Auth
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
