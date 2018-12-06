import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'login' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home'),
          redirect: { name: 'home' },
        },
      ],
    },
    {
      path: '*',
      component: () => import('@/views/notFound/'),
    },
  ],
});

export default router;
