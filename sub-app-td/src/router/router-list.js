const APP_NAME = process.env.VUE_APP_NAME;

export default [
  {
    path: `/${APP_NAME}`,
    name: APP_NAME,
    component: () => import('@/views/'),
    redirect: { name: `${APP_NAME}.page-a`, },
    children: [
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
      {
        path: 'first',
        name: `${APP_NAME}.page-a`,
        meta: {
          auth: '',
        },
        component: () => import('@/views/test/first'),
      },
      {
        path: 'test',
        name: `${APP_NAME}.test`,
        meta: {
          auth: '',
        },
        component: () => import('@/views/test/test'),
      },
    ],
  }
];
