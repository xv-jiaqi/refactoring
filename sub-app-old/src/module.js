// import Vue from 'vue';
// import store from '@/store/store-module';
// import routes from '@/router/router-list';
//
// const { CreateRegister } = Vue.prototype.$sharedMethods;
//
// const register = new CreateRegister({
//   name: process.env.VUE_APP_NAME,
// });
//
// register.registerModule(store).addRoutes(routes);

import routes from '@/router/router-list';
import containerHelper from './container-helper';

containerHelper.mountRoutes(routes);
