import path from "path"
import webpack from "webpack"
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'

import isomorphicToolsConfig from '../isomorphic.tools.config'

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicToolsConfig)

const config = {
  // 项目根目录
  context: path.join(__dirname, '../../'),
  devtool: 'cheap-module-eval-source-map',
  entry: [
    `webpack-hot-middleware/client?reload=true&path=http://localhost:8888/__webpack_hmr`,
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
    publicPath: '/build/',
    chunkFilename: '[name]-[chunkhash:8].js'
  },
  module: {
    loaders: [
      {
        test : /\.js$/,
        loader: 'babel',
        exclude : [/node_modules/]
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('styles'),
        loader: "style!css",
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url?limit=10000'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    webpackIsomorphicToolsPlugin
  ]
}

export default config