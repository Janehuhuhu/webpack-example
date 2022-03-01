## 1. 什么是 Tree-Shaking?
过滤掉无用的 `JS` 代码和 `CSS` 代码, 我们称之为 `Tree-Shaking`。例如: 在 `a.js` 中引入了 `b` 模块, `b` 模块中有 2 个方法, 但是我只用到了 1 个方法。默认情况下会将 `b` 模块中所有代码都打包到 `a.js` 中,为了提升网页性能降低打包体积, 我们可以只将用到的方法打包到 `a.js` 中
<div style="margin-bottom: 50px;"></div>


## 2. webpack中如何开启 Tree-Shaking?
### 2.1 开发环境
```js
// webpack.config.js配置, 告诉webpack只打包导入模块中用到的内容
optimization: {
   usedExports: true
},
// package.json配置, 告诉webpack哪些文件不做Tree-Shaking
"sideEffects": ["*.css", "*.less", "*.scss"],
```
注意：打包的结果中其实是用注释的方式过滤的
```js
/* unused harmony export minus */
```
<div style="margin-bottom: 30px;"></div>


### 2.2 生产环境
无需进行任何配置, `webpack` 默认已经实现了 `Tree-Shaking`

注意点:
- 只有 `ES Modle` 导入才支持 `Tree-Shaking`
- 任何导入的文件都会受到 `tree shaking` 的影响
这意味着，如果在项目中使用类似 `css-loader` 并导入 `CSS `文件，
则需要将其添加到 `side effect` 列表中，以免在生产模式中无意中将它删除。

<div style="margin-bottom: 50px;"></div>


## 3. CSS 模块 Tree-Shaking
不光 `JS` 模块可以进行 `Tree-Shaking`, `CSS` 模块也可以进行 `Tree-Shaking`
```js
// 安装依赖
npm i purgecss-webpack-plugin glob -D

// 配置
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
  plugins: [
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    }),
  ]
```
注意： `purifycss-webpack` 已废弃，在 `webpack5` 中使用会报错 *TypeError: compiler.plugin is not a function*
<div style="margin-bottom: 50px;"></div>


[官网](https://www.webpackjs.com/guides/tree-shaking/)
[purgecss-webpack-plugin](https://www.npmjs.com/package/purgecss-webpack-plugin)