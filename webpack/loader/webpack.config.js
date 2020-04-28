const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: "development",
    entry: path.join(__dirname, './src/main.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './dist')
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules: [{ test: /\.css/, use: ['style-loader', 'css-loader'] }]
    }
}