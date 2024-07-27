import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { useAuthStore } from '../stores/auth';

import Auth from '../app/Auth.vue';
import Home from '../app/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'auth',
    component: Auth,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    next('/');
    return;
  }
  next();
});

export default router;

