const AsyncSeriesHook = require('./hook')
// const { AsyncSeriesHook } = require('tapable')

class Lesson {
  constructor() {
    this.hooks = {
      vue: new AsyncSeriesHook(["des"])
    }
    this.index = 0
  }

  tap() {
    this.hooks.vue.tapAsync('zs', (info, cb) => {
      setTimeout(function () {
        console.log('张三', info);
        cb();
      }, 3000);
    })
    this.hooks.vue.tapAsync('ls', (info, cb) => {
      setTimeout(function () {
        console.log('李四', info);
        cb();
      }, 2000);
    })
    this.hooks.vue.tapAsync('ww', (info, cb) => {
      setTimeout(function () {
        console.log('王五', info);
        cb();
      }, 1000);
    })
  }

  call(...args) {
    this.hooks.vue.callAsync(...args, function () {
      console.log('end')
    })
  }
}

const lesson = new Lesson()
lesson.tap()
lesson.call('vue课程开始了')