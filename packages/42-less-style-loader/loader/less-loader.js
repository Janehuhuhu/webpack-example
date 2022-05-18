const less = require('less')
module.exports = function (source) {
  const callback = this.async()
  less.render(source, function (err, obj) {
    callback(err, obj.css)
  })
}
