var router = require('koa-router')()
var crypto = require('crypto')
var util = require('../../util/index')
var User = require('../model/User')

router.post('/login', function *(next) {
  var body = this.request.body
  var password = crypto.createHash('md5').update(body.password).digest('hex')

  var user = yield User.findOne({username: body.username, password: password})

  if (user) {
    this.cookies.set('userId', user._id, {
      signed: false,
      expires: util.getDate(7)
    })
    this.session.user = user
    this.body = user
  } else {
    this.status = 401
    this.body = {
      'message': '登录失败'
    }
  }
})

router.get('/logout', function *(next) {
  this.cookies.set('userId', 0, {
    signed: false,
    expires: util.getDate(-1)
  })
  delete this.session.user
  this.body = {
    message: '退出成功'
  }
})

module.exports = router
