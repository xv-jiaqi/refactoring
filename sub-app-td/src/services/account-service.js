import Vue from 'vue';
const { $http } = Vue.prototype;

/**
 * 账号模块 API
 */
class AccountService {
  /**
   * 登录
   * @param  {String} formData.userName
   * @param  {String} formData.password
   */
  login(formData) {
    return $http({
      url: '/user/login',
      body: formData,
      onlyOne: true,
      prefix: 'auth',
    });
  }

  /**
   * 注销登录
   */
  logout() {
    return $http({
      url: '/user/logout',
      prefix: 'auth',
    });
  }

  /**
   * 获取登录信息
   */
  getLoginInfo() {
    return $http({
      url: '/user/getLoginInfo',
    });
  }

  /**
   * 验证码
   */
  getVcode() {
    return $http({
      url: '/user/getVerifyCode',
      prefix: 'auth',
    });
  }
}

// 实例化后导出，全局单例
export default new AccountService();
