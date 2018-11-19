// import 'proxy-polyfill'
import Vue from 'vue';
import VuePcms from 'vue-pcms';
import ElementUI from 'element-ui';
import 'es6-shim';
import App from './App.vue';
import router from '@/router/';
import store from '@/store/';
import '@/assets/less/style.less';
import 'element-ui/lib/theme-chalk/index.css';
import '@/directives/';

import '@/assets/svgIcons/index';

Vue.use(ElementUI);

Vue.use(VuePcms, {
  defaultDateSource: 'mock',
  pcmsServer: '',
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
