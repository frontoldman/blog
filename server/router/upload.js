/**
 * Created by zhangran on 17/1/17.
 */

import koaRouter from 'koa-router'
import body from 'koa-better-body'

const router = koaRouter()

router.post('/upload', body(), function *(next) {
  console.log(this.request.files)
  this.body = {}
})

export default router