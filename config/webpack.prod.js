/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const getConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const ENV = 'production';
const ASSETS_PATH = './assets/';

const commonConfig = getConfig({
    env: ENV,
    folder: ASSETS_PATH
});

const config = webpackMerge.smart(commonConfig, {
    module: {
        rules: [
            {
                test: /\.p?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: helpers.root('config')
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            sourceMap: true,
            parallel: true,
            uglifyOptions: {
                ecma: 6,
                output: {
                    comments: false,
                    beautify: false
                },
                warnings: false
            }
        }),
        new OptimizeCSSAssetsPlugin({})
    ]
});

module.exports = config;
