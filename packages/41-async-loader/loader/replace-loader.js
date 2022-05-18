const { validate } = require('schema-utils');
module.exports = function (source) {
  // 获取webpack传递的loader参数
  const options = this.query
  // 校验入参
  const schema = {
    "type": "object",
    "properties": {
      "name": {
        description: "*** this is a test ***", // 报错时描述
        type: "string"
      }
    },
    "additionalProperties": false
  }
  validate(schema, options, 'ReplaceLoader')
  const callback = this.async()
  setTimeout(function () {
    source = source.replace(/666/g, options.name)
    callback(null, source) // 第一个参数为回调函数返回值，null或者error
  }, 3000)
}