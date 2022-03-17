const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')


module.exports = {
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
  ]
};
