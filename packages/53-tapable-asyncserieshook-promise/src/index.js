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
    this.hooks.vue.tapPromise('zs', (info) => {
      return new Promise((resolve) => {
        setTimeout(function () {
          console.log('张三', info);
          resolve();
        }, 3000);
      })
    })
    this.hooks.vue.tapPromise('ls', (info) => {
      return new Promise((resolve) => {
        setTimeout(function () {
          console.log('李四', info);
          resolve();
        }, 2000);
      })
    })
    this.hooks.vue.tapPromise('ww', (info) => {
      return new Promise((resolve) => {
        setTimeout(function () {
          console.log('王五', info);
          resolve();
        }, 1000);
      })
    })
  }

  call(...args) {
    this.hooks.vue.promise(...args).then(function () {
      console.log('end')
    })
  }
}

const lesson = new Lesson()
lesson.tap()
lesson.call('vue课程开始了')