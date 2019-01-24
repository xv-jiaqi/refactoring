import Vue from 'vue';
import VuePcms from 'vue-pcms';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import GlobalMethods from '@/utils/global-methods';
import containerHelper from './container-helper';

Vue.config.productionTip = false;
Vue.config.devtools = true;

import Icon from 'vue-awesome/components/Icon';

import i18n from './common/i18n';

import '@/directives/index';
import '@/style/index.sc.scss';
import './assets/svgIcons/index';
import './permission';
import 'vue-awesome/icons';

containerHelper.mountStoreInstance(store);

Vue.component('v-icon', Icon);

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
