## 1.什么是SyncLoopHook同步串行钩子
`SyncLoopHook` 关心订阅函数(事件处理函数)的返回值，在收到消息(触发事件)之后，
会按照订阅的先后顺序执行所有的事件处理函数
并且如果订阅函数的返回值不是 `undefined` 就会一直执行当前订阅函数


注意点：`tapable` 中的 `SyncLoopHook` 会循环之前的函数，不仅仅是当前函数（可能是个bug）