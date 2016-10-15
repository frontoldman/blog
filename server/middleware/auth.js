var User = require('../model/User')

module.exports = function *(next) {
  var authFn = notAuth.bind(this),
    userId = this.cookies.get('userId'),
    user

  // return authFn();

  if (this.session.user) {
    return yield next
  }

  if (userId && (user = yield User.findOne({_id: userId}))) {
    this.session.user = user
    yield next
  } else {
    authFn()
  }
}

function notAuth () {
  this.throw('用户没有登陆', 401)
}
