const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "bundle")
    },
    /*
    module: 告诉webpack如何处理webpack不能够识别的文件
    * */
    module: {
        rules: [
            // 打包JS规则
            {
                test: /\.js$/,
                exclude: /node_modules/, // 告诉webpack不处理哪一个文件夹
                loader: "babel-loader",
                options: {
                    "presets": [["@babel/preset-env"]],
                }
            },
            {
            // webpack 4之前，js 是 webpack 中的唯一模块类型，因而不能有效地打包其它类型的文件。
            // 而 webpack 4 则提供了 5 种模块类型(webpack 3中的默认类型)支持所有的JS模块系统：CommonJS、AMD、ESM
                test: /.mjs$/,
                include: /node_modules/,
                type: "javascript/auto"
            },
        ]
    },
    /*
    plugins: 告诉webpack需要新增一些什么样的功能
    * */
    plugins: [
        new HtmlWebpackPlugin({
            // 指定打包的模板, 如果不指定会自动生成一个空的
            template: "./index.html",
        }),
    ]
};