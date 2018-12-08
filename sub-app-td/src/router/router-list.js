const APP_NAME = process.env.VUE_APP_NAME;

export default [
  {
    path: `/${APP_NAME}`,
    name: APP_NAME,
    component: () => import('@/views/index.vue'),
    redirect: { name: `${APP_NAME}.page-first`, },
    children: [
      {
        path: 'first',
        name: `${APP_NAME}.page-first`,
        meta: {
          auth: '',
        },
        component: () => import('@/views/test/test'),
      },
      {
        path: 'second',
        name: `${APP_NAME}.page-second`,
        meta: {
          auth: '',
        },
        component: {
          template: '<div>second</div>'
        },
      },
      {
        path: 'redirect',
        name: `${APP_NAME}.redirect`,
        // beforeEnter: (to, from, next) => {
        //   console.log(to, from, next);
        // },
        component: () => import(
          /* webpackChunkName: "test123", webpackPrefetch: true */
          '@/views/test/iframe'
        ),
      },
    ],
  }
];
