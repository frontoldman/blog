import koaRouter from 'koa-router'
import upload from './upload'
import user from './user'
import login from './login'
import article from './article'
import comment from './comment'

const router = koaRouter()

router.use('/api', upload.routes())
router.use('/api/user', user.routes())
router.use('/api', login.routes())
router.use('/api/article', article.routes())
router.use('/api/comment', comment.routes())

module.exports = router
