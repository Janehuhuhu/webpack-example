## webpack 原理
- [Webpack 核心原理](https://zhuanlan.zhihu.com/p/363928061)
- [Webpack 插件架构](https://zhuanlan.zhihu.com/p/367931462)
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


  ## webpack 实践
  - [webpack多入口应用增量构建如何最高提速97%](https://juejin.cn/post/7053059974850674695)
    - 思路：根据 `git diff` 找到变动文件，经过 `loader` 转换后的代码通过 `madge` 找到变动文件依赖关系，最终确定影响的入口文件，调用 `webpack`

  