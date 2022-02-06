const path = require('path')
module.exports = {
  devtool: 'inline-nosources-cheap-source-map',
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'imgs',
            // esModule: false,
            // publicPath: 'http://www.baidu.com'
          }
        }
      }
    ]
  }
}