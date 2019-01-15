import * as types from '../types/common';
import CONF from '@/config/';

const state = {
  config: { ...CONF }
};

const getters = {
  config: state => state.config,
};

const actions = {

};

const mutations = {

};

export default {
  state,
  getters,
  actions,
  mutations,
};
