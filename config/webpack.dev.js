/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
const webpackMerge = require('webpack-merge');

const ENV = 'development';

const commonConfig = require('./webpack.common.js')({ env: ENV });

const config = webpackMerge.smart(commonConfig, {
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.p?css$/,
                use: [
                    'style-loader?sourceMap=true',
                    'css-loader?sourceMap=true',
                    'postcss-loader?sourceMap=true'
                ]
            }
        ]
    }
});

module.exports = config;
