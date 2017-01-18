/**
 * Created by zhangran on 17/1/17.
 */

import koaRouter from 'koa-router'

const router = koaRouter()

router.post('/upload', function *(next) {
  const { files } = this.request

  this.body = [
    ...files
  ]
})

export default router
