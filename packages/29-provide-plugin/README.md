## 1. 模块各种引入方式
### 1.1 在 HTML 中全局引入
```js
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
```
特点: 什么地方都可以使用
<div style="margin-bottom: 30px;"></div>


### 1.2 通过 npm 安装通过 import 局部引入
特点: 只能在 `import` 导入的模块中使用
<div style="margin-bottom: 50px;"></div>


## 2. 什么是 Provide-Plugin?
自动加载模块，而不必到处 `import` 或 `require`。默认情况下模块中的数据都是私有的, 所以想要使用模块必须先导入模块。如果说在 `a.js` 中想要使用 `jQuery`, 那么就必须在 `a.js` 中导 `jQuery` 模块; 如果说在 `b.js` 中想要使用 `jQuery`, 那么就必须在 `b.js` 中导入 `jQuery` 模块
```js
new Webpack.ProvidePlugin({
  _: "lodash"
})

// 带有属性
new webpack.ProvidePlugin({
  _map: ['lodash', 'map']
})
```
<div style="margin-bottom: 50px;"></div>


[官网](https://www.webpackjs.com/plugins/provide-plugin/)