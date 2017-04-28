/**
 * Created by zhangran on 16/10/24.
 */

import koaRouter from 'koa-router'
import Article from '../model/Article'
import markdown from 'markdown'

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
  pageSize = parseInt(pageSize, 10)
  pageNumber = parseInt(pageNumber, 10)
  this.body = yield *queryList({}, pageSize, pageNumber)
})

// 前台获取文章详情
router.get('/:id', function *(next) {
  var article = yield Article.findOne({_id: this.params.id})
  article.content = markdown.markdown.toHTML(article.content)
  this.body = article
})

// 管理员获取文章详情
router.get('/admin/:id', function *(next) {
  var article = yield Article.findOne({_id: this.params.id})
  this.body = article
})

/**
 * 删除文章
 */
router.delete('/:id', function *(next) {
  var article = yield Article.findOneAndRemove({_id: this.params.id})
  this.body = article
})

// 修改文章信息
router.put('/:id', function *(next) {
  var body = this.request.body
  var { title, content, tags } = body
  tags = tags || ''
  var article = yield Article.update(
    {_id: this.params.id},
    {title, content, tags: tags.split(/\s+/)})
  this.body = article
})

// 获取管理员文章列表
router.get('/admin', function *(next) {
  var { pageSize, pageNumber } = this.query
  var user = this.session.user
  this.body = yield *queryList({creater: user._id}, pageSize, pageNumber)
})

function *queryList (query, pageSize, pageNumber) {
  var method
  var pageCount

  function getDetail () {
    return Article
      .find(query)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize*1)
      .sort({ createTime: 1 })
      .populate('creater', 'nickname')
  }

  function getSum () {
    return Article.count(query)
  }

  var result = yield Promise.all([getDetail(), getSum()])
  pageCount = result[1] / pageSize
  method = Number.isInteger(pageCount) ? Math.floor : Math.ceil
  pageCount = method.call(Math, pageCount)

  return {
    list: result[0],
    page: {
      pageNumber: pageNumber * 1,
      pageCount: pageCount
    }
  }
}

export default router
