import Vue from 'vue';
import GlobalMethods from '@/utils/global-methods';
import Icon from 'vue-awesome/components/Icon';
import VuePcms from 'vue-pcms';
import i18n from './common/i18n';

import '@/style/index.sc.scss';
import './assets/svgIcons/index';
import 'vue-awesome/icons';

import router from './router';
import store from './store';
import App from './App';

Vue.component('v-icon', Icon);
Vue.config.devtools = true;

Vue.config.productionTip = false;
Vue.use(GlobalMethods);
Vue.use(VuePcms, {
  defaultDateSource: 'mock',
  pcmsServer: '',
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
