## DefinePlugin
***

### 简介
`DefinePlugin` 允许在编译时将你代码中的变量替换为其他值或表达式。这在需要根据开发模式与生产模式进行不同的操作时，非常有用.

<br></br>

### 基本用法
```js
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify('5fa3b9'),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: '1+1',
  'typeof window': JSON.stringify('object'),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
})
```

<br></br>

### 在增量构建中的应用
在 `vue-cli` 中只有以 `VUE_APP_` 开头的变量, `NODE_ENV`, `BASE_URL` 会被 `webpack.DefinePlugin` 静态嵌入到客户端侧的包中。你可以在应用的代码中这样访问它们,打印 `process.env` 也只能是这几种变量。[模式和环境变量](https://cli.vuejs.org/zh/guide/mode-and-env.html)
```js
console.log(process.env.VUE_APP_SECRET)
```

如果需要可以访问其他的环境变量，可以使用 `DefinePlugin`
```js
api.chainWebpack(webpackConfig => {
  webpackConfig
  .plugin('define')
    .use(require('webpack').DefinePlugin, [
      // ....
    ])
})

```
<br></br>

- [DefinePlugin](https://webpack.docschina.org/plugins/define-plugin#root)