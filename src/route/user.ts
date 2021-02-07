import Router from 'koa-router'
import User from '../controller/user/index'
import debug from 'debug'

const log = debug('my:router')

const userInstance = new User()

const routerInsance = new Router({
  prefix: '/api/user'
})

const register = userInstance.register.bind(userInstance)
routerInsance.get('/list', async (ctx, next) => {
  log('cts is ::: %O', ctx)
  ctx.body = '用户信息'
})

routerInsance.post('/register', register)

export default routerInsance
