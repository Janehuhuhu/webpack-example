## 1. 什么是 webpack-bundle-analyzer?
`webpack-bundle-analyzer` 是一个可视化的打包优化插件,会将打包的结果以图形化界面的方式展示给我们, 从 `webpack-bundle-analyzer` 生成的图形化界面中我们可以很清楚的知道模块之间的依赖关系、模块大小、模块有没有重复打包, 重复引用等，从而针对性的对我们的代码进行优化

打包后即启动 `webpack-bundle-analyzer` 服务器
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

plugins: [
  new BundleAnalyzerPlugin(),
]
```