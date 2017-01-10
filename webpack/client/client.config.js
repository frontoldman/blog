import path from "path";
import webpack from "webpack";
import WebpackIsomorphicToolsPlugin from "webpack-isomorphic-tools/plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import isomorphicToolsConfig from "../isomorphic.tools.config";
import {client} from "../../config";

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicToolsConfig)

const cssLoader = [
  'css?modules',
  'sourceMap',
  'importLoaders=1',
  'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&')

const cssLoader2 = [
  'css?modules',
  'sourceMap',
  'importLoaders=1',
  'localIdentName=[local]'
].join('&')


const config = {
  // 项目根目录
  context: path.join(__dirname, '../../'),
  devtool: 'cheap-module-eval-source-map',
  entry: [
    `webpack-hot-middleware/client?reload=true&path=http://${client.host}:${client.port}/__webpack_hmr`,
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, '../../build'),
    filename: 'index.js',
    publicPath: '/build/',
    chunkFilename: '[name]-[chunkhash:8].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: [/node_modules/]
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('less'),
        loader: ExtractTextPlugin.extract('style', `${cssLoader}!less`)
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('css'),
        exclude: [/node_modules/],
        loader: ExtractTextPlugin.extract('style', `${cssLoader}`)
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('css'),
        include: [/node_modules/],
        loader: ExtractTextPlugin.extract('style', `${cssLoader2}`)
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url?limit=10000'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),
    webpackIsomorphicToolsPlugin
  ]
}

export default config
