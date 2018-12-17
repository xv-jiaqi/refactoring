<template>
<div>
  <section class="frame" ref="frame"></section>
</div>
</template>

<script>
import BridgeService from '@/bridgeService';

const framePreload = function (url) {
  const frame = document.createElement('iframe');
  frame.src = url;
  return frame;
};

const styleGradient = {
  width: ['1', '100%'],
  height: ['1', '100%'],
  opacity: [0, 1],
  pointerEvents: ['none', 'auto']
};

export default {
  name: 'frame',

  data() {
    return {
      isMounted: false
    }
  },

  computed: {
    handshakeKey() {
      const { username, id } = this.$store.getters['userInfo'];
      return `${id}.${username}`;
    },
  },

  mounted: function() {
    // console.log('mounted');
    const frame = framePreload('http://localhost:17081/colgate.html');
//     container.style.position = "fixed";
//     container.style.zIndex = "10000";
//
// // this will try to put the container behind the <body> element:
// container.style.zIndex = -1;

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
      console.log('load');

      styleKeys.forEach(attr => {
        frame.style[attr] = styleGradient[attr][1];
      });

      this.$_brage = new BridgeService(iframe.contentWindow, this.handshakeKey);

      this.postMessage(this.$route.params.state)
    };
  },

  watch: {
    $route:{
      handler(newVal, oldVal) {
        // console.log('newVal: ', newVal);

        const state = newVal.params.state;
        this.postMessage(state)
      },
      // immediate: true
    }
  },

  methods: {
    postMessage(state) {
      // console.log('postMessage', state);
      if (this.$_brage) {
        this.$_brage.send(state);
      }
    }
  }
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
