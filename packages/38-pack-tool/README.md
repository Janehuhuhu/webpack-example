## 1. webpack打包内容分析
- 1.通过我们的观察, 发现 `webpack` 打包之后的内容被放到了一个自调用函数中
- 2.会将入口文件的路径作为 `key`,入口文件的内容作为 `value` 放到一个对象中传递给自调用函数
- 3.在自调用函数中实现了 `require` 方法, 并且调用了自己实现的 `require` 方法
- 4.在调用自己实现的 `require` 时将入口文件路径作为 `key` 传递进去, 在内容通过这个路径取出对应的函数执行
<div style="margin: 50px"></div>

## 2. 如何打包文件?
- 首先需要本地安装 `webpack`
- 然后需要定制打包配置文件
- 然后可以通过 `npx webpack` 对指定文件进行打包

所以综上所述 `webpack` 就是一个工具模块, 提供了 `webpack` 指令, 所以要想实现 `webpack` 必须先实现一个工具模块, 这里定义的是 `njpack`。定义后先执行 `npm link` 将 `npm` 模块链接（`yarn link`不行到对应的运行项目中去，在项目中执行 `yarn link xx` 方便地对模块进行调试和测试）,详见 [npm link 使用](https://www.jianshu.com/p/aaa7db89a5b2)
<div style="margin: 50px"></div>


## 3. 思路
- 建立 `mjs` 打包模版文件
- 获取所有的模块信息，模块名称，和模块对应的代码内容
- 解析每个模块代码内容，`require` => `__webpack_require__`, 修改模块路径（加上入口跟路径）
- 渲染模版，并将最终的打包文件写入目录中
<div style="margin: 50px"></div>


## 4. 打包单/多文件
- 对比单文件来说在传入的对象中多了依赖模块的路径和内容
- 对比单文件来说主模块函数需要接收自定义require方法
- 对比单文件来说需要在依赖模块的路径的前面加上主模块路径
<div style="margin: 50px"></div>


## 5.什么是EJS?
`EJS` 和前面我们学习的 `artTemplate` 一样, 都是模板引擎,不同的是 `artTemplate` 使用生成 `HTML`, 而 `EJS` 用于生成 `JS`