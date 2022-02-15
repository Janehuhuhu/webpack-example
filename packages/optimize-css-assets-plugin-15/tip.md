## 1. mini-css-extract-plugin 压缩 css
### 3.1 安装 JS 代码压缩插件
```js
npm install --save-dev terser-webpack-plugin
```
<div style="margin-bottom: 30px;"></div>

### 3.2 安装 CSS 代码压缩插件
```js
npm install --save-dev optimize-css-assets-webpack-plugin
```
<div style="margin-bottom: 30px;"></div>

### 3.3 配置 webpack 优化项
由于配置了 `webpack` 的 `optimization.minimizer` 项目会覆盖默认的 `JS` 压缩选项, 所以 `JS` 代码也需要通过插件自己压缩
```js
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

optimization: {
  minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
}
```
注意： `mini-css-extract-plugin` 只在生产模式下有效
<div style="margin-bottom: 50px;"></div>


[官网](https://www.npmjs.com/package/mini-css-extract-plugin)