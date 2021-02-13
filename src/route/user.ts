import Router from 'koa-router'
import User from '../controller/user/index'
import debug from 'debug'

const log = debug('my:router')

const userInstance = new User()

const routerInsance = new Router({
  prefix: '/api/user'
})

const register = userInstance.register.bind(userInstance)

routerInsance.get('/test', async ctx => {
  ctx.body = ctx.state.user
})

const login = userInstance.login.bind(userInstance)

routerInsance.post('/login', login)

routerInsance.post('/register', register)

export default routerInsance
