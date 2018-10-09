/* eslint import/no-extraneous-dependencies: 0 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');

const DEV_START_PORT = '8080';
const DEV_START_HOST = 'localhost';
const DEV_START_URL = `http://${DEV_START_HOST}:${DEV_START_PORT}`;

webpackConfig.entry.app.unshift(`webpack-dev-server/client?${DEV_START_URL}`);
webpackConfig.entry.app.unshift('webpack/hot/only-dev-server');
webpackConfig.entry.app.unshift('react-hot-loader/patch');
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
webpackConfig.plugins.push(new webpack.NamedModulesPlugin());

const frontendCompiler = webpack(webpackConfig);

const frontendServer = new WebpackDevServer(frontendCompiler, {
    contentBase: webpackConfig.output.path,
    publicPath: webpackConfig.output.publicPath,
    filename: webpackConfig.output.filename,
    hot: true,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    inline: true,
    lazy: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    headers: { 'X-Custom-Header': 'yes' },
    stats: { colors: true }
});

frontendServer.listen(DEV_START_PORT, DEV_START_HOST, () => {
    console.log(`Frontend server running at ${DEV_START_URL}...`);
});
