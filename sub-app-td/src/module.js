// import 'proxy-polyfill'
import Vue from 'vue';
import store from '@/store/store-module';
import routes from '@/router/router-list';
import VuePcms from 'vue-pcms';

import 'es6-shim';
import 'element-ui/lib/theme-chalk/index.css';

import ElementUI from 'element-ui';
import '@/style/index.le.less';
import '@/style/index.sc.scss';
import '@/assets/svgIcons/index';
import '@/directives/';
// import i18n from '@/common/i18n';
import 'vue-awesome/icons';
import SvgIcon from '@/components/icon/svgIcon/index';
import Icon from 'vue-awesome/components/Icon';

Vue.component('svg-icon', SvgIcon);
Vue.component('fa-icon', Icon);

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