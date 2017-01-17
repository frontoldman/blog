import mongoose from 'mongoose'
import { addPublicHook } from './util'
var Schema = mongoose.Schema

var UserGroupSchema = new Schema({
  name: String,
  des: String,
  creater: {type: Schema.Types.ObjectId, ref: 'User'},
  users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  createTime: {type: Date, default: Date.now},
  updateTime: {type: Date, default: Date.now}
})

addPublicHook(UserGroupSchema)

var UserGroup = mongoose.model('UserGroup', UserGroupSchema)

module.exports = UserGroup
