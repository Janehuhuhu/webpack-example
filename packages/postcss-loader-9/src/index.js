import img from './test.jpg'
import './index.scss'

const oImg = document.createElement('img')
oImg.src = img
oImg.setAttribute('class', 'custom')
document.body.appendChild(oImg)