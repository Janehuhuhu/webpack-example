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
  source = source.replace(/666/g, options.name)
  return source
}