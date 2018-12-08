import { CreateLoaderMixin } from 'vue-module-register';
import store from '@/store';
import router from '@/router';

const modules = [
  { name: 'sub-app-td', url: './sub-app-td/main.js' },
  { name: 'sub-app-two', url: './sub-app-two/main.js' },
];

export default new CreateLoaderMixin({
  modules,
  store,
  router,
  cache: false,
});
