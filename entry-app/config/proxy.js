module.exports = {
  '/sub-app-td/': {
    target: 'http://localhost:6200/',
  },
  '/sub-app-old/': {
    target: 'http://localhost:6900/',
  },

  // service api
  '/td': {
    target: 'http://192.168.10.151:7081',
  },
};
