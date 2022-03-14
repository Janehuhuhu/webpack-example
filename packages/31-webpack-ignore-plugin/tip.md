## 1. 什么是 IgnorePlugin?
`IgnorePlugin` 是 `webpack` 的一个内置插件, `IgnorePlugin` 用于忽略第三方包指定目录，让指定目录不被打包进去
<div style="margin-bottom: 50px;"></div>


## 2. 配置
```js
new webpack.IgnorePlugin({ resourceRegExp, contextRegExp });
// 例如, 在打包moment这个库的时候, 将整个locale目录都忽略掉
new Webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ })
```

注意： 忽略这个目录后，还需要在代码中单独引入,
```js
import 'moment/locale/zh-cn.js';
moment.locale('zh-cn');
```
<div style="margin-bottom: 50px;"></div>


[ignore-plugin](https://webpack.js.org/plugins/ignore-plugin/)