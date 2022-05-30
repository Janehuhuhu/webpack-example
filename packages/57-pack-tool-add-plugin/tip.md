## 1.如何给我们实现的 webpack 增加 Plugin 功能
增加 `Plugin` 功能就是增加发布者, 就是让发布者在特定阶段发布特定消息,所以只需要利用 `Tapable` 创建发布者, 在特定阶段发布消息即可

<div style="margin-top: 50px"></div>

## 2. 示例
```js
// 发布者
class Complier {
  constructor(config) {
    this.config = config
    this.modules = {}
    this.hooks = {
      done: new SyncHook(),
      entryOption: new SyncBailHook()
    }
    // 获取插件, 调用插件的apply方法, 并且将当前的编译对象传递给插件
    let plugins = this.config.plugins
    plugins.forEach(plugin => {
      plugin.apply(this)
    })
  }
  //....
}
// 发布
#! /usr/bin/env node
const path = require('path')
const config = require(path.resolve(process.cwd(), 'webpack.config.js'))
const Complier = require('../src/complier.js')

const complier = new Complier(config)
complier.hooks.entryOption.call()
complier.run()

```