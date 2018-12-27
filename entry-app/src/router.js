import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  base: './',
  routes: [
    {
      path: '/login',
      name: 'login',
      components: {
        login: () => import('@/views/login/index.vue'),
      },
    },
    {
      path: '/home',
      name: 'home',
      components: {
        default: () => import('@/views/home/index.vue'),
      },
    },
    {
      path: '/',
      redirect: { name: 'login' },
    },
    {
      path: '*',
      component: () => import('@/views/notFound/'),
    },
  ],
});

export default router;
