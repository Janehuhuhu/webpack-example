## 1.什么是Tapable?
`Tapable` 实际是一套发布订阅模式的实现, `SyncHook` 类就是 `Tapable` 中提供的一种实现
```js
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
 } = require("tapable");
```
<div style="margin-top: 50px"></div>

## 2. 什么是SyncHook同步串行钩子
`SyncHook`不关心订阅函数(事件处理函数)的返回值，在收到消息(触发事件)之后，
会按照订阅的先后顺序执行所有的订阅函数(事件处理函数)


如果你查阅 `webpack` 底层源码, 你会发现`webpack` 内部其实是由大量的插件构成的。
`Webpack` 本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，
而实现这一切的核心就是 `tapable`。