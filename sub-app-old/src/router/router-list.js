const APP_NAME = process.env.VUE_APP_NAME;

import Frame from '@/views/frame';
import BridgeService from '@/bridgeService';

const selector = 'section.frame > iframe';
let frame, bridge;

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
        path: 'frame',
        name: `${APP_NAME}.frame`,
        // component: () =>
        //   import(/* webpackChunkName: "oldFrame", webpackPrefetch: true */ '@/views/frame'),
        component: Frame,
        children: [
          {
            path: 'bridge',
            name: 'bridge',
            beforeEnter: (to) => {
              if (!frame) {
                frame = document.querySelector(selector);
              }

              if (bridge) {
                bridge.send(to.params['0']);
              } else {
                bridge = new BridgeService(frame.contentWindow);
              }
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
