const path = require('path');
const webpack = require('webpack');
const ModifyChunkIdPlugin = require('modify-chunk-id-webpack-plugin');
const patchCliService = require('./scripts/patch-cli-service');
const { name: APP_NAME, devPort: PORT = 8888, } = require('./package.json');

patchCliService();

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

const NODE_ENV = process.env.NODE_ENV || 'development';

log('APP_NAME: ', APP_NAME);
log('NODE_ENV: ', NODE_ENV);

module.exports = {
  baseUrl: `/${APP_NAME}`,
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: false,

  devServer: {
    port: PORT,
  },
  css: {
    extract: false,
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        data: '@import "@/style/variables.scss";',
      },
    },
  },
  configureWebpack: {
    devtool: 'eval-source-map',

    externals: {
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
    },

    entry: './src/module.js',

    output: {
      libraryExport: 'default',

      devtoolModuleFilenameTemplate: info => (info.resourcePath.match(/^\.\/\S*?\.vue$/)
        ? `webpack-generated:///${info.resourcePath}?${info.hash}`
        : `webpack-td:///${info.resourcePath}`),

      devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
    },

    resolve: {
      mainFields: [ 'src:main', 'main' ],
    },

    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ path.join(__dirname, 'src'), /node_modules\/(pcms-components-.*)/ ],
      }],
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.VUE_APP_NAME': JSON.stringify(APP_NAME),
      }),
      new ModifyChunkIdPlugin({ random: process.env.NODE_ENV === 'development', })
    ],
  },
  // Workaround for
  // - https://github.com/vuejs/vue-cli/issues/1351
  // - https://github.com/jantimon/html-webpack-plugin/issues/870
  // - https://github.com/jantimon/html-webpack-plugin/pull/953
  chainWebpack: (config) => {},
};

function log(label, content, options) {
  console.log('\x1b[1m%s\x1b[31m%s\x1b[0m', label, content);
}