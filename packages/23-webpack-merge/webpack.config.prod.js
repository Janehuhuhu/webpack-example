const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const prodConfig = {
  mode: 'production',
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin(), new TerserJSPlugin()]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: true,
      template: 'index.html'
    }),
  ]
};

module.exports = merge(commonConfig, prodConfig)

