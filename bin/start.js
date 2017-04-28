import co from 'co'
import crypto from 'crypto'
import startDB from '../server/model/'
import User from '../server/model/User'
import UserGroup from '../server/model/UserGroup'

co(function *() {
	yield startDB

	var group = yield UserGroup.create({
      name: '管理员',
      des: '我是一个管理员'
	})

	var password = '123456'
	var passwordHashed = crypto.createHash('md5').update(password).digest('hex')

	var user = yield User.create({
    username: 'admin',
    nickname: '张大哥哥',
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493376166407&di=21fd37a56ba58374f0a8e960aa91cad5&imgtype=0&src=http%3A%2F%2Fimg.iecity.com%2FUpload%2FFile%2F201511%2F30%2F20151130095248246.jpg',
    group: group._id,
    password: passwordHashed
  })

  console.log('初始化用户成功')
  console.log('用户名： ' + 'admin')
  console.log('密码： ' + password)
  process.exit()
}).catch(function(e) {
	console.log('初始化用户失败')
	console.log(e)
	process.exit()
})