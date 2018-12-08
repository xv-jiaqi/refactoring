import Vue from 'vue';
import store from '@/store/store-module';
import routes from '@/router/router-list';

import 'es6-shim';
import 'element-ui/lib/theme-chalk/index.css';

import '@/directives/';

const { CreateRegister } = Vue.prototype.$sharedMethods;

const register = new CreateRegister({
  name: process.env.VUE_APP_NAME,
});

register
  .registerModule(store)
  .addRoutes(routes);
