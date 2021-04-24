import Vue from 'vue';
import VueRouter from 'vue-router';
import { auth } from '@/firebase';
// import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/Home.vue'),
    meta: {
      requiresAuth: true,
      conditionalRoute: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register/Register.vue'),
  },
  {
    path: '/draw',
    name: 'Draw',
    component: () => import('@/views/Draw/Draw.vue'),
    meta: {
      requiresAuth: true,
      conditionalRoute: true,
    },
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/History/History.vue'),
    meta: {
      requiresAuth: true,
      conditionalRoute: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
