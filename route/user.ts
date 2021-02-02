import Router, { RouterContext }  from 'koa-router'
// import userInstance from '../controller/user/index'

const routerInsance = new Router({
  prefix: '/api/services/app'
})

routerInsance.get('/', async (ctx: RouterContext) => {
  console.log(ctx.session)
  ctx.body = ctx.session
})

// 注册新用户
// routerInsance.post('/register', userInstance.createUser)

// 用户登录
// routerInsance.post('/login', userInstance.login)

export default routerInsance
