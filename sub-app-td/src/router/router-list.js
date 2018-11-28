const APP_NAME = process.env.VUE_APP_NAME;

export default [
  {
    path: `/${APP_NAME}`,
    name: APP_NAME,
    component: () => import('@/views/'),
    redirect: {name: `${APP_NAME}.page-a`},
    children: [
      {
        path: 'login',
        name: `${APP_NAME}.page-a`,
        component: () => import('@/views/account/login'),
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
        children: [{
          path: 'test',
          name: 'test',
          meta: {
            auth: '',
          },
          component: () => import('@/views/test/test'),
        }, {
          path: 'first',
          name: 'first',
          meta: {
            auth: '',
          },
          component: () => import('@/views/test/first'),
        }],
      },
    ],
  },
];