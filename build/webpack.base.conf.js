'use strict'
const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')

const vueLoaderConfig = require('./vue-loader.conf')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// 获取待注册页面列表
let registerPageList = utils.getPageList()

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.ts', '.tsx', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '~': resolve('src')
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: [
        {
          loader: 'vue-loader',
          options: Object.assign(vueLoaderConfig, {
            loaders: {
              ts: 'ts-loader',
              tsx: 'babel-loader!ts-loader'
            }
          })
        },
        {
          loader: 'iview-loader',
          options: {
            prefix: true
          }
        }
      ]
    },
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            appendTsSuffixTo: [/[^t][^s][^x]\.vue$/],
            appendTsxSuffixTo: [/\.tsx\.vue$/]
          }
        }
      ]
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test')]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      exclude: [resolve('src/assets/icons')],
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
      include: [resolve('src/assets/icons')],
      options: {
        symbolId: 'icon-[name]'
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('media/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __REGISTER_PAGE_LIST__: JSON.stringify(registerPageList)
    }),
    new ForkTsCheckerWebpackPlugin({
      vue: true,
      workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
