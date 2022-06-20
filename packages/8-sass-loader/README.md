## 1. sass-loader
自动将 `scss` 转换为 `CSS`
<div style="margin-bottom: 50px;"></div>


## 2. sass-loader 使用
### 2.1 安装 sass
```js
npm install --save-dev node-sass sass-loader
```
<div style="margin-bottom: 30px;"></div>

### 2.2 配置 sass-loader
```js
{
  test: /\.scss$/,
  use: [{
    loader: "style-loader" // 将 JS 字符串生成为 style 节点
  }, {
    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
  }, {
    loader: "sass-loader" // 将 Sass 编译成 CSS
  }]
}
```

- [官网](https://webpack.js.org/loaders/sass-loader/)
- [vue sass-loader 配置](https://vue-loader.vuejs.org/zh/guide/pre-processors.html#sass-vs-scss)
  - 可共享全局变量，[css.loaderOptions](https://cli.vuejs.org/zh/config/#css-loaderoptions)
  - ```js
      projectOptions.css.loaderOptions = {
        sass: {
          // 如果 sass-loader 版本 = 8，这里使用 `prependData` 字段
          // 如果 sass-loader 版本 < 8，这里使用 `data` 字段
          data: Object.keys(styleVariables) // styleVariables 在 vue.config.js pluginOptions 中定义
            .map(key => `$${key}: ${styleVariables[key]};`)
            .join('\n'),
        },
      }
    ```
