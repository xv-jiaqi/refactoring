const APP_NAME = process.env.VUE_APP_NAME;

export default [
  {
    path: `/${APP_NAME}`,
    name: APP_NAME,
    component: {
      template: '<router-view />'
    },
    redirect: { name: `${APP_NAME}.test` },
    children: [
      {
        path: 'test',
        name: `${APP_NAME}.test`,
        meta: {
          auth: '',
        },
        component: () => import('@/views/test/test'),
      },
      {
        path: 'redirect',
        name: `${APP_NAME}.redirect`,
        // beforeEnter: (to, from, next) => {
        //   console.log(to, from, next);
        // },
        component: () => import(/* webpackChunkName: "oldFrame", webpackPrefetch: true */ '@/views/test/iframe'),
      },
    ],
  },
];
