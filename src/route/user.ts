import Router, { RouterContext } from 'koa-router'
import { CheckInput } from '../middleware/checkInput'
import User from '../controller/user'

const userInstance = new User()

const routerInsance = new Router({
  prefix: '/api/user'
})

const login = userInstance.login.bind(userInstance)

routerInsance.post('/register', login)

// routerInsance.post('/register', async (ctx: RouterContext, next) => {
//   await next()
// })

export default routerInsance
