/**
 * Created by zhangran on 17/1/13.
 */

import koaRouter from 'koa-router'
import Comment from '../model/Comment'
import markdown from 'markdown'

const router = koaRouter()

router.post('/:articleId', function *(next) {
  var { articleId } = this.params
  var body = this.request.body
  var { content} = body
  yield Comment.create({
    article: articleId,
    content,
    creater: this.session.user._id
  })

  this.body = {code: 1000}
})

router.get('/:articleId', function *(next) {
  var { articleId } = this.params
  var comment = yield Comment
    .find({article: articleId})
    .populate('creater')

  if (Array.isArray(comment)) {
    comment.forEach(item => item.content = markdown.markdown.toHTML(item.content))
  }

  this.body = comment
})

router.post('/zan/:commentId', function * (next) {
  var { commentId } = this.params
  var comment
  var action

  var result = yield Comment.find({
    _id: commentId,
    zan: this.session.user._id
  })

  if (result.length) {
    action = 'pull'
  } else {
    action = 'addToSet'
  }

  /**
   * mongoose 操作子文档数组的方法和js数组方法类似,还扩充了一些
   * push 添加一条
   * addToSet 也是添加一条,不过会过滤重复项
   */
  comment = yield Comment.update({_id: commentId}, {[`$${action}`]: {zan: this.session.user._id}})
  this.body = comment
})

router.post('/fan/:commentId', function * (next) {
  var { commentId } = this.params
  var comment
  var action

  var result = yield Comment.find({
    _id: commentId,
    fan: this.session.user._id
  })

  if (result.length) {
    action = 'pull'
  } else {
    action = 'addToSet'
  }

  comment = yield Comment.update({_id: commentId}, {[`$${action}`]: {fan: this.session.user._id}})
  this.body = comment
})

export default router
