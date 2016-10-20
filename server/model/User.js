var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  username: String,
  nickname: String,
  password: String,
  creater: {type: Schema.Types.ObjectId, ref: 'User'},
  group: {type: Schema.Types.ObjectId, ref: 'UserGroup'},
  createTime: {type: Date, default: Date.now},
  updateTime: {type: Date, default: Date.now}
})

var User = mongoose.model('User', UserSchema)

module.exports = User
