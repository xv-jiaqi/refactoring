<template>
  <div><section class="frame" ref="frame"></section></div>
</template>

<script>
import md5 from 'md5';
import BridgeService from '@/bridgeService';
import SessionStore from './sessionStore';
import FramePreload from './framePreload';

const APP_NAME = process.env.VUE_APP_NAME;
const calcHash = (string, hashLen = 5) => md5(string).substring(0, hashLen);

export default {
  name: 'frame',

  data() {
    return {
      isMounted: false,
      routeMode: window.location.hash ? '#' : '',
      sessionStore: new SessionStore('state'),
      bridgePath: this.$store.state['common']['config'].bridgePath,
    };
  },

  computed: {
    handshakeKey() {
      const { username, id } = this.$store.getters['userInfo'];
      return `${id}.${username}`;
    },
  },

  mounted() {
    const { routeMode, sessionStore } = this;
    const frameObj = new FramePreload(this.bridgePath).preload();
    const iframe = this.$refs.frame.appendChild(frameObj.frame);

    frameObj.frame.onload = () => {
      const SHAKE_HANDS = {
        PING: 'ping',
        PONG: 'pong',
      };
      const RECEIVE_TYPE_MAP = {
        redirect: 'redirect',
        replace: 'replace',
      };

      const messageOpts = {
        sendWindow: iframe.contentWindow,
        receiveWindow: window,
        handshakeKey: this.handshakeKey,
        targetOrigin: this.bridgePath,
        receive: function(data) {
          // 收到握手回复
          if (data === SHAKE_HANDS.PONG) {
            shakeHandsCb();
            return;
          }

          const { path: state, params, type } = data || {};
          if (state === undefined) return;

          switch (type) {
            case RECEIVE_TYPE_MAP.redirect: {
              this.$router.push({ name: state, params });
              break;
            }
            case RECEIVE_TYPE_MAP.replace: {
              const hash = Object.keys(params).length ? calcHash(`${state}${params}`) : '';
              const path = `${routeMode}/${APP_NAME}/${state}/${hash}`;

              window.history.replaceState(params, null, path);

              if (hash) {
                sessionStore.setItem(hash, params);
              }
            }
          }
        }.bind(this),
      };

      this.$_brage = new BridgeService(messageOpts);
      const { state, paramsId } = this.$route.params;
      const params = this.sessionStore.getItem(paramsId);
      const shakeHandsCb = function() {
        const message = { state, params };
        this.$_brage.send(message, () => void frameObj.loaded());
      }.bind(this);

      // 发出握手信息
      this.$_brage.send(SHAKE_HANDS.PING);
    };
  },

  watch: {
    $route: {
      handler(newVal, oldVal) {
        const { state, paramsId } = newVal.params;
        const message = {
          state,
          params: this.sessionStore.getItem(paramsId),
        };

        this.postMessage(message);
      },
      // immediate: true
    },
    '$i18n.locale': {
      handler(newVal, oldVal) {
        this.postMessage({ newVal, type: 'lang' });
      },
      // deep: true,
    },
  },

  methods: {
    postMessage(state) {
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
