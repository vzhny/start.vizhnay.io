/* eslint-disable */
const merge = require('webpack-merge');
const chalk = require('chalk');
const ip = require('ip');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config.js');

const url = chalk.bold(chalk.blue('http://localhost:8080'));
const networkIP = chalk.bold(chalk.blue(`http://${ip.address()}:8080`));
const sigInt = chalk.bold(chalk.white('Ctrl + C'));

module.exports = merge(webpackBaseConfig, {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    open: true,
    quiet: true,
    host: '0.0.0.0',
    public: 'localhost:8080',
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `Dev server is successfully running on ${url}!`,
          `Access the dev server externally on ${networkIP}!`,
        ],
        notes: [`Press ${sigInt} to stop the server.`],
      },
    }),
  ],
});
