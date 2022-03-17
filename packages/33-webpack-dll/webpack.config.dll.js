
const path = require('path')
const Webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// TerserPlugin ↔作用

module.exports = {
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,  // .LICENSE.txt 为注释文件
    })],
  },
  mode: 'production',
  entry: {
    vendors: ['lodash']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'dll'),
    library: '[name]'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, 'dll/[name].manifest.json')
    })
  ]
};