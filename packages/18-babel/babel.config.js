
module.exports = {
  presets: [
    ["@babel/preset-env", {
      // targets: {
      //   chrome: "58"
      // },
      // useBuiltIns: "usage",
      // corejs: '2'
    }],
  ],
  plugins: [
    ["@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}