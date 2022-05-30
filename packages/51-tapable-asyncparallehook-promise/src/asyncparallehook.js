module.exports = class AsyncParallelHook {
  constructor(args = []) {
    this.tasks = []
    // 定义属性保存将来会给订阅者传递多少个参数
    this.args = args
    this.index = 0
  }

  // 订阅事件
  tapPromise(tag, fn) {
    this.tasks.push(fn)
  }

  // 发布事件
  promise(...args) {
    if (args.length < this.args.length) {
      return new Error('参数错误')
    }
    args = args.slice(0, this.args.length)
    const promiseTasks = this.tasks.map(task => task(...args))

    return Promise.all(promiseTasks)
  }
}

