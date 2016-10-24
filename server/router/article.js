/**
 * Created by zhangran on 16/10/24.
 */

import koaRouter from 'koa-router'
import Article from '../model/Article'

const router = koaRouter()

// 添加文章
router.post('/', function *(next) {
  var body = this.request.body
  var { title, content, tags } = body
  tags = tags || ''
  yield Article.create({
    title: title,
    content: content,
    tags: tags.trim().split(/\s+/),
    creater: this.session.user._id
  })

  this.body = {code: 1000}
})

// 获取文章列表
router.get('/', function *(next) {
  var { pageSize, pageCur } = this.query
  var articleList = yield Article
    .find()
    .skip(pageCur * pageSize)
    .limit((pageCur + 1) * pageSize)
    .populate('creater', 'nickname')

  this.body = articleList
})

// 获取文章详情
router.get('/:id', function *(next) {
  var article = yield Article.findOne({_id: this.params.id})
  this.body = article
})

// 修改文章信息
router.put('/:id', function *(next) {
  var body = this.request.body
  var { title, content, tags } = body
  tags = tags || ''
  var article = yield Article.update(
    {_id: this.params.id},
    {title, content, tags: tags.split(/\s+/), updateTime: new Date()})
  this.body = article
})

export default router
