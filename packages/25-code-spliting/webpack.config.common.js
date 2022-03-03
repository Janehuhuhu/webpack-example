const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  /**
   * splitChunks
   */
  optimization: {
    splitChunks: {
      chunks: 'all',
      filename: 'js/~vendor.[hash:8].js'
    },
  },
  entry: {
    main: "./src/js/index.js",
    another: "./src/js/test.js",
  },
  /**
   * 配置 dependOn option 选项共享模块
   */ 
  // optimization: {
  //   runtimeChunk: 'single',
  // },
  // entry: {
  //   main: {
  //     import: "./src/js/index.js",
  //     dependOn: 'shared'
  //   },
  //   another: {
  //     import: "./src/js/test.js",
  //     dependOn: 'shared'
  //   },
  //   shared: 'lodash'
  // },
  output: {
    filename: 'js/[name].bundle.[hash:8].js',
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
    })
  ]
};
