## 1. 区分开发环境和线上环境
在开发阶段我们为了提升运行效率以及调试效率, 一般会通过 `dev-server` 来打包。在开发阶段我们为了提升打包效率,不会对打包的内容进行压缩。在上线阶段我们需要拿到真实的打包文件, 所以不会通过 `dev-server` 来打包,在上线阶段我们为了提升访问的效率, 所以在打包时需要对打包的内容进行压缩。但是当前我们将"开发环境和线上环境"的配置都写到了一个文件中, 这样非常不利于我们去维护配置文件，所以我们需要针对不同的环境将不同的配置写到不同的文件中
<div style="margin-bottom: 50px;"></div>


## 2. 区分开发环境和线上环境优化
区分完不同环境配置文件之后发现两个文件之间存在大量重复配置, 这我们可以利用 `webpack-merge` 模块来实现冗余代码的抽离和合并进一步优化配置文件<br>
1）将冗余代码抽取到 `webpack.config.common.js` 中
2）在 `dev.js` 和 `prod.js` 中导入 `common.js`, 利用 `merge` 合并即可
```js
const { merge } = require('webpack-merge')
module.exports = merge(commonConfig, prodConfig)
```
<div style="margin-bottom: 50px;"></div>

[webpack-merge](https://www.npmjs.com/package/webpack-merge)