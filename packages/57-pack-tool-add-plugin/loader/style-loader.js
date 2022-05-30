module.exports = function (source) {
  const str = `
  const oStyle = document.createElement('style')
  oStyle.innerHTML = ${JSON.stringify(source)}
  document.body.appendChild(oStyle)
  `
  return str
}
