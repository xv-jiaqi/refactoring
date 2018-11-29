import { CreateLoaderMixin } from 'vue-module-register';
import store from '@/store';
import router from '@/router';

// 打包后的 sub-app 路径
const modules = [
  { name: 'td', url: '/td/main.js' },
];

export default new CreateLoaderMixin({
  modules,
  store,
  router,
  cache: false,
});
