## 1. 什么是 eslint?
`ESLint` 是一个插件化的 `javascript` 代码检测工具，它可以用于检查常见的 `JavaScript` 代码错误，也可以进行"代码规范"检查，在企业开发中项目负责人会定制一套 `ESLint` 规则，然后应用到所编写的项目上，从而实现辅助编码规范的执行，有效控制项目代码的质量。在编译打包时如果语法有错或者有不符合规范的语法就会报错, 并且会提示相关错误信息
<div style="margin-bottom: 50px;"></div>


## 2. 如何使用 eslint
```js
// 安装依赖
npm install eslint eslint-webpack-plugin --save-dev
// 生成eslint配置文件 .eslintrc
...此处省略
// 配置 webpack, eslint-loader 已废弃
const ESLintPlugin = require('eslint-webpack-plugin')
new ESLintPlugin({
  fix: true
})
```
<div style="margin-bottom: 50px;"></div>

[eslint-webpack-plugin](https://www.npmjs.com/package/eslint-webpack-plugin)