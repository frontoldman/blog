var User = require('../model/User')

module.exports = function *(next) {
  var userId = this.cookies.get('userId'),
    user

  if (this.session.user) {
    return yield next
  }

  if (userId && (user = yield User.findOne({_id: userId}))) {
    this.session.user = user
    return yield next
  }

  yield next
}
