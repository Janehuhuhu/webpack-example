#! /usr/bin/env node

const path = require('path')
const config = require(path.resolve(process.cwd(), 'webpack.config.js'))
const Complier = require('../src/complier.js')

const complier = new Complier(config)

// hook 拦截器
complier.hooks.entryOption.intercept({
  name: "test",
  context: true,

  // 每次调用 hook 实例的 tap() 方法注册回调函数时, 都会调用该方法,
  // 并且接受 tap 作为参数, 还可以对 tap 进行修改;
  register(tapInfo) {
    console.log("every time call tap", tapInfo.name);
    return tapInfo;
  },
  // 通过hook实例对象上的call方法时候触发拦截器，包括 callAsync, promise）
  call() {
    console.log("before call");
  },
  // loop类型钩子中，每次重新开始 loop 之前会执行该拦截器，拦截器函数接受的参数为调用时传入的参数
  loop(...args) {
    console.log("before loop");
  },
  // 在调用被注册的每一个事件函数之前执行
  tap(tap) {
    console.log("before each callback");
  },

});

complier.hooks.entryOption.call()
complier.run()

