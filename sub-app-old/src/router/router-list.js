const APP_NAME = process.env.VUE_APP_NAME;
import Frame from '@/views/frame';

export default [
  {
    path: `/${APP_NAME}`,
    name: APP_NAME,
    component: {
      template: '<div class="sub-app-old"><router-view /></div>',
    },
    children: [
      {
        name: `${APP_NAME}.frame`,
        path: ':state/:paramsId?',
        component: Frame,
        meta: {
          keepAlive: true,
        },
      },
    ],
  },
];
