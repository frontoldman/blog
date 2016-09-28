/**
 * Created by zhangran on 16/9/22.
 */

import Koa from 'koa'

import {server} from '../../config'
import handleRender from './handleRender'

var app = Koa()

app.use(handleRender)

app.listen(server.port, error => {
  if(error){
    console.log(error)
    return
  }
  console.log(`server start on ${server.port}`)
})