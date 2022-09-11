
## 1. 什么是loader?
`webapck` 的本质是一个模块打包工具, 所以 `webpack` 默认只能处理 `JS` 文件,不能处理其他文件,因为其他文件中没有模块的概念, 但是在企业开发中我们除了需要对 `JS` 进行打包以外,还有可能需要对图片/CSS等进行打包, 所以为了能够让`webpack` 能够对其它的文件类型进行打包,在打包之前就必须将其它类型文件转换为 `webpack` 能够识别处理的模块,用于将其它类型文件转换为 `webpack` 能够识别处理模块的工具我们就称之为 `loader`。
<div style="margin-bottom: 50px;"></div>


## 2. 如何使用loader
`webpack` 中的 `loader` 都是用 `NodeJS` 编写的, 但是在企业开发中我们完全没有必要自己编写,
因为已经有众多大神帮我们编写好了企业中常用的`loader`, 我们只需要安装、配置、使用即可: 
- 2.1 通过npm安装对应的 `loader`
- 2.2 按照loader作者的要求在 `webpack` 进行相关配置
- 2.3 使用配置好的 `loader`
<div style="margin-bottom: 50px;"></div>


## 3. file-loader 使用
### 3.1 安装file-loader
```js
npm install --save-dev file-loader
```
<div style="margin-bottom: 30px;"></div>

### 3.2 在 *webpack.config.js* 中配置
```js
module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // 指定打包后文件名称
              name: '[name].[ext]',
              // 指定打包后文件存放目录
              outputPath: 'images/',
              // 指定托管服务器地址(统一替换图片地址)
              publicPath: 'http://www.it666.com/images/'
            }
          }
        ]
      }
    ]
  }
```
<div style="margin-bottom: 50px;"></div>


## 4. 坑点
Q：使用 `require` 引入图片时，图片加载不出来，`import` 方式可以加载出来？<br>
A：因为 `file-loader` 默认使用 `es6` 模块的导出引入方式,所以 `require` 无法解析。解决办法：
```js
// webpack配置中添加 esModule: false
  {
    test: /\.(jpg|png|gif)$/,
    use: [{
      loader: 'file-loader',
      options: {
        esModule: false,  // 是否使用es6模块的导出,默认为true
        name: '[name].[ext]',
        outputPath: './imgs'
      }
    }]
  }
  ```

[官网](https://v4.webpack.docschina.org/loaders/file-loader/)