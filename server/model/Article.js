var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ArticleSchema = new Schema({
  name: String,
  content: String,
  creater: {type: Schema.Types.ObjectId, ref: 'User'},
  createTime: {type: Date, default: Date.now},
  updateTime: {type: Date, default: Date.now}
})

var Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
