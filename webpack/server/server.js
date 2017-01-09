/**
 * Created by zhangran on 16/9/22.
 */
import path from 'path'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-session-store'
import MongooseStore from 'koa-session-mongoose'
import favicon from 'koa-favicon'

import {server} from '../../config'
import handleRender from './handleRender'
import router from '../../server/router/'
import auth from '../../server/middleware/auth'

var app = Koa()

// cookie签名
app.keys = ['gg', 'fat gg']

app.use(favicon(path.resolve('./public/favicon.ico')))
app.use(logger())
app.use(session({
  store: new MongooseStore()
}))
app.use(bodyParser())

app.use(auth)
app.use(router.routes())
app.use(handleRender)

export default function (fn) {
  app.listen(server.port, '0.0.0.0', error => {
    if (error) {
      fn(error)
      return
    }
    console.log(`server start on ${server.port}`)
  })
}
