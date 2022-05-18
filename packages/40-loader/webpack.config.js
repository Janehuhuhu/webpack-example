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
        // modules: ['node_modules', './loader'] // 先在node_modules中查找，如果没有找到则在./loader中查找
        alias: {
            'replace-loader': path.resolve(__dirname, 'loader/replace-loader.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'replace-loader',
                    // loader: path.resolve(__dirname, 'loader/replace-loader.js'),
                    options: {
                        name: "hello world"
                    }
                }]
            }
        ]
    }
};