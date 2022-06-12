## 1.什么是AsyncParallelHook异步并行钩子
发出消息后，会同时执行所有的订阅函数, 并且在执行订阅函数时会自动传递一个 `callback` 参数,
每个订阅函数执行完毕之后必须通过 `callback` 告诉系统订阅函数已经执行完毕了。当所有订阅函数都调用完 `callback` 后会通过回调函数（最终执行的函数end）的方式告诉 `callAsync` 全部执行完毕了


注意点:
想要使用AsyncParallelHook, 注册事件时需要通过tapAsync注册, 触发事件时需要通过callAsync触发