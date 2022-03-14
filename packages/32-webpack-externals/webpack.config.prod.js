const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const glob = require("glob")
const path = require('path')

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
    new PurgeCSSPlugin({
      paths: glob.sync(
        path.resolve(__dirname, "./*.html"),
      )
    })
  ]
};

module.exports = merge(commonConfig, prodConfig)

