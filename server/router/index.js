import koaRouter from 'koa-router'
import user from './user'
import login from './login'
import article from './article'

const router = koaRouter()

router.use('/api/user', user.routes())
router.use('/api', login.routes())
router.use('/api/article', article.routes())

module.exports = router
