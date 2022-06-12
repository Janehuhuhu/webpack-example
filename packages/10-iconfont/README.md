## 1. 如何打包字体图标
字体图标中也用到了 `url` 用到了文件, 所以我们需要通过 `file-loader` 来处理字体图标文件
```js
{
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  use:[{
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
      outputPath: "font/",
    }
  }]
}
```