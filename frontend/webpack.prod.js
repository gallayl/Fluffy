/* eslint-disable @typescript-eslint/no-var-requires */
// const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const { RelativeCiAgentWebpackPlugin } = require('@relative-ci/agent')
// const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
  },
  optimization: {
    // splitChunks: {
    //   chunks: 'all',
    //   maxInitialRequests: Infinity,
    //   minSize: 0,
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name(module) {
    //         // get the name. E.g. node_modules/packageName/not/this/part.js
    //         // or node_modules/packageName
    //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
    //         // npm package names are URL-safe, but some servers don't like @ symbols
    //         return `npm.${packageName.replace('@', '').slice(0, 12)}`
    //       },
    //     },
    //   },
    // },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './favicon.ico',
      attributes(chunk) {
        return { charset: 'UTF-8' }
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // new CopyPlugin([
    //   { from: path.resolve(`${__dirname}/_redirects`), to: path.resolve(`${__dirname}/build`) },
    //   { from: path.resolve(`${__dirname}/web.config`), to: path.resolve(`${__dirname}/build`) },
    // ]),
    // new RelativeCiAgentWebpackPlugin({
    //   enabled: process.env.GITHUB_ACTIONS, // Run this only under GitHub Actions
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
        ],
      },
    ],
  },
})
