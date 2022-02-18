import img from '../imgs/test.jpg'
import '../css/index.less'
import axios from 'axios'

const oImg = document.createElement('img')
oImg.src = img
oImg.setAttribute('class', 'custom')
document.body.appendChild(oImg)

axios.get('/api/user')