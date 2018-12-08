import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/home',
      name: 'home',
      redirect: { name: 'test' },
      component: { template: '<router-view />' },
      children: [
        {
          path: '/redirect',
          name: 'redirect',
          redirect: { name: '/sub-app-td' },
          children: [
            {
              path: 'red',
              name: 'red',
              redirect: { name: '/sub-app-td' },
              component: {
                template: '<router-view></router-view>',
              },
            },
          ],
        },
      ],
    },
    {
      path: '/',
      redirect: { name: 'home' },
    },
    {
      path: '*',
      component: () => import('@/views/notFound/'),
    },
  ],
});

export default router;
