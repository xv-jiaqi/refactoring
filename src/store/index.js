import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const getters = {};

const actions = {};

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    account,
  },
  strict: debug,
});
