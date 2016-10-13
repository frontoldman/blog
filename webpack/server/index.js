/**
 * Created by zhangran on 16/9/22.
 */

import path from "path";
import WebpackIsomorphicTools from "webpack-isomorphic-tools";
import co from 'co'
import startDB from '../../server/model/'

import isomorphicToolsConfig from '../isomorphic.tools.config'

var basePath = path.join(__dirname, '../../')

global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicToolsConfig)
  .development(true)
  .server(basePath, () => {
    const startServer  = require('./server')
    co(function *() {
      yield startDB
      yield startServer
    })
  })