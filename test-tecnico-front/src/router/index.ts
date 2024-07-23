import { createRouter, createWebHistory } from 'vue-router'

import Home from '../page/Home.vue';
import Login from '../page/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
