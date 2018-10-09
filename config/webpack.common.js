/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const Visualizer = require('webpack-visualizer-plugin');

const helpers = require('./helpers');

const webpackConfig = function (options) {
    const { env } = options;
    const folder = options.folder || '';

    const isProd = env === 'production';

    return {
        mode: isProd ? 'production' : 'development',
        entry: {
            app: ['babel-polyfill', helpers.root('src', 'index.jsx')]
        },
        output: {
            path: helpers.root('build'),
            publicPath: isProd ? '' : '/',
            filename: isProd ? `${folder}[chunkhash].[name].js` : `${folder}[name].js`
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: [
                helpers.root('src'),
                helpers.root('node_modules')
            ]
        },
        module: {
            rules: [
                // scripts
                {
                    test: /\.jsx?$/,
                    use: {
                        loader: 'babel-loader',
                        options: { cacheDirectory: true }
                    },
                    include: [
                        helpers.root('src')
                    ]
                },

                // styles
                {
                    test: /\.p?css$/,
                    use: [
                        'style-loader',
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: helpers.root('config')
                                }
                            }
                        }
                    ]
                },

                // images
                {
                    test: /\.(svg)$/,
                    use: {
                        loader: 'svg-sprite-loader',
                        options: {
                            name: folder + '[name].[ext]'
                        }
                    },
                    include: [
                        helpers.root('src')
                    ]
                },

                // html
                {
                    test: /\.html$/,
                    loader: 'html-loader?minimize=false'
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(options.env)
            }),
            new HtmlWebpackPlugin({
                inject: 'body',
                template: 'src/index.html'
            }) /* ,
            new Visualizer({
                filename: './statistics.html'
            }) */
        ]
    };
};

module.exports = webpackConfig;
