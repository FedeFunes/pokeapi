const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const WebpackMonitor = require('webpack-monitor');
const argv = require('yargs').argv;
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    bail: true,
    plugins: [
        new StatsWriterPlugin({
            filename: 'stats.json'
        }),
        new WebpackMonitor({
            capture: true,
            launch: argv.monitor
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
});
