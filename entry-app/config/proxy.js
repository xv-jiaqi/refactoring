module.exports = {
  '/sub-app-td/': {
    target: 'http://localhost:6200/',
    bypass,
  },
  '/sub-app-old/': {
    target: 'http://localhost:6900/',
    bypass,
  },

  // service api
  '/td': {
    // target: 'http://localhost:6666',
    target: 'http://192.168.10.151:7081',
  },
};

function bypass (req, res, proxyOptions) {
  if (req.headers.accept.includes('text/html')) {
    return 'http://localhost:6100/index.html';
  }
}
