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

[官网](https://webpack.js.org/configuration/watch/)
