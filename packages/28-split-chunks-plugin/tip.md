## 1. 什么是 Code-Splitting(代码分割)?
默认情况下 `webpack` 会将所有引入的模块都打包到一个文件中,这样就导致了打包后的文件比较大, 以及修改文件后用户需要重新下载所有打包内容问题。<br>
例如: 在 `a.js` 中引入了 `b.js`, 那么 `a.js` 和 `b.js` 都会被打包到 `bundle.js` 中, 如果 `a.js` 有 *1MB*, `b.js` 也有 `1MB`, 那么打包之后的文件就有 `2MB`, 那么用户第一次打开网页的时候就需要下载 *2MB* 的文件。问题的关键在于, 如果我们修改了 `a.js`, 但没有修改 `b.js`, 重新打包后用户需要重新下载新打包的文件(因为用户本地缓存的是 `a` 和 `b` 的合体),这样就导致了每次修改了其中一个文件用户都要重新下载所有内容<br>

解决方案: 将不经常修改的内容打包到另一个文件中, 这样每次修改后用户就只用下载修改后的文件,没有被修改的文件由于用户上一次打开已经缓存在了本地就不用下载了, 这样性能也提升了<br>

`Code-Splitting` 就是将不经常修改的模块打包到单独的文件中, 避免每次修改用户都需要重新下载所有内容, 实现按需加载或并行加载这些文件
<div style="margin-bottom: 50px;"></div>

## 2. 代码分离方法
- 入口起点：使用 `entry` 配置手动地分离代码
- 防止重复：使用 `Entry dependencies` 或者 `SplitChunksPlugin` 去重和分离 `chunk`
- 动态导入：通过模块的内联函数调用来分离代码
<div style="margin-bottom: 50px;"></div>


## 3. 如何开启 Code-Splitting
### 3.1 手动分割 - 不共享文件
修改配置文件同时打包多个文件
```js
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },
    output: {
    filename: 'main.js',
    filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
};
```
存在问题：如果入口 `chunk` 之间包含一些重复的模块，那些重复模块都会被引入到各个 `bundle` 中。这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来。
<div style="margin-bottom: 30px;"></div>

### 3.2 手动分割 - 不共享文件
配置 `dependOn option` 选项，这样可以在多个 `chunk` 之间共享模块
```js
module.exports = {
  mode: 'development',
  entry: {
  index: './src/index.js',
  another: './src/another-module.js',
  index: {
    import: './src/index.js',
    dependOn: 'shared',
  },
  another: {
    import: './src/another-module.js',
    dependOn: 'shared',
  },
  shared: 'lodash',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
// 暂未发现作用
optimization: {
  runtimeChunk: 'single',
},
```
<div style="margin-bottom: 30px;"></div>

### 3.3 自动分割
`webpack` 会自动判断是否需要分割, 如果需要会自动帮助我们风格
```js
optimization: {
  splitChunks: {
    chunks: "all"
  }
},
```
<div style="margin-bottom: 50px;"></div>


## 4. 动态导入（异步加载）
```js
// 同步加载,例如: 在 `index.js` 中导入了 *10* 个模块, 那么只要 `index.js` 被执行, 就会一次性将 *10* 个模块加载进来
import $ from 'jquery';
// 异步加载, 例如: 在 `index.js` 中导入了 *10* 个模块, 那么哪怕 `index.js` 被执行, 也要看是否满足加载条件才去加载
import('jquery').then(({default: $ }) => {使用模块代码});
```
```js
// 例如
function getComponent() {
 return import('lodash')
   .then(({ default: _ }) => {
     const element = document.createElement('div');
     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
     return element;
   })
   .catch((error) => 'An error occurred while loading the component');
}
getComponent().then((component) => {
 document.body.appendChild(component);
});
```

注意：
- `import()` 是提案中的语法，使用的时候需要修改 `eslintrc` 中的* "ecmaVersion": 11* 
- 对于异步加载的模块无需配置, `webpack` 会自动分割，不需要加 `splitchunks` 配置
<div style="margin-bottom: 50px;"></div>


## 5. Split-Chunks-Plugin
`webpack` 在代码分割的时候底层使用的其实是 `Split-Chunks-Plugin` 来实现代码分割的
所以这个插件的作用就是进行代码分割

2.Split-Chunks-Plugin相关配置
```js
optimization: {
  splitChunks: {
    chunks: 'all', // 对那些代码进行分割 async(只分割异步加载模块)、all(所有导入模块),initial 中 async 也会被分割
    minSize: 10, // 表示被分割的代码体积至少有多大才分割(单位是字节), async 无论大小一定会被分割
    minChunks: 1,  //  表示至少被引用多少次数才分割，默认为1
    maxAsyncRequests: 5, // 异步加载并发最大请求数(保持默认即可)
    maxInitialRequests: 3, // 最大的初始请求数(保持默认即可)
    automaticNameDelimiter: '~', // 命名连接符
    cacheGroups: { // 缓存组, 将当前文件中导入的所有模块缓存起来统一处理
      vendors: { // 分割从node_modules目录中导入的模块
        test: /[\\/]node_modules[\\/]/,
        priority: -10, // 优先级, 值越小越优先
        name: 'vendor' // 打包出来的包命名，可以为 false、function、string
      },
      default: { // 分割从任意导入的模块,包含node_modules模块，但是优先级不高
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true, // 如果当前代码块包含的模块已经有了，就不在产生一个新的代码块
        name: 'common'
      }
    }
  },
},
```
<div style="margin-bottom: 50px;"></div>


### FAQ
1、 `webpack5` 打包文件中存在 *.LICENSE.txt* 文件
[详情](https://stackoverflow.com/questions/64818489/webpack-omit-creation-of-license-txt-files)
```js
optimization: {
  minimizer: [new TerserPlugin({
    extractComments: false,  // .LICENSE.txt 为注释文件
  })],
},
```
<div style="margin-bottom: 50px;"></div>


- [code-splitting](https://webpack.docschina.org/guides/code-splitting/)
- [split-chunks-plugin](https://www.webpackjs.com/plugins/split-chunks-plugin/)
- [代码拆分模式详解](https://segmentfault.com/a/1190000020759399)