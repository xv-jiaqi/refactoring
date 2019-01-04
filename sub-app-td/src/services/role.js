import Vue from 'vue';
const { $http } = Vue.prototype;

/**
 * 角色管理 API
 */
class RoleService {
  constructor() {

  }

  getAllPrivilege() {
    return $http({
      url: '/privilege/getAll',
    });
  }

  getSelectedPrivilege(params) {
    return $http({
      body: params,
      url: '/group/getDetail',
    });
  }
}

export default new RoleService();