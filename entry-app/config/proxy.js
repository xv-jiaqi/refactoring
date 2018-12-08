module.exports = {
  '/sub-app-td/': {
    target: 'http://localhost:16001/',
  },
  '/sub-app-two/': {
    target: 'http://localhost:7320/',
  },
  '/td': {
    target: 'http://192.168.10.151:7081',
    // target: 'https://192.168.10.130:17080',
    // target: 'http://127.0.0.1:6666',
    changeOrigin: true,
    // pathRewrite: {
    //   '^/td': '/td' // 目前暂不需要重写路径
    // }
  },
};
