const path = require('path');
const packageJson = require('./package.json');
const dir = packageJson.name;
const SentryWebpackPlugin = require('./SentryWebpackPlugin');

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProduction = process.env.NODE_ENV === 'production';

const NOW = new Date();
const VERSION = [
  NOW.getFullYear(),
  NOW.getMonth() + 1,
  NOW.getDate(),
  NOW.getHours(),
  NOW.getMinutes(),
  NOW.getSeconds(),
].join('');
//webpack打包时用到的全局变量
process.env.VUE_APP_PKGNAME = packageJson.name;
process.env.VUE_APP_SENTRY_VERSION = VERSION;
process.env.VUE_APP_ENV = process.env.APP_ENV || 'production';
console.log(`APP_ENV:${process.env.VUE_APP_ENV}`);
console.log('isProduction: ', isProduction);

const externals = isProduction
  ? {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    '@tencent/ppd-base-libs': 'hkBaseLib',
    '@tencent/hkwallet-bank': 'hkBank',
    '@tencent/aegis-web-sdk': 'Aegis',
    'lottie-web': 'lottie',
  }
  : {};

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  indexPath: 'utilities.shtml',
  transpileDependencies: ['@tencent/ppd-base-libs', /@tencent\/wphk.*/],
  crossorigin: 'anonymous',
  publicPath: process.env.NODE_ENV === 'production' ? `//st.moneydata.hk/res/weixin/hkwallet/v3/${dir}/` : '',
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].wxSdk = isProduction ? '' : '<script src="//res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>';
      args[0].ravenVersion = VERSION;

      args[0].projectName = dir;

      return args;
    });
    config.plugin('define').tap((definitions) => {
      definitions[0]['process.env']['isMiniprogram'] = false;
      return definitions;
    });
  },
  devServer: {
    disableHostCheck: true,
  },
  configureWebpack: {
    externals,
    module: {
      // 用于解决报错：@vueuse/core can't import the named export 'bypassFilter'
      rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }]
    },
    resolve: {
      alias: {
        '@wphk-ui': path.resolve(__dirname, 'node_modules/@tencent/wphk-ui/src')
      },
    },
    plugins: [
      new SentryWebpackPlugin({
        // 自己项目的sentry project
        project: 'hkwallet-utilities',
        token: 'db68f3be67c44cf5968e6c5c6fdfe9217393dd8d2da240e8b5f44b8e14132c7b',
        version: VERSION,
        url: `~/res/weixin/hkwallet/v3/${dir}/`, //~表示匹配所有 域名，无论https还是http
      }),
      // new BundleAnalyzerPlugin(),
    ],
    optimization: {
      splitChunks: !isProduction ? {} : {
        chunks: 'all',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          corejs: {
            name: 'corejs',
            test: (module) => {
              return /core-js|raven-js|weixin-js-sdk/.test(module.context);
            },
            chunks: 'initial',
            priority: 9,
          },
          banner: {
            name: 'banner',
            test: module => /wphk-components-banner|swiper/.test(module.context),
            chunks: 'initial',
            priority: 8,
          },
          wphk: {
            name: 'tencent-wphk',
            test: module => /@tencent\/(?!wphk-components-banner)/.test(module.context),  // 含`@tencent` 但不含 `wphk-components-banner`的
            chunks: 'initial',
            priority: 7,
          },
        },
      },
    },
  },
};
