var User = require('../model/User')

module.exports = function *(next) {
  var userId = this.cookies.get('userId')
  var user
  var path = this.request.path

  if (path === '/api/login') {
    return yield next
  }

  if (this.session.user) {
    if (path === '/login') {
      return this.redirect('/admin/dashboard')
    }
    return yield next
  }

  if (userId && (user = yield User.findOne({_id: userId}))) {
    this.session.user = user
    if (path === '/login') {
      return this.redirect('/admin/dashboard')
    }
    yield next
  } else {
    const { xhr } = this.request.header
    if (!xhr) {
      if (path !== '/login') {
        this.redirect('/login')
      } else {
        yield next
      }
    } else {
      this.throw('用户没有登陆', 401)
    }
  }
}
