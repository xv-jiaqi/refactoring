import Vue from 'vue';
import Router from 'vue-router';
import containerHelper from './container-helper';

Vue.use(Router);

const existedRouters = containerHelper.getRoutes();
const router = new Router({
  mode: 'history',
  // base: './gt/',
  routes: existedRouters.concat([
    {
      path: '/',
      redirect: { name: 'home' },
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        auth: '',
      },
      components: {
        login: () => import('@/views/login'),
      },
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        auth: '',
      },
      components: {
        home: () => import('@/views/home'),
      },
    },
    {
      path: '*',
      component: () => import('@/views/notFound'),
    },
  ]),
});

export default router;
