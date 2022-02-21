import img from './test.jpg'
// const img = require('./test.jpg')
// 返回图片地址，如果配置中包含publicPath，则返回其对应的服务器地址
console.log('img', img)

const oImg = document.createElement('img')
oImg.src = img
document.body.appendChild(oImg)