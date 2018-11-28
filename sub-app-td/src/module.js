// import 'proxy-polyfill'
import Vue from 'vue';
import store from '@/store/store-module';
import routes from '@/router/router-list';
import VuePcms from 'vue-pcms';

import 'es6-shim';
import 'element-ui/lib/theme-chalk/index.css';

import ElementUI from 'element-ui';

import '@/assets/svgIcons/index';
import '@/directives/';
// import i18n from '@/common/i18n';
import SvgIcon from '@/components/icon/svgIcon/index';

Vue.component('svg-icon', SvgIcon);

Vue.use(ElementUI);

Vue.use(VuePcms, {
  defaultDateSource: 'mock',
  pcmsServer: '',
});

const { CreateRegister, } = Vue.prototype.$sharedMethods;

const register = new CreateRegister({
  name: process.env.VUE_APP_NAME,
});

register.registerModule(store).addRoutes(routes);