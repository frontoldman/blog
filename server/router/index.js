/**
* user 路由
**/

var router = require('koa-router')()
var user = require('./user')
var login = require('./login')

// 权限验证中间件
var auth = require('../middleware/auth')

router.use('/api/user', user.routes())
router.use('/api', login.routes())

module.exports = router
