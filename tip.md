## 目录结构
本工程是 `webpack` 的实践版，采用 `yarn workspace` 模式组织，注意点：
1. 当 `packages/*` 下没有 `package.json` 时，在子目录下执行 `npx webpack` 是可以寻址到根目录下的 `node_modules/bin` 命令。当子目录下存在 `package.json`时，是无法正确寻址到根目录下

2. 在根目录下执行 `yarn (install)` 是可以一起安装子目录下的依赖，子目录下的依赖会安装到子目录的 `node_modules` 中。一般情况下，子目录中的依赖会安装在根目录的 `node_modules` 中，除非两个子目录使用了不同版本的同一个依赖

3. 执行子目录命令
```js
// 单一执行
yarn workspace file-loader run build
// 依次执行
yarn workspaces run build
```

- [Yarn Workspace 使用指南](https://blog.csdn.net/tianxintiandisheng/article/details/115329134)
- [npx 寻址](https://juejin.cn/post/7046687336939126797)

<div style="margin-top: 50px"></div>


webpack 小结：
- 减少打包体积，提升打包速度
  - 压缩打包后的 html、css、js
  - 压缩图片
  - 不打包未使用到的代码
    - Tree-Shaking
    - css Tree-Shaking
  - 忽略第三方包某些文件打包 IgnorePlugin
  - 运行时加载依赖 externals 
  - 不重复打包不会修改的第三方包 dll 动态链接库
  - 多线程打包 happypack
 
- 减少请求次数
  - 图片合并成精灵图
  
- 提升页面渲染速度
  - 资源预加载，prefetch/preload
  - css 单独提取
  - 代码分离：不经常修改代码单独打包，便于按需加载或并行加载
  - 浏览器缓存 contenthash

<div style="margin-top: 50px"></div>


@TODO
- 实操篇
  - loader 写法
  - plugin 写法
- 原理篇
  - `watch` 原理
  - webpack 原理