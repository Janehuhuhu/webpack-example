## 1. 将打包之后的图片合成精灵图
过去为了减少网页请求的次数, 我们需要"UI设计师"给我们提供精灵图,并且在使用时还需要手动的去设置每张图片的位置, 但是有了 `webpack` 之后我们只需要让"UI设计师"给我们提供切割好的图片。我们可以自己合成精灵图, 并且还不用手动去设置图片的位置
<div style="margin-bottom: 50px;"></div>

## 2. 如何合并图片
利用 `postcss-sprites/webpack-spritesmith` 合并图片
```js
// webpack.config.js
output: {
  filename: 'js/bundle.js',
  path: path.resolve(__dirname, 'dist'),
  assetModuleFilename: 'imgs/[name][ext]' // 新增
},
module: {
  rules: [
    {
      test: /\.(jpg|jpeg|png|gif)$/,
      type: 'asset/resource'
    },
  ]
}
// postcss.config.js
module.exports = {
  plugins: {
    "postcss-sprites": {
      // 告诉webpack合并之后的图片保存到什么地方
      spritePath: "./dist/imgs",
        // 告诉webpack合并图片的时候如何分组
        groupBy: function (image) {
          // url: '../images/animal/animal1.png',
          let path = image.url.substr(0, image.url.lastIndexOf("/"));
          // console.log(path, "!!!!!!");
          let name = path.substr(path.lastIndexOf("/") + 1);
          // console.log(name, "!!!!!!!!");
          return Promise.resolve(name);
        },
        // 排除合并某某类型图片
        filterBy: function (image) {
          let path = image.url;
          if(!/\.png$/.test(path)){
              return Promise.reject();
          }
          return Promise.resolve();
        }
    }
  }
}
```
注意： 目前存在字体图片位置不准确的问题。<br>
当在 `webpack 5` 中使用旧的 `assets loader`（如 `file-loader/url-loader/raw-loader` 等）和 `asset` 模块时，你可能想停止当前 `asset` 模块的处理，并再次启动处理，这可能会导致 `asset` **重复**。所以我们用最新的特性 `type: asset/resource` 代替 `file-loader`。详情见[资源模块](https://webpack.docschina.org/guides/asset-modules/#root)
<div style="margin-bottom: 50px;"></div>


- [postcss-sprites](https://www.npmjs.com/package/postcss-sprites)
- [webpack-spritesmith](https://www.npmjs.com/package/webpack-spritesmith)