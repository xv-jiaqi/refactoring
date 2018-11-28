import * as types from '../types/account-types';
import accountService from '@/services/account-service';
import Vue from 'vue';
import CONF from '@/config/';
import Router from '@/router/';
// import errorCode from '../../services/xhr/errorCode';

// initial state
const state = {
  userInfo: {},
  auth: [],
};

// getters
const getters = {
  userInfo: state => state.userInfo,
  auth: state => state.auth,
};

// actions
const actions = {
  [types.LOGIN_REQUEST](info, formData) {
    return accountService.login(formData);
  },

  [types.LOGOUT_REQUEST]() {
    return accountService.logout();
  },

  [types.GET_LOGIN_INFO_REQUEST]({ commit, }) {
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

        const { default: authProcess, } = await import('@/store/authProcess');

        Vue.session.auth = await authProcess(privileges);

        commit(types.USER_INFO, Vue.session);
        commit(types.AUTH, Vue.session.auth);

        return Vue.session;
      }).catch(() => {
        Router.push({ name: 'login', });
      });
  },

  [types.GET_VCODE_REQUEST]() {
    return accountService.getVcode();
  },
};

// mutations
const mutations = {
  [types.USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  [types.AUTH](state, auth) {
    state.auth = auth;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};