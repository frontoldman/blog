/**
 * Created by zhangran on 16/9/22.
 */
import path from 'path'
import zlib from 'zlib'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-session-store'
import MongooseStore from 'koa-session-mongoose'
import favicon from 'koa-favicon'
import compress from 'koa-compress'
import koaStatic from 'koa-static'

import {server} from '../../config'
import handleRender from './handleRender'
import router from '../../server/router/'
import auth from '../../server/middleware/auth'
import multipartParser from '../../server/middleware/multipartParser'

var app = Koa()

// cookie签名
app.keys = ['gg', 'fat gg']

app.use(favicon(path.resolve('./public/favicon.ico')))
app.use(logger())
app.use(session({
  store: new MongooseStore()
}))
app.use(bodyParser())
app.use(multipartParser({
  uploadDir: path.resolve('./upload')
}))
app.use(compress({
  filter: function (content_type) {
    return /text/i.test(content_type)
  },
  threshold: 2048,
  flush: zlib.Z_SYNC_FLUSH
}))
app.use(koaStatic(path.resolve('./public')))
app.use(koaStatic(path.resolve('./upload')))

app.use(auth)
app.use(router.routes())
app.use(handleRender)

app.on('error', function(err){
  console.log(err)
})

export default function (fn) {
  app.listen(server.port, '0.0.0.0', error => {
    if (error) {
      fn(error)
      return
    }
    console.log(`server start on ${server.port}`)
  })
}
