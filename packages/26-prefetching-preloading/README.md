## 1. 什么是 Prefetching and Preloading
通过异步加载(懒加载)的方式确实可以优化我们的代码, 但是也存在一定的弊端, 弊端就是用到的时候再加载, 那么用户需要等待加载完成后才能使用。例如: 弹出登录框的时候有一些业务逻辑, 如果这些业务逻辑使用懒加载的话, 那么只有加载完用户才能操作登录框<br>
解决方案:
加载完当前需要使用的所有模块之后, 在空闲的时间提前把异步加载的模块也加载进来
这样既不会影响到第一次的访问速度, 还可以提升异步加载的速度较少用户等待的时间<br>

所以就有了 `Prefetching` 和 `Preloading`
- Prefetching: 空闲的时候加载, 也就是等当前被使用的模块都加载完空闲下来的时候就去加载, 不用等到用户用到时再加载
- Preloading: 和其它模块一起加载, 也就是和当前被使用的模块一起加载
<div style="margin-bottom: 50px;"></div>

## 2. 为什么预加载方式会有优势
`HTML` 解析器在创建 `DOM` 时如果碰上同步脚本（`synchronous script`)，解析器会停止创建 `DOM`，转而去执行脚本。所以，如果资源的获取只发生在解析器创建 `DOM` 时，同步脚本的介入将使网络处于空置状态，尤其是对外部脚本资源来说，当然，页面内的脚本有时也会导致延迟。<br>
预加载器（`Preloader`）的出现就是为了优化这个过程，预加载器通过分析浏览器对 `HTML` 文档的早期解析结果（这一阶段叫做“令牌化（`tokenization`）”），找到可能包含资源的标签（`tag`），并将这些资源的 `URL` 收集起来。令牌化阶段的输出将会送到真正的 `HTML` 解析器手中，而收集起来的资源 `URLs` 会和资源类型一起被送到读取器（`fetcher`）手中，读取器会根据这些资源对页面加载速度的影响进行有次序地加载。[详情](https://toutiao.io/posts/318549/app_preview)

<div style="margin-bottom: 50px;"></div>

## 3. 使用方式
异步加载时写上魔法注释即可
```js
/* webpackPrefetch: true */
/* webpackPreload: true */
import(/* webpackPrefetch: true */ 'lodash').then();
```
<div style="margin-bottom: 50px;"></div>


## 4. 利用魔法注释修改分割代码的名称
魔法注释其他用法：异步加载时在加载模块前面写上魔法注释
```js
import(/* webpackChunkName: "jquery" */"lodash").then();
```
<div style="margin-bottom: 50px;"></div>

## 5. 注意事项
### 5.1 [二次获取](https://zhuanlan.zhihu.com/p/48521680)
- 不要将 `preload` 和 `prefetch` 进行混用，它们分别适用于不同的场景，对于同一个资源同时使用 `preload` 和 `prefetch` 会造成二次的下载。
- `preload` 字体不带 `crossorigin` 也将会二次获取！ 确保你对 `preload` 的字体添加 `crossorigin` 属性，否则他会被下载两次，这个请求使用匿名的跨域模式。这个建议也适用于字体文件在相同域名下，也适用于其他域名的获取(比如说默认的异步获取)。
`preload` 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源，而 `prefetch` 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源。所以建议：对于当前页面很有必要的资源使用 `preload`，对于可能在将来的页面中使用的资源使用 `prefetch`。
<div style="margin-bottom: 30px;"></div>

### 5.2 执行时机
- `prefetch` 和 `preload` 仅加载，但不执行。是一种预加载的方式，它通过声明向浏览器声明一个需要提交加载的资源，当资源真正被使用的时候立即执行，就无需等待网络的消耗
- `prefetch` 不会像 `preload` 一样，在页面渲染的时候加载资源，而是利用浏览器空闲时间来下载。当进入下一页面，就可直接从 `disk cache` 里面取，既不影响当前页面的渲染，又提高了其他页面加载渲染的速度
<div style="margin-bottom: 30px;"></div>

### 5.3 研发框架策略
- 对于 `initial` 类型的资源全部 `preload`，对于 `async` 类型的资源全部 `prefetch`。
- 由于研发框架中默认 `initial` 的资源有三个，`vendors（vue/vuex/vue-router）`、`commons`（除了 `vue/vuex/vue-router` 之外的 `node_modules` 中被引用两次及以上的模块）及当前页面的 `js chunk`，所以对于默认情况不会超过 *3* 个 `initial` 的资源，所以默认的`preload` 机制是没有问题的。但是存在一个风险是你不知道用户或者其他插件会如何去定制 `chunks`，所以增加一个 `chunks` 个数的检查和提醒，如果 `initial` 的 `chunks` 个数超过 *6*(浏览器tcp链接上限) 个则进行提醒，让用户手动的去修改 `preload` 的配置。
- 测试结果：用 `prefetch` 在刷新页面的时候会下载资源，点击按钮后会从缓存中加载；用 `preload` 在刷新页面会下载资源（在 *network* 中看不到），但点击按钮后会从从缓存中加载。相对于点击按钮后再加载资源这两种模式都已经有了很大程度改善
<div style="margin-bottom: 50px;"></div>


- [官网](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules)
- [用 preload 预加载页面资源](https://juejin.cn/post/6844903562070196237)
- [script crossorigin 属性](https://juejin.cn/post/6969825311361859598)
- [prefetch/preload使用测试](https://km.sankuai.com/page/1088835970)
