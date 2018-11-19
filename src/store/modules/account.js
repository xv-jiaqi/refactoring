import * as types from '../types/account-types';
import accountService from '@/services/account-service';
import Vue from 'vue';
import CONF from '@/config/';

// initial state
const state = {};

// getters
const getters = {};

// actions
const actions = {
  [types.LOGIN_REQUEST](info, formData) {
    return accountService.login(formData);
  },

  [types.LOGOUT_REQUEST]() {
    return accountService.logout();
  },

  [types.GET_LOGIN_INFO_REQUEST]() {
    return accountService
      .getLoginInfo()
      .then(async ({ data = {}, }) => {
        Vue.session = Object.assign({}, {
          ...Vue.session,
          ...data,
          ...CONF,
          privileges: undefined,
        });

        const { privileges = [], } = data;

        const authProcess = await import('@/store/authProcess');

        Vue.session.auth = await authProcess(privileges);

        return Vue.session;
      });
  },

  [types.GET_VCODE_REQUEST]() {
    return accountService.getVcode();
  },
};

// mutations
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
