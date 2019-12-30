const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

require('dotenv').config();

module.exports = {
    entry: {
        main: [
            '@babel/polyfill',
            path.join(__dirname, '../src/index.js')
        ]
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../dist'),
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/'
                        }
                    }
                ]
            }
        ]
    },
    output: {
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].bundle.js',
    },
    performance: {
        hints: false
    },
    plugins: [
        new webpack.DefinePlugin({
            CONFIG: {
                CONNECT_TO_DEV_TOOLS: JSON.stringify(
                    process.env.CONNECT_TO_DEV_TOOLS
                ),
                ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT)
            }
        }),
        new HtmlWebPackPlugin({
            template: path.join(__dirname, '../src/index.html'),
            filename: 'index.html',
            favicon: path.join(__dirname, '../src/favicon.ico')
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            chunkFilename: '[hash].css'
        }),
        new CleanWebpackPlugin(['dist'], {
            root: process.cwd()
        }),
        new CopyPlugin([{
            from: path.join(__dirname, '../src/favicon.ico'),
            to: path.join(__dirname, '../dist')
        }])
    ]
};
