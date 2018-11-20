// const SrcCompileWebpackPlugin = require('webpack-gt-src-compile')
const path = require('path');
// const bourbon = require('bourbon').includePaths;
// coust neat = require('bourbon-neat').includePaths;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8888,
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    https: false,
    hotOnly: false,
    before: app => {},
    proxy: {
      '/td': {
        target: 'http://192.168.10.151:7081',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/td': '/td' // 目前暂不需要重写路径
        // }
      },
    },
  },
  // 基本路径
  baseUrl: '/',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  css: {
      loaderOptions: {
        // 给 sass-loader 传递选项
        sass: {
          data: `@import '@/style/variables.scss';`,
          // includePaths: [...bourbon, ...neat],
        },
      },
  },
  configureWebpack: {
    resolve: {
      mainFields: [ 'src:main', 'main' ],
    },

    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ path.join(__dirname, 'src'), /node_modules\/(pcms-components-.*)/ ],
      },],
    },
    // plugins: [new SrcCompileWebpackPlugin()],
    // plugins: [
    //   new BundleAnalyzerPlugin(),
    // ],
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

    config.module.rules.delete('svg'); // 重点:删除默认配置中处理svg,
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
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
      .set('Style', resolve('src/Style'));

    // if (process.env.NODE_ENV === 'development') {
    //   config.devtool = 'eval-source-map';
    //
    //   config.output.devtoolModuleFilenameTemplate = info => {
    //     let $filename = `sources://${info.resourcePath}`;
    //
    //     if (info.resourcePath.match(/\.vue$/) && !info.identifier.match(/type=script/)) {
    //       $filename = `webpack-generated:///${info.resourcePath}?${info.hash}`;
    //     }
    //
    //     return $filename;
    //   };
    //
    //   config.output.devtoolFallbackModuleFilenameTemplate = 'webpack:///[resource-path]?[hash]';
    // }
  },
};