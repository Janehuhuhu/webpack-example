## 1. Loader中有异步操作
可以通过以下代码返回异步操作的结果
```js
let callback = this.async();
callback(null, result, map, meta);
```
- 第一个参数必须是 `Error` 或者 `null`
- 第二个参数是返回结果是一个 `string` 或者 `Buffer。`
- 可选的：第三个参数必须是一个可以被这个模块解析的 `source map`。
- 可选的：第四个选项，会被 `webpack` 忽略，可以是任何东西（例如一些元数据）

- [官网](https://www.webpackjs.com/api/loaders/#this-callback)