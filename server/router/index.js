/**
* user 路由
**/

var router = require('koa-router')()
var user = require('./user')
var login = require('./login')

router.use('/api/user', user.routes())
router.use('/api', login.routes())

module.exports = router
