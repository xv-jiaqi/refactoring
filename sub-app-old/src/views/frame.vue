<template>
<div>
  <section class="frame" ref="frame"></section>
</div>
</template>

<script>
import md5 from 'md5';
import BridgeService from '@/bridgeService';

const APP_NAME = process.env.VUE_APP_NAME;

const framePreload = url => {
  const frame = document.createElement('iframe');
  frame.src = url;
  return frame;
};

const styleGradient = {
  width: ['1', '100%'],
  height: ['1', '100%'],
  opacity: [0, 1],
  pointerEvents: ['none', 'auto'],
};

export default {
  name: 'frame',

  data() {
    return {
      isMounted: false,
      routeMode: window.location.hash ? '#' : '',
    };
  },

  computed: {
    handshakeKey() {
      const { username, id } = this.$store.getters['userInfo'];
      return `${id}.${username}`;
    },
  },

  mounted() {
    const frame = framePreload('http://localhost:17081/colgate.html');
    const styleKeys = Object.keys(styleGradient);

    styleKeys.forEach(attr => {
      frame.style[attr] = styleGradient[attr][0];
    });

    Object.assign(frame.style, {
      position: 'fixed',
      overflow: 'hidden',
      willChange: 'transform', // 创建新的渲染层, 增强页面渲染性能
    });

    const iframe = this.$refs.frame.appendChild(frame);

    frame.onload = () => {
      styleKeys.forEach(attr => {
        frame.style[attr] = styleGradient[attr][1];
      });

      const { routeMode } = this;

      const postMessageOpts = {
        receive({ path: state, params }) {
          const hash = md5(`${state}${JSON.stringify(params)}`).substring(0, 5);
          const path = `${routeMode}/${APP_NAME}/${state}/${hash}`;

          window.history.replaceState(params, null, path);
        },
      };

      this.$_brage = new BridgeService(iframe.contentWindow, this.handshakeKey, postMessageOpts);

      this.postMessage(this.$route.params.state);
    };
  },

  watch: {
    $route: {
      handler(newVal, oldVal) {
        // console.log('newVal: ', newVal);
        const { state } = newVal.params;
        this.postMessage(state);
      },
      // immediate: true
    },
  },

  methods: {
    postMessage(state) {
      // console.log('postMessage', state);

      if (this.$_brage) {
        this.$_brage.send(state);
      }
    },
  },
};
</script>

<style scoped>
.frame {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
