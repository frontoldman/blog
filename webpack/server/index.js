/**
 * Created by zhangran on 16/9/22.
 */
import path from "path";
import WebpackIsomorphicTools from "webpack-isomorphic-tools";
import co from 'co'
import db from '../../server/model/'

import isomorphicToolsConfig from '../isomorphic.tools.config'

var basePath = path.join(__dirname, '../../')

global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicToolsConfig)
  .development(true)
  .server(basePath, () => {
    co(function *() {
      console.log('log')

      const dbServerError = yield db
      if(!dbServerError){
        console.log('connect to db successfully')
       // console.log(`start mongodb on ${config.db.url} successfully`)
      }
    })
    require('./server')
  })