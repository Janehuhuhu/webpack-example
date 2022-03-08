const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devConfig = {
  optimization: {
    usedExports: true
  },
  devServer: {
    open: true,
    port: 9090,  // 修改允许服务器环境端口号, 默认为 8080
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
  ]
};

module.exports = merge(commonConfig, devConfig)
