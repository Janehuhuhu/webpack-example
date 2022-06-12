## 1.什么是AsyncSeriesHook异步串行钩子
和 `AsyncParallelHook` 一样都是异步执行的,不同的是 `AsyncSeriesHook` 是串行, 前面一个执行完后面一个才能执行(顺序执行)，通过 `cb()` 告诉下一个订阅者执行完了