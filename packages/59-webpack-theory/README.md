## webpack 原理
### webpack 编译
- [Webpack 核心原理](https://zhuanlan.zhihu.com/p/363928061)
- [Webpack 插件架构](https://zhuanlan.zhihu.com/p/367931462)
- [webpack之编译原理](https://segmentfault.com/a/1190000039323677)


### HMR 原理
- [HMR 原理全解析](https://zhuanlan.zhihu.com/p/410510492)
- [Webpack HMR 原理解析](https://zhuanlan.zhihu.com/p/30669007)
- [从零实现webpack热更新HMR](https://juejin.cn/post/6844904020528594957) ❤
- [HMR 原理](https://zhuanlan.zhihu.com/p/410510492)


- [如何编写loader](https://zhuanlan.zhihu.com/p/375626250)
  - [pitch](https://zhuanlan.zhihu.com/p/104205895)
  - `pitch` 应用存疑
- [Webpack 运行时](https://zhuanlan.zhihu.com/p/373946949)
  - [Webpack模块化实现&动态模块加载原理](https://segmentfault.com/a/1190000022191241)
- [Tree-Shaking 实现原理](https://zhuanlan.zhihu.com/p/403901557)
- webpack 性能
  - [提升编译性能](https://zhuanlan.zhihu.com/p/425425675)
    - 使用 `webpack` 最新版本
    - 缩小资源搜索范围 `resolve`
    - 跳过文件编译 `noParse`
    - 最小化 `Loader` 作用范围
    - 最小化 `watch` 监控范围
    - 跳过 `TS` 类型检查
    - 慎用 `source-map`
  - [使用 Cache 提升构建性能](https://zhuanlan.zhihu.com/p/412694420)
  - [多进程打包](https://zhuanlan.zhihu.com/p/425076452)
    - `Thread-loader` 组件提升 `Make` 阶段性能
    - 生产环境下还可配合 `terser-webpack-plugin `的并行压缩功能

  <br></br>


  ## webpack 实践
  - 增量构建
  `webpack4` 按需编译的能力，核心逻辑社区插件 `lazy-compile-webpack-plugin` ，但是该插件不支持 `webpack5`，`webpack5` 虽然自带了实验性属性按需编译的能力配置 [experiments.lazyCompilation](https://webpack.js.org/configuration/experiments/#experimentslazycompilation)
    - [webpack多入口应用增量构建如何最高提速97%](https://juejin.cn/post/7053059974850674695)
      - 思路：根据 `git diff` 找到变动文件，经过 `loader` 转换后的代码通过 `madge` 找到变动文件依赖关系，最终确定影响的入口文件，调用 `webpack`
      - 拓展知识点
        - [DefinePlugin](./DefinePlugin.md)

    - [Webpack实战 - 使用动态 entry 改善调试体验](https://cloud.tencent.com/developer/article/1607466)
      - 拓展知识点
        - [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware): `invalidate、waitUntilValid` 用于重新构建
        - [cheerio](https://www.jianshu.com/p/629a81b4e013): 用于更新返回的 `html` 文件中的静态资源
        - [webpack 构建产物分析](https://tsejx.github.io/webpack-guidebook/best-practice/optimization/build-analyze/)

  <br></br>

  - 缓存
    - [几种缓存方式比较](https://blog.csdn.net/qiwoo_weekly/article/details/104935415)
      - `webpack4` 用 `HardSourceWebpackPlugin`(相对于 `cache-loaer` 速度更快), `webpack5` 用 [cache](https://webpack.docschina.org/configuration/cache/)
      - `HardSourceWebpackPlugin` 默认缓存在 `.cache/hard-source` 中， `vue-cli4` 默认开启 `cache-loader`（vue-loader/babel-loader/eslint-loader） 缓存
    - [webpack 性能优化之缓存](https://www.jianshu.com/p/4da48bd1ce93)


<br></br>

  ## webpack 常用插件
  - [preload-webpack-plugin](https://www.npmjs.com/package/preload-webpack-plugin)
    - [基于webpack来配置html的preload和prefetch](https://www.shuizhongyueming.com/2018/06/05/%E5%9F%BA%E4%BA%8Ewebpack%E6%9D%A5%E9%85%8D%E7%BD%AEhtml%E7%9A%84preload%E5%92%8Cprefetch/)

  - [html-webpack-inline-code-plugin](https://www.npmjs.com/package/html-webpack-inline-code-plugin)
    - 允许嵌入 `js、css` 代码

  - [HtmlWebpackPlugin](https://webpack.docschina.org/plugins/html-webpack-plugin/)
    - [参数含义](https://juejin.cn/post/6854573216108085261)
  


## webpack 面试



  todo:
  - webpack 构建使用部分源码
  - 构建产物可视化报错
  - 实践