import img from './test.jpg'
import { addImg } from './add-img'

// 全局导入样式，一定要关闭 css 的 modules 模块化打包属性
// import './index.css'

// 模块化导入样式，cssModule 是包含 class 类型样式的 json
import cssModule from './index.css'
console.log('***', cssModule)

const oImg = document.createElement('img')
oImg.src = img
// 全局导入样式
// oImg.setAttribute('class', 'custom')

// 模块化导入样式
oImg.setAttribute('class', cssModule.custom)
document.body.appendChild(oImg)

addImg()