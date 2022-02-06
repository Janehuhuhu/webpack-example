const path = require('path')
module.exports = {
  devtool: 'inline-nosources-cheap-source-map',
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
}