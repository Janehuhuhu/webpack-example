## 1. 如何自己实现一个Loader?
`Loader` 其实就是一个函数,我们只需要自定义一个模块, 在模块中暴露一个函数, 在函数中实现 `Loader` 相关的功能即可
<div style="margin: 50px"></div>

## 2. 手写Loader注意点
- 虽然说 `Loader` 就是一个函数, 但是这个函数必须是一个普通函数, 不能是箭头函数,因为 `webpack` 在调用 `Loader` 的时候会修改这个函数中的 `this`, 而如果是箭头函数 `webpack` 就不能修改了
- `webpack` 在调用 `Loader` 的时候会将打包文件的内容传递给实现 `Loader` 的函数,我们拿到内容后就可以对内容进行操作, 然后再将操作后的内容返回回去即可
- 一般在打包模块前，对内容读取后即进行 `loader` 操作，操作后再进行后续改写动作，如 `require`
<div style="margin: 50px"></div>


## 3. 如何处理Loader参数
在 `webpack.config.js` 中配置 `Loader` 的时候, 可以通过 `options` 配置一些额外的参数, 那么我们在编写 `Loader` 的时候如何拿到通过 `options` 传递过来的参数呢?
### 3.1 通过loader函数中的this获取
[this.query](https://www.webpackjs.com/api/loaders/#this-query)
```js
this.query.xxx
```

### 3.2 如何校验Loader参数
通过 `schema-utils` 模块来校验
```js
npm install --save-d schema-utils
let schema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    additionalProperties: false
}
validateOptions(schema, options, 'ReplaceLoader');
```

### 3.3 如何简化Loader的导入操作
如果需要使用自己编写的 `Loader`, 我们需要通过 `path` 指定 `loader` 的路径,可以通过webpack的resolveLoader配置来简化,像使用第三方 `loader` 一样, 只编写 `loader` 的名称
```js
resolveLoader:{
  alias: {
    ReplaceLoader : path.resolve(__dirname, "loader/ReplaceLoader.js")
  }
  // modules: [ 'node_modules', './loader'],
},
```
<div style="margin: 50px"></div>

- [官网](https://www.webpackjs.com/api/loaders/)