const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const glob = require("glob")
const path = require('path')
const Webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')


const prodConfig = {
  mode: 'production',
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin(), new TerserJSPlugin({
      extractComments: false,
    })]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: true,
      template: 'index.html'
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, 'dll/vendors.dll.js')
    }),
    new Webpack.DllReferencePlugin({
      manifest: require(path.resolve(__dirname, 'dll/vendors.manifest.json'))
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(
        path.resolve(__dirname, "./*.html"),
      )
    }),
  ]
};

module.exports = merge(commonConfig, prodConfig)

