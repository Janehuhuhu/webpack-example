const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  devServer: {
    open: true,
    port: 9090,  // 修改允许服务器环境端口号, 默认为 8080
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
        test: /\.js$/,
        exclude: /node_modules/,  // 不做处理的目录
        loader: "babel-loader",
        // options: {
        //   presets: [["@babel/preset-env", {
        //     targets: {
        //       chrome: '58'
        //     }
        //   }]],
        // },
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