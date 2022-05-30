const fs = require('fs')
const path = require('path')

module.exports = class CleanWebpackPlugin {
  constructor(options) {
    console.log('插件被创建了', options)
  }

  apply(compiler) {
    const outputPath = compiler.config.output.path
    console.log('插件被执行了', outputPath)
    compiler.hooks.entryOption.tap('CleanWebpackPlugin', () =>
      this.clean(outputPath)
    )
  }

  clean(outputPath) {
    const children = fs.readdirSync(outputPath)
    const isDir = fs.statSync(outputPath).isDirectory()
    if (isDir && children.length) {
      children.forEach(item => {
        const filePath = path.resolve(outputPath, item)
        if (fs.statSync(filePath).isDirectory()) {
          this.clean(filePath)
        } else {
          fs.unlinkSync(filePath)
        }
      })
    }
    fs.rmdirSync(outputPath)
  }
}