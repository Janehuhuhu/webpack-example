import img from '../imgs/test.jpg'
import '../css/index.less'
import addSpan from './test'

const oImg = document.createElement('img')
oImg.src = img
oImg.setAttribute('class', 'custom')
document.body.appendChild(oImg)

const oBtn = document.createElement('button')
oBtn.innerText = '添加内容'
document.body.appendChild(oBtn)

let index = 0
oBtn.onclick = function() {
  const oDiv = document.createElement('p')
  oDiv.innerText = "我是第" + index++ + "个段落2"
  document.body.appendChild(oDiv)
}

// js 文件热更新
addSpan()
if (module.hot) {
  module.hot.accept("./test.js", function () {
    let oSpan = document.querySelector("span")
    document.body.removeChild(oSpan)
    addSpan()
  })
}