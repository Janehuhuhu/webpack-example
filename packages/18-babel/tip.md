## 1. webpack-ES6 语法处理
在企业开发中为了兼容一些低级版本的浏览器, 我们需要将 `ES678` 高级语法转换为`ES5` 低级语法,否则在低级版本浏览器中我们的程序无法正确执行。默认情况下 `webpack` 是不会将我们的代码转换成 `ES5` 低级语法的, 如果需要转换我们需要使用 `babel` 来转换
<div style="margin-bottom: 50px;"></div>

## 2. 如何使用 babel
### 2.1 安装转换到 ES5 的相关包
```js
npm install --save-dev babel-loader @babel/core  @babel/preset-env
```
<div style="margin-bottom: 30px;"></div>

### 2.2 配置 babel
```js
{
  test: /\.js$/,
  exclude: /node_modules/,  // 不做处理的目录
  loader: "babel-loader",
  options: {
    presets: ["@babel/preset-env"],
  },
}
// 或
test: /\.js$/,
use: [{
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env']
  }
}],
```
<div style="margin-bottom: 50px;"></div>

## 3. presets 优化
在实际企业开发中默认情况下 `babel` 会将所有高于 `ES5` 版本的代码都转换为 `ES5` 代码, 但是有时候可能我们需要兼容的浏览器已经实现了更高版本的代码, 那么这个时候我们就不需要转换。因为如果浏览器本身已经实现了, 我们再去转换就会增加代码的体积,就会影响到网页的性能。所以我们通过配置`presets` 的方式来告诉 `webpack` 我们需要兼容哪些浏览器, 然后 `babel` 就会根据我们的配置自动调整转换方案, 如果需要兼容的浏览器已经实现了, 就不转换了。
```js
// webpack.config.js
{
  test: /\.js$/,
  exclude: /node_modules/,  // 不做处理的目录
  loader: "babel-loader",
  options: {
    presets: [["@babel/preset-env", {
      targets: {
        chrome: '58'
      }
    }]],
  },
},

// babel.config.js, 注意：在 babel 配置文件中配置，一定要在 webpack.config.js 中开启 babel-loader
module.exports = {
  presets: [
    ["@babel/preset-env", {
      targets: {
        chrome: "58"
      }
    }]
  ]
}
```
<div style="margin-bottom: 50px;"></div>

- [官网](https://babeljs.io/)
- [@babel-preset-env](https://babeljs.io/docs/en/babel-preset-env)