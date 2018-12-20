import Frame from '@/views/frame';

const APP_NAME = process.env.VUE_APP_NAME;

export default [
  {
    path: `/${APP_NAME}`,
    name: APP_NAME,
    component: {
      template: '<div class="sub-app-old"><keep-alive><router-view /></keep-alive></div>',
    },
    children: [
      {
        path: ':state',
        redirect: { name: `${APP_NAME}.frame` },
      },
      {
        name: `${APP_NAME}.frame`,
        path: ':state/:params?',
        component: Frame,
      },
    ],
  },
];
