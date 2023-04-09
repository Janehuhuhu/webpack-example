## 1. css-loader
和图片一样 `webpack` 默认能不能处理 `CSS` 文件, 所以也需要借助 `loader` 将 `CSS` 文件转换为`webpack` 能够处理的类型
<div style="margin-bottom: 50px;"></div>


## 2. css-loader使用
### 2.1 安装 loader
```js
npm install --save-dev css-loader style-loader
```
<div style="margin-bottom: 30px;"></div>

### 2.3 配置css-loader
```js
{
  test: /\.css$/,
  use: [ 'style-loader', 'css-loader' ]
}
```
<div style="margin-bottom: 50px;"></div>


## 3. loader
### 3.1 执行顺序
- 单一原则, 一个 `loader` 只做一件事情, 配置中 `loader` 值都为 `string` 类型
- 多个loader会按照从右至左, 从下至上的顺序执行
```js
// 从右至左,先执行css-loader解析css文件关系拿到所有内容,再执行style-loader将内容插入到HTML的HEAD代码中
[ 'style-loader', 'css-loader' ]
      
// 例如: 从下至上,先执行css-loader解析css文件关系拿到所有内容,再执行style-loader将内容插入到HTML的HEAD代码中
[{
  loader: "style-loader"
},{
  loader: "css-loader"
}]
    
```
<div style="margin-bottom: 30px;"></div>

### 3.2 css-loader 和 style-loader 作用
- css-loader:  分析CSS 文件依赖关系，会对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样，默认生成一个数组存放存放处理后的样式字符串，并将其导出。
- style-loader: 从css-loader 解析的对象中提取css样式挂载到页面当中。具体而言把 CSS 插入到 DOM 中，就是处理css-loader导出的模块数组，然后将样式通过一个JS脚本创建一个style标签插入到DOM中。
详见[浅析css-loader和style-loader的作用](https://www.cnblogs.com/goloving/p/14793201.html#:~:text=style-loader%E5%92%8Ccss-loader%E4%BD%9C%E7%94%A8%E6%98%AF%E4%B8%8D%E5%90%8C%E7%9A%84%E3%80%82%201%E3%80%81css-loader%3A,%E5%8A%A0%E8%BD%BD.css%E6%96%87%E4%BB%B6%202%E3%80%81style-loader%EF%BC%9A%E4%BD%BF%E7%94%A8%3Cstyle%3E%E5%B0%86css-loader%E5%86%85%E9%83%A8%E6%A0%B7%E5%BC%8F%E6%B3%A8%E5%85%A5%E5%88%B0%E6%88%91%E4%BB%AC%E7%9A%84HTML%E9%A1%B5%E9%9D%A2)
<div style="margin-bottom: 50px;"></div>


## 4. css 模块化
默认情况下通过 `import "./xxx.css"` 导入的样式是全局样式, 也就是只要被导入, 在其它文件中也可以使用。
如果想要导入的 `CSS` 文件只在导入的文件中有效, 那么就需要开启 `CSS` 模块化。然后在导入的地方通过 `import xxx from "./xxx.css"` 导入,只有开启 `css` 模块化后 `xxx` 才生效, 然后在使用的地方通过 `xxx.className` 方式使用即可
### 4.1 使用方法
```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        modules: true  // 开启 css 模块化
      }
    }
  ]
}
```
注意：`import xxx from "./xxx.css"` 中 `xxx` 开启模块化后为包含 `class` 样式的对象，不开启时为 `undefined`
<div style="margin-bottom: 30px;"></div>

### 4.2 应用场景
[应用场景](https://juejin.cn/post/6844903934331453447)

[官网](https://webpack.js.org/loaders/css-loader/)

