const path = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");
const webpack =require('webpack');

module.exports = {
    entry: "./app/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index_bundle.js",
        publicPath: "/"
    },
    devServer: {
        historyApiFallback: true,
        hot: true
    },
    module: {
        rules: [
            {test: /\.js$/, use: "babel-loader"},
            {test: /\.css$/, use: ["style-loader", "css-loader"]}
        ]
    },
    plugins: [
        new htmlwebpackplugin({
            template: "app/index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devtool: "source-map"
};
