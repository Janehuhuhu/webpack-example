## 1. 什么是clean-webpack-plugin
`clean-webpack-plugin` 会在打包之前将我们指定的文件夹清空。应用每次打包前将 `dist` 目录清空, 然后再存放新打包的内容, 避免新老混淆问题
<div style="margin-bottom: 50px;"></div>


## 2. clean-webpack-plugin 使用
### 2.1 安装 clean-webpack-plugin
```js
npm install --save-dev clean-webpack-plugin
```
<div style="margin-bottom: 30px;"></div>

### 2.2 配置 clean-webpack-plugin
```
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
plugins: [new CleanWebpackPlugin()]
```
<div style="margin-bottom: 50px;"></div>

[官网](https://github.com/johnagan/clean-webpack-plugin)