const APP_NAME = process.env.VUE_APP_NAME;

import Frame from '@/views/frame';

export default [
  {
    path: `/${APP_NAME}`,
    name: APP_NAME,
    redirect: { name: `${APP_NAME}.page-a` },
    component: {
      template: '<div class="sub-app-old"><keep-alive><router-view /></keep-alive></div>',
    },
    children: [
      {
        path: ':state',
        component: Frame,
      },
    ],
  },
];
