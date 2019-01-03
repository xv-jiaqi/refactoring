import Vue from 'vue';
const { $http } = Vue.prototype;

/**
 * 角色管理 API
 */
class RoleService {
  getAllRole() {
    return $http({
      url: '/privilege/getAll',
    });
  };
}

export default new RoleService();