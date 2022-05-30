class SyncHook {
  constructor(args = []) {
    this.tasks = []
    // 定义属性保存将来会给订阅者传递多少个参数
    this.args = args
  }

  // 订阅事件
  tap(tag, fn) {
    this.tasks.push(fn)
  }

  // 发布事件
  call(...args) {
    if (args.length < this.args.length) {
      return new Error('参数错误')
    }
    args = args.slice(0, this.args.length)
    this.tasks.forEach(item => item(...args))
  }
}

module.exports = SyncHook
