import * as types from '../types/roleTypes';
import roleService from '@/services/role';

const state = {
  allRoles: [],
};

// getters
const getters = {
  allRoles: state => state.roles,
  ccc: state => state.ccc,
};

// actions
const actions = {
  [types.GET_ALL_ROLES]() {
    return roleService.getAllRole();
  },
};

// mutations
const mutations = {
  [types.GET_ALL_ROLES](state, allRoles) {
    state.allRoles = allRoles;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
