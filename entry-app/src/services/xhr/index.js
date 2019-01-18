import axios from 'axios';
import Loading from './loadingService';
// import router from '@/router/';
import Vue from 'vue';
import errorCode from './errorCode';
import CONF from '@/config/';
import router from '@/router';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

const reqCache = {};
const loading = new Loading();

export default function({
  url,
  body = null,
  onlyOne = false,
  responseType = 'json',
  baseURL = '/',
  prefix = CONF.pathPrefix,
} = {}) {
  if (onlyOne && reqCache[url]) {
    return reqCache[url];
  }

  loading.showLoading();

  const promise = new Promise((resolve, reject) => {
    const reqPath = `${CONF.rootPath}/${prefix}${url}`;

    axios({
      method: 'post', // 所有请求都用post
      url: reqPath,
      data: body,
      baseURL,
      responseType,
    })
      .then(response => {
        if (responseType !== 'json') return resolve(response);

        delete reqCache[url];
        const { errno = 0, data = {} } = response.data || {};

        // 请求失败
        if (errno !== 0) {
          if (errorCode[errno]) {
            Vue.prototype.$message({
              message: errorCode[errno] || '请求失败',
              type: 'error',
            });

            return reject(response.data);
          }

          if (data.result === 1) {
            return reject(data.error_info || new Error('请求失败'));
          }
        }

        if (data.out_line) {
          Vue.prototype.$message({
            message: '该账号已在别处登录',
            type: 'error',
          });
        }

        resolve(data);
      })
      .catch(error => {
        const { response } = error;
        if (response && response.status === 401) {
          router.push({ name: 'login' });
        }

        Vue.prototype.$message({
          message: '请求失败',
          type: 'error',
        });
        delete reqCache[url];
        return reject(new Error('请求失败'));
      })
      .finally(() => {
        loading.tryHideLoading();
      });
  });

  if (onlyOne) {
    reqCache[url] = promise;
  }

  return promise;
}
