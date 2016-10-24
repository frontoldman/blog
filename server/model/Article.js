var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ArticleSchema = new Schema({
  title: String,
  content: String,
  inType: {type: Number, enum: [1, 2]}, // 1: pc创建 2: mobile创建
  tags: {type: Array, default: []},
  creater: {type: Schema.Types.ObjectId, ref: 'User'},
  createTime: {type: Date, default: Date.now},
  updateTime: {type: Date, default: Date.now}
})

var Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
