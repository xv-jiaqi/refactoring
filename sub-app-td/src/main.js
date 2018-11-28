// import 'proxy-polyfill'
import Vue from 'vue';
import VuePcms from 'vue-pcms';

import 'es6-shim';
import 'element-ui/lib/theme-chalk/index.css';

import ElementUI from 'element-ui';
import '@/style/index.le.less';
import '@/style/index.sc.scss';
import '@/assets/svgIcons/index';
import '@/directives/';
import router from '@/router/';
import store from '@/store/';
import i18n from '@/common/i18n';
import 'vue-awesome/icons';

import SvgIcon from '@/components/icon/svgIcon/index';
import Icon from 'vue-awesome/components/Icon';

import App from './App';

Vue.component('svg-icon', SvgIcon);
Vue.component('fa-icon', Icon);

Vue.use(ElementUI);

Vue.use(VuePcms, {
  defaultDateSource: 'mock',
  pcmsServer: '',
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');