## 1. optimize-css-assets-webpack-plugin 压缩 css
`webpack5` 中已经使用 `css-minimizer-webpack-plugin` 已经替代 `optimize-css-assets-webpack-plugin`

### 1.1 optimize-css-assets-webpack-plugin
#### 1.1 安装 JS 代码压缩插件
```js
npm install --save-dev terser-webpack-plugin
```
<div style="margin-bottom: 30px;"></div>

#### 1.2 安装 CSS 代码压缩插件
```js
npm install --save-dev optimize-css-assets-webpack-plugin
```
<div style="margin-bottom: 30px;"></div>

#### 1.3 配置 webpack 优化项
由于配置了 `webpack` 的 `optimization.minimizer` 项目会覆盖默认的 `JS` 压缩选项, 所以 `JS` 代码也需要通过插件自己压缩
```js
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

optimization: {
  minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
}
```
注意： `optimize-css-assets-webpack-plugin` 只在生产模式下有效
<div style="margin-bottom: 30px;"></div>

## 2. css-minimizer-webpack-plugin 压缩 css
### 2.1 安装依赖
```js
npm install css-minimizer-webpack-plugin --save-dev
```
<div style="margin-bottom: 30px;"></div>

### 2.2 配置
这将仅在生产环境开启 `CSS` 优化
```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};
```
<div style="margin-bottom: 30px;"></div>

在开发环境下启用 `CSS` 优化,
```js
module.exports = {
  optimization: {
    minimize: true,
  },
};
```


[css-minimizer-webpack-plugin](https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/)