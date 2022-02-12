## 1. less-loader
`less` 和 `sass` 是 `CSS` 预处理器, 它定义了一种新的语言，其基本思想是，用一种专门的编程语言，为 `CSS` 增加了一些编程的特性，将` CSS` 作为目标生成文件，然后开发者就只要使用这种语言进行 `CSS` 的编码工作。<br>
`less-loader` 自动将 `less` 转换为 `CSS`
<div style="margin-bottom: 50px;"></div>


## 2. less-loader 使用
### 2.1 安装 loader
```js
npm install --save-dev less less-loader
```
<div style="margin-bottom: 30px;"></div>

### 2.2 配置 less-loader
```js
{
  test: /\.less$/,
  use: [{
    loader: "style-loader"
  }, {
    loader: "css-loader"
  }, {
    loader: "less-loader" // 将 less 编译成 CSS
  }]
}
```

[官网](https://webpack.js.org/loaders/less-loader/)