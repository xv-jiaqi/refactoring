import xhr from './xhr';

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
    return xhr({
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
    return xhr({
      url: '/user/logout',
      prefix: 'auth',
    });
  }

  /**
   * 获取登录信息
   */
  getLoginInfo() {
    return xhr({
      url: '/user/getLoginInfo',
    });
  }

  /**
   * 验证码
   */
  getVcode() {
    return xhr({
      url: '/user/getVerifyCode',
      prefix: 'auth',
    });
  }
}

// 实例化后导出，全局单例
export default new AccountService();