module.exports = {
  '/sub-app-td/': {
    target: 'http://localhost:6200/',
    bypass,
  },
  '/sub-app-old/': {
    target: 'http://localhost:6900/',
    pathRewrite: {'/sub-app-old/sub-app-old' : '/sub-app-old'},
    bypass,
  },

  // service api
  '/td': {
    target: 'http://localhost:6666',
    // target: 'http://192.168.10.151:7081',
  },
};

function bypass (req, res, proxyOptions) {
  if (req.headers.accept.indexOf('html') !== -1) {
    console.log('[sub-app-old]: Skipping proxy for browser request.');
    return '/index.html';
  }
}
