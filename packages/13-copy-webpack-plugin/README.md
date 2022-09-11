## 1. 什么是 copy-webpack-plugin
在打包项目的时候除了 *JS/CSS/图片/字体图标* 等需要打包以外, 可能还有一些相关的文档也需要打包, 文档内容是固定不变的, 我们只需要将对应的文件拷贝到打包目录中即可,那么这个时候我们就可以使用 `copy-plugin` 来实现文件的拷贝
<div style="margin-bottom: 50px;"></div>

## 2. copy-webpack-plugin 使用
### 2.1 安装 copy-webpack-plugin
```js
npm install --save-dev copy-webpack-plugin
```
<div style="margin-bottom: 30px;"></div>

### 2.2 配置 copy-webpack-plugin
注意相对位置
```js
const CopyWebpackPlugin = require('copy-webpack-plugin');
new CopyWebpackPlugin({
  patterns: [
    { from: 'src/doc', to: 'doc' }
  ]
})
```
<div style="margin-bottom: 50px;"></div>

[官网](https://webpack.js.org/plugins/copy-webpack-plugin/)