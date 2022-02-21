## 1. 什么是watch?
`webpack` 可以监听打包文件变化，当它们修改后会重新编译打包
<div style="margin-bottom: 50px;"></div>

## 2. watch相关配置 watchOptions
```js
watch: true,
watchOptions: {
  aggregateTimeout: 300, // 防抖, 和函数防抖一样, 改变过程中不重新打包, 只有改变完成指定时间后才打包
  poll: 1000, // 每隔多少时间检查一次变动
  ignored: /node_modules/ // 排除一些巨大的文件夹, 不需要监控的文件夹
},
```

注意：
需要将 `cleanWebpackPlugin` 关闭，防止监听到改变时把没有改变的文件给清除了，即`index.html` 会被清除 (暂未复现)
<div style="margin-bottom: 50px;"></div>


## 3. 前端跨域问题
同源策略（`Same origin policy`）是一种约定，它是浏览器最核心也最基本的安全功能
所谓同源是指: 协议，域名，端口都相同,就是同源, 否则就是跨域
```js
http://127.0.0.1:8080
http://127.0.0.1:8080  // 同源

http://127.0.0.1:8080
http://127.0.0.1:9090  // 跨域
```
<div style="margin-bottom: 50px;"></div>


## 4. 利用 webpack-dev-server 代理解决跨域问题
所有 `api` 开头的请求都会被代理到 `target`，`src/js/index.js` 向后端发送的请求, 例如: 我们发送请求地址: `http://127.0.0.1:9090/api`, 实际发送请求地址: `http://127.0.0.1:3000/api`

```js
devServer: {
  open: true,
  port: 9090,
  proxy: {
    "/api": {
      target: "http://127.0.0.1:3000", // 代理地址
      changeOrigin: true, // 域名跨域
      secure: false,  // https跨域
    }
  }
}

// 类似path请求合并
devServer: {
  open: true,
  port: 9090,
  proxy: [{
    context:["/api", "/login"],
    target: "http://127.0.0.1:3000", // 代理地址
    changeOrigin: true, // 域名跨域
    secure: false,   // https跨域
  }]
}
```
<div style="margin-bottom: 50px;"></div>


## 5. 利用 webpack-dev-server 重写请求路径
```js
proxy: [{
  context:["/api", "/login"],
  target: "http://127.0.0.1:3000", // 代理地址
  changeOrigin: true,     // 域名跨域
  secure: false,          // https跨域
  pathRewrite:{"": "/api"} // 路径重写, 将路径中的空替换为api,针对服务器中访问路径修改（统一添加api前缀），但不想修改前端请求的情况
}]
```
<div style="margin-bottom: 50px;"></div>

## 6. 热更新
### 6.1 什么是HMR

1）通过 `webpack-dev-server` 自动打包并没有真正的放到指定的目录中,因为读写磁盘是非常耗时和消耗性能的,所以为了提升性能`webpack-dev-server` 将转换好的内容直接放到了内存中

2）通过 `webpack-dev-server` 可以实现实时监听打包内容的变化,每次打包之后都会自动刷新网页, 但是正是因为每当内容被修改时都会自动刷新网页所以给我们带来了很多不便（比如点击按钮动态添加的内容在重新刷新后没有了）, 这时就需要通过HMR插件来优化调试开发

3）`HMR`(*HotModuleReplacementPlugin*)热更新插件,会在内容发生改变的时候时时的更新修改的内容（即将变化的内容应用到网页中）但是不会重新刷新网站
<div style="margin-bottom: 30px;"></div>

### 6.2 HMR 使用
`HotModuleReplacementPlugin` 是一个内置插件, 所以不需要任何安装直接引入`webpack` 模块即可使用
<div style="margin-bottom: 30px;"></div>

### 6.3 在 devServer 中开启热更新
从 *webpack-dev-server v4* 开始，`HMR` 是默认启用的。它会自动应用 `webpack.HotModuleReplacementPlugin`, 即 *6.3* 中所述配置均是不需要的
1）配置
```js
hot: true, // 开启热更新
hotOnly: true // 即使热更新不生效，浏览器也不自动刷新。即如果hot: false，也不会刷新网页。但如果hot: false，且没有设置hotOnly，则会刷新网页
```

2）在 webpack.config.js 中创建热更新插件
```js
new Webpack.HotModuleReplacementPlugin()
```

3）注意点:
如果是通过 `style-loader` 来处理 `CSS`, 那么经过前面两步就已经实现了热更新,如果是通过 `MiniCssExtractPlugin.loader` 来处理 `CSS`, 那么还需要额外配置 `MiniCssExtractPlugin.loader`
```js
options:{
    hmr: true
}
```

<div style="margin-bottom: 50px;"></div>

## 7. JS 模块使用 HMR 注意点
### 7.1 注意
```js
import "./index.less"
``` 
对于 `css` 模块而言, 在 `css-loader` 中已经帮我们实现了热更新, 只要 `css` 代码被修改就会立即更新

```js
import copy from "./test.js"
```

但是对于 `js` 模块而言, 系统默认并没有给我们实现热更新, 所以修改了 `js` 模块代码并不会立即更新

### 7.2 JS 模块如何实现热更新
```js
// 手动监听模块变化
if (module.hot) { // 判断是否开启热更新
  module.hot.accept("./test.js", function () { // 监听指定JS模块变化
    let div = document.querySelector("div")
    document.body.removeChild(div)
    addSpan() // 重新渲染逻辑
  })
}
```

[官网](https://webpack.js.org/configuration/dev-server/)

@todo: `watch` 原理