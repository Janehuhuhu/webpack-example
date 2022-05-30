const less = require('less')
module.exports = function (source) {
  let str = ``
  // const callback = this.async()
  less.render(source, function (err, obj) {
    // callback(err, obj.css)
    str = obj.css
  })
  return
}
