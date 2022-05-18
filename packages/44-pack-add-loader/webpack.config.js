const path = require("path");

module.exports = {
    devtool: false,
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "bundle")
    },
    resolveLoader: {
        modules: ['node_modules', './loader'] // 先在node_modules中查找，如果没有找到则在./loader中查找
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{
                    loader: path.resolve(__dirname, 'node_modules/43-pack-tool-add-loader/loader/style-loader.js')
                }, {
                    loader: path.resolve(__dirname, 'node_modules/43-pack-tool-add-loader/loader/less-loader.js')
                }]
            }
        ]
    }
};