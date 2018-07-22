const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    entry: "./public/js/index.js",
    devtool: "cheap-eval-source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: "style-loader"},
                    { loader: "css-loader" }                    
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                use: [
                    { loader: "file-loader"}                    
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({ template: './public/index.html' })
    ]    
}