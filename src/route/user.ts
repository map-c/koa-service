import Router from 'koa-router'
import User from '../controller/user/index'
import { SECRET } from '../config/constant'
import jwt from 'jsonwebtoken'
import debug from 'debug'
import { SuccessModel } from '../utils/resModel'

const log = debug('my:router')

const userInstance = new User()

const routerInsance = new Router({
  prefix: '/api/user'
})

const register = userInstance.register.bind(userInstance)

routerInsance.get('/public/info', async ctx => {
  const header = ctx.request.header
  const str = header['authorization']
  if (str) {
    console.log('str is', str)
    const token = str.split(' ')[1]
    console.log('token is', token)
    const res = jwt.decode(token, { complete: true }) as any
    console.log('解析结果', res.payload)
    ctx.body = new SuccessModel(res.payload)
  } else {
    ctx.body = new SuccessModel(false)
  }
})

const login = userInstance.login.bind(userInstance)

routerInsance.post('/public/login', login)

routerInsance.post('/register', register)

export default routerInsance
