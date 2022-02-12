import img from './test.jpg'
import './index.less'

const oImg = document.createElement('img')
oImg.src = img
oImg.setAttribute('class', 'custom')
document.body.appendChild(oImg)