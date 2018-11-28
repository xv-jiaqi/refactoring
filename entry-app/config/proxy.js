module.exports = {
  '/sub-app-one/': {
    target: 'http://localhost:6500/', // 指向 sub-app-one 开发服务
  },
  '/sub-app-two/': {
    target: 'http://localhost:6600/', // 指向 sub-app-two 开发服务
  },
};
