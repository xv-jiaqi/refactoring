export default {
  async login(data) {
    console.log('login req data : ', JSON.stringify(data, null, 4));
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (Math.random() > 0.6) {
      return Promise.reject('用户名或密码错误');
    }
    return Promise.resolve({
      result: 0,
    });
  },
  async getVcode() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Promise.resolve({
      img: 'http://p8v5f1auf.bkt.clouddn.com/preview/img/mock-img.8546a42a.jpeg',
      pid: 'mock-pid-00000',
    });
  },
};