import Vue from 'vue';
import Vuex from 'vuex';
import storeModules from '@/store/index';


Vue.use(Vuex);

const store = new Vuex.Store({
  state: { name: 'entry-app' },
  mutations: {},
  actions: {},
  modules: {
    ...storeModules,
  },
  strict: process.env.NODE_ENV !== 'production'
});

export default store;
