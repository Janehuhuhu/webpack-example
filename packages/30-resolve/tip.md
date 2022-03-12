## 1. 什么是resolve?
`resolve` 用于配置导入模块的解析规则
<div style="margin-bottom: 50px;"></div>

## 2. resolve 常用配置
### 2.1 映射导入路径, 简化导入代码
```js
// 但是这种写法每次都要写很长的一串路径, 有没有办法可以简化呢?
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'bootstrap';
```
那就是通过 `resolve` 的 `alias`
```js
resolve: {
  // 创建 import 或 require 的别名，来确保模块引入变得更简单
  alias: {
    bootstrap: path.resolve(__dirname, "bootstrap/dist/css/bootstrap.css")
  },
}
```
<div style="margin-bottom: 30px;"></div>

### 2.2 修改入口查找顺序, 简化导入代码
```js
resolve: {
  // 指定模块入口的查找顺序
  mainFields: ["style", "main"],
}
```
<div style="margin-bottom: 30px;"></div>


### 2.3 修改查找顺序, 简化导入代码
```js
resolve: {
  // 指定导入模块查找顺序
  extensions: [".css", ".js"]
}
```
<div style="margin-bottom: 30px;"></div>

### 2.4 修改搜索的目录
通过 `import` 导入模块的时候会先在 `node_modules` 中查找, 找不到再逐级向上查找,这样在打包的时候非常消耗性能, 能不能在打包的时候让 `webpack` 只去指定的目录查找, 那就是通过 `resolve` 的`modules`
```js
resolve: {
  // 指定查找范围, 告诉webpack只在node_modules中查找
  modules: ["node_modules"],
}
```
<div style="margin-bottom: 30px;"></div>

### 2.5 是否允许无扩展名(extension-less)文件
如果是 `true`，将不允许无扩展名(*extension-less*)文件。默认如果 `./foo` 有 `.js` 扩展，*require('./foo')* 可以正常运行。但如果启用此选项，只有 *require('./foo.js')* 能够正常工作。默认:
```js
enforceExtension: false
```
<div style="margin-bottom: 30px;"></div>


### 2.6 解析目录时要使用的文件名
```js
mainFiles: ["index"]
```
<div style="margin-bottom: 50px;"></div>


[官网](https://www.webpackjs.com/configuration/resolve/#resolve)