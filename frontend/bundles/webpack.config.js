const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, '..', 'assets/js/index.js'), 
        auth: path.resolve(__dirname, '..', 'assets/js/authentication.js'),
        generation: path.resolve(__dirname, '..', 'assets/js/generation.js'),
        total: path.resolve(__dirname, '..', 'assets/js/total.js'),
        flow: path.resolve(__dirname, '..', 'assets/js/flow.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', 
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'main.css'})
    ],
};