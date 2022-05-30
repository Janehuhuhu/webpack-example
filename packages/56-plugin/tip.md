## 1. 如何使用 Plugin?
安装插件, 创建插件即可
```js
new cleanWebpackPlugin()
```
综上所述得出一个结论: 插件是一个类
<div style="margin-top: 50px"></div>


## 2. Plugin 的特点
- `clean-webpack-plugin`, 会在打包之前清空指定目录
- `html-webpack-plugin`, 会在打包之后拷贝HTML文件并将打包好的文件插入到 `HTML` 中
综上所述得出一个结论: 插件可以在打包过程中的特定阶段执行
<div style="margin-top: 50px"></div>


## 3. Webpack 是如何实现在特点阶段执行插件代码的?
`Webpack` 通过 `Tapable` 在不同的阶段发送了不同的通知,我们只需要在编写插件时注册我们需要监听的通知即可。综上所述: 只要会编写类, 只要会使用 `Tapable` 订阅消息, 就会写插件
<div style="margin-top: 50px"></div>


## 4. 插件的基本格式
```js
class CustomPlugin {
    constructor(options){
        console.log("插件被创建了", options);
    }
    apply(compiler){
        console.log("插件被执行了", options);
    }
}
module.exports = CustomPlugin;
```
<div style="margin-top: 50px"></div>


## 5. compiler 参数
- 传入的 `compiler` 对象中包含了 `webpack` 打包的配置, 通过 `compiler.options` 获取
- 传入的 `compiler` 对象中除了包含 `webpack` 打包的配置以外,还包含了 `webpack` 各阶段消息发布者


例如:
- `entryOption` : 给 `webpack` 编译器传递配置文件之后
- `run` :   `webpack` 编译器 `run` 方法被执行
- `emit` :  打包文件写入之前
- `afterEmit` : 打包文件写入之后
- `done` :  打包完成
... ...
<div style="margin-top: 50px"></div>


## 6. Compiler 和 Compilation
`Compiler` 对象包含了 `Webpack` 环境所有的的配置信息，包含 `options，loaders，plugins` 这些信息，这个对象在 `Webpack` 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 `Webpack`实例；


`Compilation` 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 `Webpack` 以开发模式运行时，每当检测到一个文件变化，一次新的 `Compilation` 将被创建。`Compilation` 对象也提供了很多事件回调供插件做扩展。通过 `Compilation` 也能读取到 `Compiler` 对象。


`Compiler` 和 `Compilation` 的区别在于：`Compiler` 代表了整个 `Webpack` 从启动到关闭的生命周期，而 `Compilation` 只是代表了一次新的编译。