import { CreateRegister } from 'vue-module-register';
import http from '@/services/xhr';
import bus from './bus';

const shared = {
  $bus: bus,
  $sharedMethods: {
    CreateRegister,
  },
  $http: http,
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
