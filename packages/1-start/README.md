## 1. 什么是webpack?
`webpack` 是一套基于 `NodeJS` 的"模块打包工具", 在 `webpack` 刚推出的时候就是一个单纯的 `JS` 模块打包工具,可以将多个模块的 `JS` 文件合并打包到一个文件中, 但是随着时间的推移、众多开发者的追捧和众多开发者的贡献, 现在 `webpack` 不仅仅能够打包 `JS` 模块, 还可以打包 `CSS/LESS/SCSS/图片` 等其它文件
<div style="margin-bottom: 50px;"></div>


## 2. 为什么要分模块?
如果将所有的 `JS` 代码都写到一个文件中, 十分不利于代码的维护和复用, 所以我们可以将不同的功能写到不同的模块中, 这样就提升了代码的维护性和复用性
但是当将代码写到不同模块时新的问题又出现了,
- 例如: 导入资源变多了, 请求次数变多了, 网页性能也就差了
- 例如: 不同功能都放到了不同模块中了, 那么如何维护模块之间的关系也变成一个难题了
```js
// 如果index.js中用到了footer,就会报错
<script src="./header.js"></script>
<script src="./content.js"></script>
<script src="./index.js"></script>
<script src="./footer.js"></script>
```
<div style="margin-bottom: 50px;"></div>


## 3. 如何解决上述问题
- 项目上线时将用到的所有模块都合并到一个文件中
- 在 `index.html` 中只导入主文件, 再主文件中再导入依赖模块
<div style="margin-bottom: 50px;"></div>


## 4. 如何通过webpack来打包JS模块
### 4.1 安装 webpack
```js
npm init -y
npm install --save-dev webpack
npm install --save-dev webpack-cli
```
<div style="margin-bottom: 30px;"></div>

### 4.2 在终端中输入打包的指令
```js
npx webpack --entry index.js

// index.js文件得写入src中，会从src中自动解析入口文件
npx webpack
```

注意点:
`index.js` 就是需要打包的文件
打包之后的文件会放到 `dist` 目录中, 名称叫做 `main.js`
<div style="margin-bottom: 50px;"></div>


## 5. 什么是 webpack 配置文件?
我们在打包 `JS` 文件的时候需要输入:  `npx webpack --entry index.js`, 这句指令的含义是: 利用 `webpack` 将 `index.js` 和它依赖的模块打包到一个文件中。其实在 `webpack` 指令中除了可以通过命令行的方式告诉 `webpack` 需要打包哪个文件以外, 还可以通过配置文件的方式告诉 `webpack` 需要打包哪个文件
<div style="margin-bottom: 50px;"></div>


## 6. webpack 常见配置
- entry: 需要打包的文件
- output: 打包之后输出路径和文件名称
- mode: 打包模式  development/production
  - development: 不会压缩打包后的JS代码
  - production:  会自动压缩打包后的JS代码
<div style="margin-bottom: 50px;"></div>


## 7. webpack 配置注意事项
配置文件的名称必须叫做: `webpack.config.js`, 否则直接输入 `npx webpack` 打包会出错
如果要使用其它名称, 那么在输入打包命令时候必须通过 `--config` 指定配置文件名称
```js
npx webpack --config xxx
```