import img from './test.jpg'
// const img = require('./test.jpg')
console.log('img', img)

const oImg = document.createElement('img')
oImg.src = img
document.body.appendChild(oImg)