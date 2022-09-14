## 1. 什么是 externals?
`externals` 的作用就是将不会发生变化的第三方模块(库)设置为外部扩展,避免将这些内容打包到我们的项目中, 而是在运行时提供这些依赖,从而提升打包速度
<div style="margin-bottom: 50px;"></div>


## 2. externals使用
### 2.1 手动全局引入第三方模块
```js
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js"></script>
```
<div style="margin-bottom: 30px;"></div>


### 2.2 在配置文件中告诉 webpack 这是一个外部扩展库, 不需要打包
```js
/*
告诉webpack哪些第三方模块不需要打包
* */
externals: {
  /*
  以下配置的含义:
  告诉webpack我们在通过import导入lodash的时候, 不是导入node_modules中的lodash
  而是导入我们全局引入的lodash
  * */
  lodash: '_'
},
```
<div style="margin-bottom: 50px;"></div>


[externals](https://www.webpackjs.com/configuration/externals/)