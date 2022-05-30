## 1. 什么是SyncHook同步串行钩子
`SyncHook` 不关心订阅函数(事件处理函数)的返回值，在收到消息(触发事件)之后，
会按照订阅的先后顺序执行所有的订阅函数(事件处理函数)
<div style="margin-top: 50px"></div>


## 2.什么是SyncBailHook同步串行钩子
`SyncBailHook` 关心订阅函数(事件处理函数)的返回值，在收到消息(触发事件)之后，
会按照订阅的先后顺序执行所有的事件处理函数
但是如果在执行的过程中有一个订阅函数返回的不是 `undefined`, 就会停止执行后续函数