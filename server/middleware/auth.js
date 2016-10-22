var User = require('../model/User')

module.exports = function *(next) {
  var userId = this.cookies.get('userId')
  var user

  if (this.request.path === '/api/login') {
    return yield next
  }

  if (this.session.user) {
    if (this.request.path === '/login') {
      return this.redirect('/admin/dashboard')
    }
    return yield next
  }

  if (userId && (user = yield User.findOne({_id: userId}))) {
    this.session.user = user
    if (this.request.path === '/login') {
      return this.redirect('/admin/dashboard')
    }
    yield next
  } else {
    const { xhr } = this.request.header
    if (!xhr) {
      if (this.request.path !== '/login') {
        this.redirect('/login')
      } else {
        yield next
      }
    } else {
      this.throw('用户没有登陆', 401)
    }
  }
}
