/* eslint-disable */
const merge = require('webpack-merge');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
  optimization: {
    minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin()],
    splitChunks: {
      chunks: 'all',
      name: true,
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              [
                'babel-plugin-transform-react-remove-prop-types',
                {
                  removeImport: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
});
