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
});

export default store;
