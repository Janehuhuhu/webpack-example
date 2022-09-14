## 1. 浏览器缓存问题
浏览器会自动缓存网页上的资源, 以便于提升下次访问的速度。但正式因为浏览器的缓存机制,  导致文件内容被修改之后只要文件名称没有发生变化，就不会重新去加载修改之后的资源, 所以刷新网页后显示的还是修改之前的内容。为了解决这个问题, 我们就需要在打包文件的时候给"文件名称加上内容的 `hash` 值"，一旦内容发生了变化, 内容的 `hash` 值就会发生变化, 文件的名称也会发生变化，一旦文件的名称发生了变化, 浏览器就会自动去加载新打包的文件
<div style="margin-bottom: 50px;"></div>

## 2. hash/chunkhash/contenthash
- hash: 根据每次编译打包的内容生成的哈希值, 每次打包都不一样, 不能很好利用缓存, 不推荐
- chunkhash: 根据不同的入口文件(`Entry`)进行依赖文件解析、构建对应的 `chunk`，生成对应的哈希值。但还是会存在同个入口中的两个 `chunk` 公用 `hash` 的情况[详细解释](https://www.cnblogs.com/skychx/p/webpack-hash-chunkhash-contenthash.html)。注意点: 只支持 `css` 和 `js`, 不支持 `img` 等其它资源
- contenthash(推荐): 根据某个文件内容生成的哈希值, 只要某个文件内容发生改变,该文件的 `contenthash` 就会发生变化
<div style="margin-bottom: 50px;"></div>

## 3. 注意点
在 `webpack4` 中 `contenthash` 和热更新有冲突, 所以在开发模式想使用 `contenthash` 需要关闭热更新,但是一般情况下我们需要通过 `hash` 解决的是线上代码的内容更新问题, 所以开发模式无关紧要。
<div style="margin-bottom: 50px;"></div>


## 4. runtimeChunk
`runtimeChunk` 作用是为了线上更新版本时，充分利用浏览器缓存，使用户感知的影响到最低。暂未复现问题，可[参考文档](https://www.jianshu.com/p/714ce38b9fdc)
```js
optimization: {
  runtimeChunk: "single",
  splitChunks: {
      chunks: "all",
  },
}
```