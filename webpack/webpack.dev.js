const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    bail: false,
    devtool: 'inline-source-map',
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        watchContentBase: true,
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new DashboardPlugin(),
        new CopyPlugin([
            {
                from: path.join(__dirname, '../src/favicon.ico'),
                to: path.join(__dirname, '../dist')
            }
        ])
    ]
});
