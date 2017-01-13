/**
 * Created by zhangran on 17/1/13.
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CommentSchema = new Schema({
  content: String,
  article: {type: Schema.Types.ObjectId, ref: 'Article'},
  creater: {type: Schema.Types.ObjectId, ref: 'User'},
  createTime: {type: Date, default: Date.now},
  updateTime: {type: Date, default: Date.now}
})

var Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
