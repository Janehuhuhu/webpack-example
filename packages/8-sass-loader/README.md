## 1. sass-loader
自动将 `scss` 转换为 `CSS`
<div style="margin-bottom: 50px;"></div>


## 2. sass-loader 使用
### 2.1 安装 sass
```js
npm install --save-dev node-sass sass-loader
```
<div style="margin-bottom: 30px;"></div>

### 2.2 配置 sass-loader
```js
{
  test: /\.scss$/,
  use: [{
    loader: "style-loader" // 将 JS 字符串生成为 style 节点
  }, {
    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
  }, {
    loader: "sass-loader" // 将 Sass 编译成 CSS
  }]
}
```

[官网](https://webpack.js.org/loaders/sass-loader/)