## 1. 什么是 mini-css-extract-plugin
前面我们通过 `style-loader` 打包的 `CSS` 都是直接插入到 `head` 中的, 而 `mini-css-extract-plugin` 是一个专门用于将打包的 `CSS` 内容提取到单独文件的插件
<div style="margin-bottom: 50px;"></div>

## 2. 为什么需要将 css 提取成单独文件
在这之前，开发环境（development）是使用 `style-loader` ，这样引入 `js` 的时候，就会把样式插入到 `style` 当中，因为 `style-loader` 内部实现了 `HMR` 功能，故在开发环境中的打包性能就会更好，打包速度就会更快。但是在生产环境（production）中，更建议使用 `mini-css-extract-plugin` 将 `css` 文件单独提取出来。

将 `css` 文件单独提取出来，那么就可以先在页面的最前面引入这个单独的 `css` 文件，浏览器先解析了 `css` 文件就会生成 `cssom` 树，从而与 `dom tree` 生成渲染树从而以最快速度渲染出页面。如果放在 `js` 文件中，不仅会增加 `js` 文件体积，使 `js` 文件的下载时间延长，而且进行解析 `js` 文件(需要从 `js` 中解析到 `style` 中)往往都是在 `dom` 树生成之后，那么这两者增加的延迟会大大影响渲染速度，削弱用户体验。

- `JS、CSS` 资源无法并行加载，从而降低页面性能；
- 资源缓存粒度变大，`JS、CSS` 任意一种变更都会致使缓存失效。
<div style="margin-bottom: 50px;"></div>


## 3. mini-css-extract-plugin 使用
### 3.1 mini-css-extract-plugin 安装
```js
npm install --save-dev mini-css-extract-plugin
```
<div style="margin-bottom: 30px;"></div>

### 3.2 配置 mini-css-extract-plugin
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
new MiniCssExtractPlugin({
  filename: './css/[name].css',
})
```
<div style="margin-bottom: 30px;"></div>

### 3.3 替换 style-loader
```js
{
  test: /\.(css|less|scss)$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'less-loader'
    }
  ]
},
```

注意点: 如果相关文件资源无法显示, 需要根据打包后的结构手动设置公开路径
```js
options: {
    publicPath: "xxx"
}
```
<div style="margin-bottom: 50px;"></div>


[官网](https://webpack.js.org/plugins/mini-css-extract-plugin/)