## 1. 什么是插件(plugin)
`plugin` 用于扩展 `webpack` 的功能。
当然 `loader` 也是变相的扩展了 `webpack` ，但是它只专注于转化文件这一个领域。而 `plugin` 的功能更加的丰富，而不仅局限于资源的加载
<div style="margin-bottom: 50px;"></div>

## 2. 什么是HtmlWebpackPlugin
`HtmlWebpackPlugin` 会在打包结束之后自动创建一个 `index.html`, 并将打包好的 `JS` 自动引入到这个文件中
<div style="margin-bottom: 50px;"></div>

## 3. HtmlWebpackPlugin 使用
### 3.1 安装 HtmlWebpackPlugin
```js
npm install --save-dev html-webpack-plugin
```
<div style="margin-bottom: 30px;"></div>

### 3.2 配置HtmlWebpackPlugin
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
plugins: [new HtmlWebpackPlugin()]
```
<div style="margin-bottom: 50px;"></div>

## 4. HtmlWebpackPlugin 高级使用
默认情况下 `HtmlWebpackPlugin` 生成的 `html` 文件是一个空的文件,如果想指定生成文件中的内容可以通过配置模板的方式来实现
```js
plugins: [new HtmlWebpackPlugin({
  template: "index.html"
})]
```

默认情况下生成 `html` 文件并没有压缩,
如果想让 `html` 文件压缩可以设置,或者直接设置 `minify： true`
```js
new HtmlWebpackPlugin({
  template: "index.html",
  minify: {
    collapseWhitespace: true
  }
})]
```


- [官网](https://webpack.js.org/plugins/html-webpack-plugin/)
- [配置](https://juejin.cn/post/6844903853708541959)