const SyncHook = require('./synchook')

class Lesson {
  constructor() {
    this.vue = new SyncHook('1')
  }

  studyVue() {
    this.vue.tap('zs', (info) => {
      console.log('张三', info)
    })
    this.vue.tap('ls', (info) => {
      console.log('李四', info)
    })
  }

  callVue(...args) {
    this.vue.call(...args)
  }
}

const lesson = new Lesson()
lesson.studyVue()
lesson.callVue('vue课程开始了')