const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 300, // 防抖, 和函数防抖一样, 改变过程中不重新打包, 只有改变完成指定时间后才打包
    poll: 1000, // 每隔多少时间检查一次变动
    ignored: /node_modules/ // 排除一些巨大的文件夹, 不需要监控的文件夹
  },
  mode: 'development',
  entry: "./src/js/index.js",
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
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
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'imgs'
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: true
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
}