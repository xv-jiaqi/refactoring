import Vue from 'vue';
import Router from 'vue-router';
import containerHelper from './container-helper';

Vue.use(Router);

const existedRouters = containerHelper.getRoutes();
const router = new Router({
  // mode: 'history',
  base: './',
  routers: existedRouters.concat([
    {
      path: '/',
      redirect: { name: 'login' },
    },
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
      path: '*',
      component: () => import('@/views/notFound/'),
    },
  ]),
});


// const router = new Router({
//   // mode: 'history',
//   base: './',
//   routes: [
//     {
//       path: '/login',
//       name: 'login',
//       components: {
//         login: () => import('@/views/login/index.vue'),
//       },
//     },
//     {
//       path: '/home',
//       name: 'home',
//       components: {
//         default: () => import('@/views/home/index.vue'),
//       },
//     },
//     {
//       path: '/',
//       redirect: { name: 'login' },
//     },
//     {
//       path: '*',
//       component: () => import('@/views/notFound/'),
//     },
//   ],
// });

export default router;
