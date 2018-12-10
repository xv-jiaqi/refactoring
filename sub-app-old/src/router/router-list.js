const APP_NAME = process.env.VUE_APP_NAME;

export default [
  {
    path: `/${APP_NAME}`,
    name: APP_NAME,
    redirect: { name: `${APP_NAME}.page-a` },
    component: {
      template: '<router-view />',
    },
    children: [
      {
        path: 'frame',
        name: `${APP_NAME}.frame`,
        component: () =>
          import(/* webpackChunkName: "oldFrame", webpackPrefetch: true */ '@/views/frame'),
        children: [
          {
            path: 'bridge',
            name: 'bridge',
            beforeEnter: (to) => {
              const frame = document.querySelector('#old-frame');
              const msg = {
                path: to.params['0'],
                type: 'vue-origin',
              };
              frame.contentWindow.postMessage(msg, '*');
              frame.onload = () => {
                frame.contentWindow.postMessage(msg, '*');
              };
            },
          },
        ],
      },
      {
        path: '*',
        redirect: { name: 'bridge' },
      },
    ],
  },
];
