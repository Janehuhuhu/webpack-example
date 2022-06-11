## 1.如何给我们实现的 webpack 增加 Plugin 功能
增加 `Plugin` 功能就是增加发布者, 就是让发布者在特定阶段发布特定消息,所以只需要利用 `Tapable` 创建发布者, 在特定阶段发布消息即可

<div style="margin-top: 50px"></div>

## 2. 示例
```js
// 发布者
class Complier {
  constructor(config) {
    this.config = config
    this.modules = {}
    this.hooks = {
      done: new SyncHook(),
      entryOption: new SyncBailHook()
    }
    // 获取插件, 调用插件的apply方法, 并且将当前的编译对象传递给插件
    let plugins = this.config.plugins
    plugins.forEach(plugin => {
      plugin.apply(this)
    })
  }
  //....
}
// 发布
#! /usr/bin/env node
const path = require('path')
const config = require(path.resolve(process.cwd(), 'webpack.config.js'))
const Complier = require('../src/complier.js')

const complier = new Complier(config)
complier.hooks.entryOption.call()
complier.run()
```

## 3. hooks 高级特性
### Before
`before` 属性的值可以传入一个数组或者字符串,值为注册事件对象时的名称，它可以修改当前事件函数在传入的事件名称对应的函数之前进行执行。
```js
const { SyncHook } = require('tapable');
const hooks = new SyncHook();
hooks.tap(
  {
    name: 'flag1',
  },
  () => {
    console.log('This is flag1 function.');
  }
);
hooks.tap(
  {
    name: 'flag2',
    // flag2 事件函数会在flag1之前进行执行
    before: 'flag1',
  },
  () => {
    console.log('This is flag2 function.');
  }
);
hooks.call();

// result
This is flag2 function.
This is flag1 function.
```

### stage
`stage` 这个属性的类型是数字，数字越大事件回调执行的越晚，支持传入负数，不传时默认为0.
```js
const { SyncHook } = require('tapable');
const hooks = new SyncHook();
hooks.tap(
  {
    name: 'flag1',
    stage: 1,
  },
  () => {
    console.log('This is flag1 function.');
  }
);
hooks.tap(
  {
    name: 'flag2',
    // 默认为stage: 0,
  },
  () => {
    console.log('This is flag2 function.');
  }
);
hooks.call();

// result
This is flag2 function.
This is flag1 function.
```

### Intercept 拦截器
`Tapable` 提供的每个钩子中，都注入了 `interception` ，能对整个发布/订阅流程进行监听，从而触发对应的逻辑。详情参考[Tapable拦截器](https://juejin.cn/post/6964792209094737951)
```js
const hook = new SyncHook();
hook.intercept({
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
  loop(...args){
    console.log("before loop");
  },
  // 在调用被注册的每一个事件函数之前执行
  tap(tap) {
    console.log("before each callback");
  },
});
```

### HookMap
`HookMap` 本质上就是一个辅助类，通过 `HookMap` 我们可以更好的管理 `Hook`
```js
const { HookMap, SyncHook } = require('tapable');
// 创建HookMap实例
const keyedHook = new HookMap((key) => new SyncHook(['arg']));

// 在keyedHook中创建一个name为key1的hook，同时为该hook通过tap注册事件 
keyedHook.for('key1').tap('Plugin 1', (arg) => {
  console.log('Plugin 1', arg);
});

// 在keyedHook中创建一个name为key2的hook，同时为该hook通过tap注册事件
keyedHook.for('key2').tap('Plugin 2', (arg) => {
  console.log('Plugin 2', arg);
});

// 在keyedHook中创建一个name为key3的hook，同时为该hook通过tap注册事件
keyedHook.for('key3').tap('Plugin 3', (arg) => {
  console.log('Plugin 3', arg);
});

// 从HookMap中拿到name为key1的hook
const hook = keyedHook.get('key1');

if (hook) {
  // 通过call方法触发Hook
  hook.call('hello');
}
```






