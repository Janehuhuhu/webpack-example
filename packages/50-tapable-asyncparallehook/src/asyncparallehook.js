module.exports = class AsyncParallelHook {
  constructor(args = []) {
    this.tasks = []
    // 定义属性保存将来会给订阅者传递多少个参数
    this.args = args
    this.index = 0
  }

  // 订阅事件
  tapAsync(tag, fn) {
    this.tasks.push(fn)
  }

  // 发布事件
  callAsync(...args) {
    if (args.length < this.args.length) {
      return new Error('参数错误')
    }
    const finalTask = args.pop()
    args = args.slice(0, this.args.length)
    const done = () => {
      this.index++
      if (this.index === this.tasks.length) {
        finalTask()
      }
    }
    this.tasks.forEach(item => {
      item(...args, done)
    })
  }
}

