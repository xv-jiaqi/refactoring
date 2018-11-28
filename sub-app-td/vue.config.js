// const SrcCompileWebpackPlugin = require('webpack-gt-src-compile')
const path = require('path');
// const bourbon = require('bourbon').includePaths;
// const neat = require('bourbon-neat').includePaths;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const ModifyChunkIdPlugin = require('modify-chunk-id-webpack-plugin');
const patchCliService = require('./scripts/patch-cli-service');
const {name: APP_NAME, devPort: PORT = 8888} = require('./package.json');

patchCliService();

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  baseUrl: `/${APP_NAME}`,

  outputDir: 'dist',

  lintOnSave: true,

  productionSourceMap: false,

  devServer: {
    port: PORT,
    host: 'localhost',
    // https: true,
    hot: true,
    hotOnly: true,
    // before: app => {},
    proxy: {
      '/td': {
        target: 'http://192.168.10.151:7081',
        // target: 'https://192.168.10.130:17080',
        // target: 'http://127.0.0.1:6666',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/td': '/td' // 目前暂不需要重写路径
        // }
      },
    },
  },
  css: {
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
      vue: 'Vue',
      'element-ui': 'ELEMENT',
    },

    entry: './src/module.js',

    output: {
      libraryExport: 'default',

      devtoolModuleFilenameTemplate: info => info.resourcePath.match(/^\.\/\S*?\.vue$/)
        ? `webpack-generated:///${info.resourcePath}?${info.hash}`
        : `webpack-yourCode:///${info.resourcePath}`,

      devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
    },

    resolve: {
      mainFields: ['src:main', 'main'],
    },

    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src'), /node_modules\/(pcms-components-.*)/],
      }],
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.VUE_APP_NAME': JSON.stringify(APP_NAME),
      }),
      new ModifyChunkIdPlugin({ random: process.env.NODE_ENV === 'development' }),
    ],
  },
  // Workaround for
  // - https://github.com/vuejs/vue-cli/issues/1351
  // - https://github.com/jantimon/html-webpack-plugin/issues/870
  // - https://github.com/jantimon/html-webpack-plugin/pull/953
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].chunksSortMode = 'none';
      return args;
    });

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