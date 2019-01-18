const APP_NAME = process.env.VUE_APP_NAME;

export default [
  {
    path: `/${APP_NAME}`,
    name: APP_NAME,
    component: {
      template: '<router-view />',
    },
    redirect: { name: `${APP_NAME}.role` },
    children: [
      {
        path: 'role/list',
        name: `${APP_NAME}.list`,
        meta: {
          auth: '',
        },
        component: () => import('@/views/role/list'),
      },
      {
        path: 'role/:type/:id?',
        name: `${APP_NAME}.role`,
        meta: {
          auth: '',
        },
        component: () => import('@/views/role/item/'),
      },
    ],
  },
];
