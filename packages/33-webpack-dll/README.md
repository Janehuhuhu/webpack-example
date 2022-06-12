## 1. 什么是dll动态链接库?
`dll` 动态链接库和 `externals` 功能其实是一样的,都是用于防止重复打包不会发生变化的第三方模块,
都是用于提升 `webpack` 打包效率的, 只不过 `externals` 不太符合前端的模块化思想, 所以就有了`dll` 动态链接库。优势在于不用手动插入，所有第三方库只会被打包一次
<div style="margin-bottom: 50px;"></div>


## 2. 如何实现让第三方模块只打包一次
### 2.1 单独配置一个config.js文件打包不会发生变化的第三方库
```js
module.exports = {
  mode: 'production',
  entry: {
    vendors: ['jquery', 'lodash']  // 'jquery'
  },
  output: {
    filename: '[name].js',  // name为entry的key
    path: path.resolve(__dirname, 'dll'),
    library: '[name]' // 表示打包的是一个库, 表示将打包的内容通过全局变量暴露出去
  }
};
```
<div style="margin-bottom: 30px;"></div>

### 2.2 通过插件将打包好的库引入到界面上
```js
npm install --save-d add-asset-html-webpack-plugin
new AddAssetHtmlWebpackPlugin({
    filepath: path.resolve(__dirname, 'dll/vendors.js')
})
```
注意点: 该插件需要配合 `HtmlWebpackPlugin` 使用, 并且需要在 `HtmlWebpackPlugin` 后创建
<div style="margin-bottom: 30px;"></div>

### 2.3 生成动态库的映射关系
因为我们有可能将几个库打包到一个文件中, 所以需要生成一个映射文件方便 `webpack` 能够从中找到对应的库
```js
plugins: [
  new Webpack.DllPlugin({
    name: '[name]',
    path: path.resolve(__dirname, 'dll/[name].manifest.json')
  })
]
```
注意点: 这里的 `name` 必须和 `library` 一致
<div style="margin-bottom: 30px;"></div>

### 2.4 告诉webpack去哪里查找动态库
在打包的时候如何 `webpack` 回到指定的映射文件中查找对应的动态库,找到了那么就不会重新打包动态库中的内容了, 如果找不到才会重新打包
```js
new Webpack.DllReferencePlugin({
  manifest: path.resolve(__dirname, 'dll/vendors.manifest.json')
})
```
注意：`add-asset-html-webpack-plugin` 会在工程打包中引入 `dll.js` 库，因为版本问题导入 `html` 中的 `dll` 文件路径总是带有 `auto/`, 导致解析路径错误，暂未找到合适版本