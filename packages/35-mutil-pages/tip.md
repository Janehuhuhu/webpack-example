## 1. 需求利用webpack打包生成两个页面
一个页面叫做index, 一个页面叫做detail
<div style="margin-bottom: 50px;"></div>


## 2. 如何打包多也应用
- 有多少个界面就指定多少个入口, 并给不同的入口指定不同的名称
- 有多少个界面就创建多少个 `HtmlWebpackPlugin`, 并给不同的界面配置不同的名称
- 在 `HtmlWebpackPlugin` 中通过 `chunks` 属性告知需要插入到当前界面的文件

```js
entry: {
  index: "./src/js/index.js",
  detail: "./src/js/detail.js"
},

new HtmlWebpackPlugin({
  template: 'index.html',
  filename: 'index.html',
  chunks: ['index']
}),
new HtmlWebpackPlugin({
  template: 'index.html',
  filename: 'detail.html',
  chunks: ['detail']
}),
```