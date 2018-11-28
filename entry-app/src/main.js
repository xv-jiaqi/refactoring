import Vue from 'vue';
import GlobalMethods from '@/utils/global-methods';
import '@/style/index.sc.scss';
import 'vue-awesome/icons';
import i18n from './common/i18n';
import Icon from 'vue-awesome/components/Icon.vue';

import router from './router';
import store from './store';
import App from './App.vue';

Vue.component('v-icon', Icon);

Vue.config.productionTip = false;
Vue.use(GlobalMethods);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
