## 1. style-loader的作用
将 `css` 代码插入到 `html` 的 `head` 标签中
```js
module.exports = function (source) {
  const str = `
  const oStyle = document.createElement('style')
  oStyle.innerHTML = ${JSON.stringify(source)}
  document.body.appendChild(oStyle)
  `
  return str
}
```
<div style="margin-top: 50px"></div>

## 2. less-loader的作用
将 `less` 代码转换成 `css` 代码
```js
const less = require('less')
module.exports = function (source) {
  const callback = this.async()
  less.render(source, function (err, obj) {
    callback(err, obj.css)
  })
}
```
