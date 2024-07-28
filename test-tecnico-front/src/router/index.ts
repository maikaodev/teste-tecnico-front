import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../app/Home.vue';
import Dashboard from '../app/Dashboard.vue';
import Auth from '../app/Auth.vue';
import LoggedLayout from '../layouts/LoggedLayout.vue';
import { useAuthStore } from '../stores/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LoggedLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated()) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

