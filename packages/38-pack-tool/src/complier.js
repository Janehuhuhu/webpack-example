const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const t = require('@babel/types')

class Complier {
  constructor(config) {
    this.config = config
    this.modules = {}
  }
  
  run() {
    // 获取所有模块
    this.buildModule(this.config.entry)
    // 渲染打包模版文件 ejs 并执行
    this.emitFile()
  }

  buildModule(modulePath) {
    const code = this.getSource(modulePath)
    // 解析模块代码，修改导入模块路径和方法，并保存模块路径
    const { resultCode, dependencies } = this.parseModule(code)
    this.modules[modulePath] = resultCode
    dependencies.forEach(item => this.buildModule(item))
  }

  parseModule(code) {
    const ast = parser.parse(code)
    // 定义变量保存主模块地址
    const rootPath = path.dirname(this.config.entry)
    // 定义数组保存当前模块所有的依赖
    const dependencies = []
    // 修改导入模块路径和方法(require)，并保存模块路径
    traverse(ast, {
      CallExpression(nodePath) {
        const node = nodePath.node
        if(node.callee.name === "require") {
          // require => __webpack_require__
          node.callee.name = '__webpack_require__'
          // 修改require导入的路径,原路径加rootPath
          let modulePath = node.arguments[0].value
          modulePath = './' + path.join(rootPath, modulePath)
          dependencies.push(modulePath)
          node.arguments = [t.stringLiteral(modulePath)]
        }
      }
    })

    const resultCode = generator(ast).code
    return { resultCode, dependencies }
  }

  emitFile() {
    const template = fs.readFileSync(path.resolve(__dirname, './main.ejs'), 'utf8')
    let resultCode = ejs.render(template, {entryId: this.config.entry, modules: this.modules});
    const outputDir = this.config.output.path
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir)
    }
    const outputPath = path.resolve(outputDir, this.config.output.filename)
    fs.writeFileSync(outputPath, resultCode)
  }

  getSource(modulePath) {
    return fs.readFileSync(modulePath, 'utf8')
  }
  
}

module.exports = Complier