## 1. 什么是 Prefetching and Preloading
通过异步加载(懒加载)的方式确实可以优化我们的代码, 但是也存在一定的弊端, 弊端就是用到的时候再加载, 那么用户需要等待加载完成后才能使用。例如: 弹出登录框的时候有一些业务逻辑, 如果这些业务逻辑使用懒加载的话, 那么只有加载完用户才能操作登录框<br>
解决方案:
加载完当前需要使用的所有模块之后, 在空闲的时间提前把异步加载的模块也加载进来
这样既不会影响到第一次的访问速度, 还可以提升异步加载的速度较少用户等待的时间<br>

所以就有了 `Prefetching` 和 `Preloading`
- Prefetching: 空闲的时候加载, 也就是等当前被使用的模块都加载完空闲下来的时候就去加载, 不用等到用户用到时再加载
- Preloading: 和其它模块一起加载(不推荐, 了解即可), 也就是和当前被使用的模块一起加载
<div style="margin-bottom: 50px;"></div>


## 2. 使用方式
异步加载时写上魔法注释即可
```js
/* webpackPrefetch: true */
/* webpackPreload: true */
import(/* webpackPrefetch: true */ 'lodash').then();
```
<div style="margin-bottom: 50px;"></div>


## 3. 利用魔法注释修改分割代码的名称
魔法注释其他用法：异步加载时在加载模块前面写上魔法注释
```js
import(/* webpackChunkName: "jquery" */"lodash").then();
```
<div style="margin-bottom: 50px;"></div>

研发框架策略：
- 对于 `initial` 类型的资源全部 `preload`，对于 `async` 类型的资源全部 `prefetch`。
- 由于研发框架中默认 `initial` 的资源有三个，`vendors（vue/vuex/vue-router）`、`commons`（除了 `vue/vuex/vue-router` 之外的 `node_modules` 中被引用两次及以上的模块）及当前页面的 `js chunk`，所以对于默认情况不会超过 *3* 个 `initial` 的资源，所以默认的`preload` 机制是没有问题的。但是存在一个风险是你不知道用户或者其他插件会如何去定制 `chunks`，所以增加一个 `chunks` 个数的检查和提醒，如果 `initial` 的 `chunks` 个数超过 *6*(浏览器tcp链接上限) 个则进行提醒，让用户手动的去修改 `preload` 的配置。
<div style="margin-bottom: 50px;"></div>


[官网](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules)
[用 preload 预加载页面资源](https://juejin.cn/post/6844903562070196237)
[script crossorigin 属性](https://juejin.cn/post/6969825311361859598)
[prefetch/preload使用测试](https://km.sankuai.com/page/1088835970)
