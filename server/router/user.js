var router = require('koa-router')()
var crypto = require('crypto')
var UserGroup = require('../model/UserGroup')
var User = require('../model/User')

// 添加userGroup
router.post('/group', function *(next) {
  var body = this.request.body,
    userGroup = yield UserGroup.create({
      name: body.name,
      des: body.des
      // creater: this.session.user._id
    })



  this.body = {code: 1000}
})

// 获取userGroup列表
router.get('/group', function *(next) {
  var { pageSize, pageCur } = this.query
  var userGroupList = yield UserGroup
    .find()
    .skip(pageCur * pageSize)
    .limit((pageCur + 1) * pageSize)
    .populate('creater', 'nickname')

  this.body = userGroupList
})

// 获取用户组详情
router.get('/group/:id', function *(next) {
  var userGroup = yield UserGroup.findOne({_id: this.params.id})
  this.body = userGroup
})

// 修改用户组信息
router.put('/group/:id', function *(next) {
  var body = this.request.body
  var userGroup = yield UserGroup.update(
    {_id: this.params.id},
    {name: body.name, des: body.des, updateTime: new Date()})
  this.body = userGroup
})

// 删除单个用户组信息
router.delete('/group/:id', function *(next) {
  var userGroup = yield UserGroup.findOneAndRemove({_id: this.params.id})
  this.body = userGroup
})

// 增加单个用户
router.post('/admin', function *(next) {
  var body = this.request.body

  //  默认密码
  var defaultPassword = body.password || '1'
  var passwordHashed = crypto.createHash('md5').update(defaultPassword).digest('hex')

  var user = yield User.create({
    username: body.username,
    nickname: body.nickname,
    avatar: body.avatar,
    group: body.groupId,
    password: passwordHashed
  })

  yield UserGroup
    .update(
      {_id: body.groupId},
      {'$addToSet': {users: user._id}}
    )

  this.body = user
})

//  查询所有用户
router.get('/admin', function *(next) {
  var userList = yield User
    .find()
    .populate('creater', 'nickname')
    .populate('group', 'name')
  this.body = userList
})

//  删除单个用户
router.delete('/admin/:id', function *(next) {
  var user = yield User.findOneAndRemove({_id: this.params.id})
  yield UserGroup.update({_id: user.group}, {
    '$pull': {users: user._id}
  })
  this.body = user
})

//  查找单个用户
router.get('/admin/:id', function *(next) {
  var user = yield User.findOne({_id: this.params.id})
    .populate('group')
  this.body = user
})

router.put('/admin/:id', function *(next) {
  var body = this.request.body
  var user = yield User.findOne({_id: this.params.id})

  //  删掉已存在UserGroup中的user id
  yield UserGroup.update({_id: user.groupId}, {
    '$pull': {users: user._id}
  })

  //  存储user
  user.username = body.username
  user.nickname = body.nickname
  user.avatar = body.avatar
  user.group = body.groupId

  if (typeof body.password !== 'undefined') {
    user.password = crypto.createHash('md5').update(body.password).digest('hex')
  }
  yield user.save()

  yield UserGroup.update({_id: body.groupId}, {'$addToSet': {users: user._id}})
  this.body = user
})

module.exports = router
