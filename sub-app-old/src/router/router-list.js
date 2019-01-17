import Frame from '@/views/frame';

const APP_NAME = process.env.VUE_APP_NAME;

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
        beforeRouteEnter (to, from, next) {
          console.log('enter: ', to, from);
        },
        beforeRouteLeave (to, from , next) {
          console.log('level: ', to, from);
        },
      },
    ],
  },
];
