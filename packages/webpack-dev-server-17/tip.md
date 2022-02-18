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


5. 利用 webpack-dev-server 重写请求路径
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


[官网](https://webpack.js.org/configuration/watch/)

@todo: `watch` 原理