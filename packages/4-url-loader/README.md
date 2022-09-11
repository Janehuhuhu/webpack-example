## 1. url-loader
`url-loader` 功能类似于 `file-loader` ，也是默认使用 `es6` 模块的导出引入方式,所以 `require` 无法解析, 可使用 `esModule: false` 解决。但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 `DataURL`
<div style="margin-bottom: 50px;"></div>


## 2. url-loader 使用
### 2.1 安装url-loader
```js
npm install --save-dev url-loader
```
<div style="margin-bottom: 30px;"></div>


### 2.2 配置 url-loader
```js
{
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        name: "[name].[ext]",
        outputPath: "/images",
        /*
        limit: 指定图片限制的大小如果被打包的图片超过了限制的大小, 就会将图片保存为一个文件。如果被打包的图片没有超过限制的大小, 就会将图片转换成base64的字符串
        * */
        limit: 1024
      }
    }
  ]
}
```

优势:
- 图片比较小的时候直接转换成 `base64` 字符串图片, 可以提升网页的性能(因为减少了请求的次数)
- 对于比较大的图片, 哪怕我们将图片转换成了base64的字符串之后, 也不会提升网页的性能, 还有可能降低网页的性能。(因为图片如果比较大, 那么转换之后的字符串也会比较多, 那么网页的体积就会变大, 那么访问的速度就会变慢)

[官网](https://v4.webpack.js.org/loaders/url-loader/)