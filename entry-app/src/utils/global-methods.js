import { CreateRegister } from 'vue-module-register';
import http from '@/services/xhr';
import bus from './bus';
import * as util from './utils';
import Loading from '@/services/xhr/loadingService';

const shared = {
  $bus: bus,
  $sharedMethods: {
    CreateRegister,
  },
  $http: http,
  $util: util,
  $Loading: new Loading(),
};

export default {
  install(Vue) {
    Object.defineProperties(
      Vue.prototype,
      Object.entries(shared).reduce((acc, [k, v]) => {
        acc[k] = {
          get() {
            return v;
          },
        };
        return acc;
      }, {}),
    );
  },
};
