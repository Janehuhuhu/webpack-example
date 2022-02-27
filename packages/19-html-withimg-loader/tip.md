## 1. 什么是 html-withimg-loader
我们通过 `file-loader` 或者 `url-loader` 已经可以将 `JS` 或者 `CSS` 中用到的图片打包到指定目录中了, 但是 `file-loader` 或者 `url-loader` 并不能将 `HTML` 中用到的图片打包到指定目录中, 所以此时我们就需要再借助一个名称叫做`html-withimg-loader`的加载器来实现 `HTML` 中图片的打包
<div style="margin-bottom: 50px;"></div>

## 2. html-withimg-loader 使用
```js
// 安装html-withimg-loader
npm install html-withimg-loader --save

// 配置html-withimg-loader
{
  test: /\.(htm|html)$/i,
  loader: 'html-withimg-loader'
}
```

注意：
如果在打包后的 `html` 文件的 `img` 标签中出现 `default`,则需要在以下 `loader` 中设置 `esModule`。另外，发现一个奇怪的点：*HtmlWebpackPlugin* 存在模版时，打包出的 `html` 会被压缩
```js
{
  test: /\.(jpg|jpeg|png|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'imgs',
        esModule: false
      }
    },
  ]
},
```


[官网](https://www.npmjs.com/package/html-withimg-loader)