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

export default router
