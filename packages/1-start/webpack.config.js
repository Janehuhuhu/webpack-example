const path = require('path')
module.exports = {
  /*
  mode: 指定打包的模式, 模式有两种
  一种是开发模式(development): 不会对打包的JS代码进行压缩
  还有一种就是上线(生产)模式(production): 会对打包的JS代码进行压缩
  * */
  mode: 'development',
  /*
  entry: 指定需要打包的入口文件
  * */
  entry: "./src/index.js",
  /*
  output: 指定打包之后的文件输出的路径和输出的文件名称
  * */
  output: {
    /*
    filename: 指定打包之后的JS文件的名称
    * */
    filename: 'bundle.js',
    /*
    path: 指定打包之后的文件存储到什么地方
    * */
    path: path.resolve(__dirname, 'dist')
  }
}