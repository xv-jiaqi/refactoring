import conf from './app/cgtdesk';
import defaultAuth from './auth';

export async function getAuthByAppNameFn(appName) {
  const { default: customAuth } = await import(`./auth/${appName}`);
  return Object.assign(defaultAuth, customAuth);
}

export default {
  appName: conf.appName,
  alias: conf.appName,
  // logogram: conf.appName,

  // APP 配置优先级高于公共配置
  ...conf,

  // 不可覆盖
  pathPrefix: conf.appName,
  rootPath: 'td', // 后端 API 全部以 `td` 开头, 部分登录相关接口为 `/td/auth`, 其他接口全以 `/td/产品名` 开始
};
