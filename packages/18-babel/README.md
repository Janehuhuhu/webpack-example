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

## 4. 利用 babel 实现低版本语法
对于有对应关系的语法而言, 通过上述配置就已经能够实现自动转换了，但是对于没有对应关系的语法而言, 经过我们上节课的配置还不能实现自动转换。
什么叫有对应关系, 什么叫做没有对应关系?
有对应关系就是指 `ES5` 中有对应的概念,  例如: 箭头函数对应普通函数, `let` 对应`var`, 这个就叫做有对应关系，没有对应关系就是指 `ES5` 中根本就没有对应的语法, 例如 `Promise`, `includes` 等方法是 `ES678` 新增的, `ES5` 中根本就没有对应的实现, 这个时候就需要再增加一些额外配置, 让 `babel` 自己帮我们实现对应的语法。

### 4.1 方式一：全局配置
1）和 2）方式二选一，`babel-polyfill` 通过向全局对象和内置对象的 `prototype` 上添加方法来实现的, 所以这会造成全局空间污染。打包的 `bundle` 大小为 *451KB*（原 *7.19KB*），如此体积增长是因为 `webpack` 把 `babel-polyfill` 整体全部都打包进去了。而 `babel-polyfill` 肯定也实现了所有 `ES6` 新 `API` 的垫片,文件一定不会小

```js
// 安装依赖
npm install --save @babel/polyfill
```
#### 1）webpack.config.js
```js
// 入口
entry: ['babel-polyfill', path.join(__dirname, 'index.js')]
```

#### 2）在主入口文件的最顶层键入
```js
import 'babel-polyfill'
```
<div style="margin-bottom: 30px;"></div>

### 4.2 方式二：useBuiltIns
如果导入了 `polyfill` ,那么无论我们有没有用到不存在的语法都会打包到文件中
但是这样会增加打包后文件的大小, 我们希望的是只将用到的不存在语法打包到文件中,
那么就需要在 `webpack.config.js` 或 `babel` 中再配置一下，打包后 `bundle` 大小为 *63.9KB*。[配置详情](https://juejin.cn/post/6844904069866192910)

```js
// 配置
presets: [
  ["@babel/preset-env", {
    targets: {
      chrome: "58"
    },
    useBuiltIns: "usage",
    corejs: '2' // 指定 core-js 的版本
  }],
],
```
打包结果：
```js
// 全局变量方式引入
var core_js_modules_es6_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise_js__WEBPACK_IMPORTED_MODULE_1__);
return Promise.resolve('哈哈');\n})
```
<div style="margin-bottom: 30px;"></div>

### 4.3 方式三： babel-runtime
直接在文件中导入 `polyfill` 模块的弊端:
直接导入 `polyfill` 的方式只适用于一般项目开发, 但是如果是在编写一些第三方模块的时候这种方式会出现一些问题。因为这种方式是通过全局变量的方式来注入代码, 会污染全局环境. 所以我们再来以下配置方式。打包大小为 *95.4KB*

```js
// 安装依赖
npm install --save @babel/polyfill
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime // babel-plugin-transform-runtime 装了就不需要装 babel-runtime了，因为前者依赖后者

// 配置
plugins: [
  ["@babel/plugin-transform-runtime",
    {
      "absoluteRuntime": false,
      "corejs": 2,
      "helpers": true,
      "regenerator": true,
      "useESModules": false
    }
  ]
]
```
注意点:
- "corejs": false, 还是全局注入,还是会污染全局环境
- "corejs": 2, 则不会污染全局环境,但需要安装以下的包
```js
npm install --save @babel/runtime-corejs2
```
打包结果：
```js
// 不是以全局变量的方式引入
return _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default().resolve('哈哈')
```
<div style="margin-bottom: 50px;"></div>


- [官网](https://babeljs.io/)
- [@babel-preset-env](https://babeljs.io/docs/en/babel-preset-env)
- [babel-runtime](https://juejin.cn/post/6844904063402770439)

