import Vue from 'vue';
const { $http } = Vue.prototype;

/**
 * 角色管理 API
 */
class RoleService {
  constructor() {}

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

  getRoleList(params) {
    return $http({
      body: params,
      url: '/group/getList',
    });
  }

  createRole(params) {
    return $http({
      body: params,
      url: '/group/add',
    });
  }

  editRole(params) {
    return $http({
      body: params,
      url: '/group/update',
    });
  }

  deleteRole(params) {
    return $http({
      body: params,
      url: '/group/del',
    });
  }
}

export default new RoleService();
