// const SyncLoopHook = require('./syncloophook')
const { SyncLoopHook } = require('tapable')

class Lesson {
  constructor() {
    this.hooks = {
      vue: new SyncLoopHook(["des"])
    }
    this.index = 0
  }

  tap() {
    // this.hooks.vue.tap('zs', (info) => {
    //   console.log('张三', info)
    // })
    this.hooks.vue.tap('ls', (info) => {
      console.log('李四', info)
      this.index++
      return this.index === 3 ? undefined : 1

    })
    this.hooks.vue.tap('ww', (info) => {
      console.log('王五', info)
    })
  }

  call(...args) {
    this.hooks.vue.call(...args)
  }
}

const lesson = new Lesson()
lesson.tap()
lesson.call('vue课程开始了')