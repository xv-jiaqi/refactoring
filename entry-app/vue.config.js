const path = require('path');
const webpack = require('webpack');
const APP_NAME = require('./package.json').name;
const PORT = require('./package.json').devPort;
const PROXY = require('./config/proxy');

const NODE_ENV = process.env.NODE_ENV || 'development';

function log(label, content) {
  console.log('\x1b[1m%s\x1b[31m%s\x1b[0m', label, content);
}

log('APP_NAME: ', APP_NAME);
log('NODE_ENV: ', NODE_ENV);

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  baseUrl: './',

  productionSourceMap: false,

  configureWebpack: {
    externals: {
      lodash: '_',
      moment: 'moment',
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.VUE_APP_NAME': JSON.stringify(APP_NAME),
      }),
    ],

    devtool: 'eval-source-map',

    output: {
      libraryExport: 'default',

      devtoolModuleFilenameTemplate: info => (info.resourcePath.match(/^\.\/\S*?\.vue$/)
        ? `webpack-generated:///${info.resourcePath}?${info.hash}`
        : `webpack-yourCode:///${info.resourcePath}`),

      devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
    },
  },

  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        data: '@import "@/style/variables.scss";',
        // includePaths: [...bourbon, ...neat],
      },
    },
  },

  devServer: {
    port: PORT,
    proxy: PROXY,
  },

  transpileDependencies: [
    /\bvue-awesome\b/,
  ],

  chainWebpack: (config) => {
    config.module.rules.delete('svg');
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/assets/svgIcons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });

    config.resolve.alias
      .set('Assets', resolve('src/assets'))
      .set('Style', resolve('src/style'));
  },
};
