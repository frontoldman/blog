import koaRouter from 'koa-router'
import user from './user'
import login from './login'
import article from './article'
import comment from './comment'

const router = koaRouter()

router.use('/api/user', user.routes())
router.use('/api', login.routes())
router.use('/api/article', article.routes())
router.use('/api/comment', comment.routes())

module.exports = router
