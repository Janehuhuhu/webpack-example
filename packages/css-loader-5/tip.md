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
- css-loader:   解析css文件中的@import依赖关系
- style-loader: 将webpack处理之后的内容插入到HTML的HEAD代码中
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

