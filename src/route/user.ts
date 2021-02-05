import Router, { RouterContext } from 'koa-router'
import { CheckInput } from '../middleware/checkInput'
import { User } from '../controller/user'

const userInstance = new User()

const routerInsance = new Router({
  prefix: '/api/user'
})

const schema = { type: 'string' }
const data = { cola: 'aaa' }

const instance = new CheckInput(schema, data)

routerInsance.post('/register', userInstance.createUser)

// routerInsance.post('/register', async (ctx: RouterContext, next) => {
//   await next()
// })

export default routerInsance
