import img from './test.jpg'
export function addImg() {
  const oImg = document.createElement('img')
  oImg.src = img
  oImg.setAttribute('class', 'custom')
  document.body.appendChild(oImg)
}