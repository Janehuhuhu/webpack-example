// import "@babel/polyfill"
import img from '../imgs/test.jpg'
import '../css/index.less'
import test from './test'

const oImg = document.createElement('img')
oImg.src = img
oImg.setAttribute('class', 'custom')
document.body.appendChild(oImg)

console.log(test())