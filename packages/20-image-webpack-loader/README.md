## 1. 图片压缩和合并
在企业开发中为了提升网页的访问速度, 我们除了会压缩 *HTML/CSS/JS* 以外,还会对网页上的图片进行压缩和合并, 压缩可以减少网页体积, 合并可以减少请求次数。
<div style="margin-bottom: 50px;"></div>

## 2. 如何压缩图片
每次在打包图片之前,我们可以通过配置`webpack` 对打包的图片进行压缩, 以较少打包之后的体积
```js
// 安装依赖
npm install image-webpack-loader --save-dev

// 配置，官网可直接找到
{
  loader: 'image-webpack-loader',
  options: {
    mozjpeg: {
      progressive: true,
    },
    optipng: {
      enabled: false,
    },
    pngquant: {
      quality: [0.65, 0.90],
      speed: 4
    },
    gifsicle: {
      interlaced: false,
    },
    webp: {
      quality: 75
    }
  }
},
```
<div style="margin-bottom: 50px;"></div>


[官网](https://www.npmjs.com/package/image-webpack-loader)