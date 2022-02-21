import img from '../imgs/test.jpg'
import '../css/index.less'

const oImg = document.createElement('img')
oImg.src = img
oImg.setAttribute('class', 'custom')
document.body.appendChild(oImg)