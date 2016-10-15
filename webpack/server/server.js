/**
 * Created by zhangran on 16/9/22.
 */

import Koa from 'koa'
import {server} from '../../config'
import handleRender from './handleRender'
import router from '../../server//router/'

var app = Koa()

app.use(router.routes())
app.use(handleRender)

export default function (fn) {
  app.listen(server.port, error => {
    if (error) {
      fn(error)
      return
    }
    console.log(`server start on ${server.port}`)
  })
}
