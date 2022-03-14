const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const Webpack = require('webpack')

module.exports = {
  resolve: {
    extensions: [".css", ".js"],
    alias: {
      'cc': path.resolve(__dirname, 'src/js/custom.css')
    }
  },
  /**
   * splitChunks
   */
  optimization: {
    splitChunks: {
      chunks: 'all', 
      minSize: 30000, // 表示被分割的代码体积至少有多大才分割(单位是字节), async 无论大小一定会被分割
      minChunks: 1,  //  表示至少被引用多少次数才分割，默认为1
      maxAsyncRequests: 5, // 异步加载并发最大请求数(保持默认即可)
      maxInitialRequests: 3, // 最大的初始请求数(保持默认即可)
      automaticNameDelimiter: '~', // 命名连接符
      cacheGroups: { // 缓存组, 将当前文件中导入的所有模块缓存起来统一处理
        vendors: { // 分割从node_modules目录中导入的模块
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 优先级, 值越小越优先
          name: 'vendor'
        },
        default: { // 分割从任意导入的模块,包含node_modules模块，但是优先级不高
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true, // 如果当前代码块包含的模块已经有了，就不在产生一个新的代码块
          name: 'common'
        }
      }
    },
  },
  entry: {
    main: "./src/js/index.js",
  },
  output: {
    filename: 'js/[name].bundle.[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'imgs/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(css|less|scss)$/,
        use: [
          {
            // loader: 'style-loader',
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader'
          },
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new ESLintPlugin({
      fix: true
    }),
    new Webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ })
  ]
};
