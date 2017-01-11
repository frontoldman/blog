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
  var { pageSize, pageNumber } = this.query
  var pageCount
  var method

  function getDetail () {
    return Article
      .find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageNumber * pageSize)
      .populate('creater', 'nickname')
  }

  function getSum () {
    return Article.count()
  }

  var result = yield Promise.all([getDetail(), getSum()])
  pageCount = result[1] / pageSize
  method = Number.isInteger(pageCount) ? Math.floor : Math.ceil
  pageCount = method.call(Math, pageCount)

  this.body = {
    list: result[0],
    page: {
      pageNumber: pageNumber * 1,
      pageCount: pageCount
    }
  }
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
