import { valid } from '../../utils/validate'
import { RouterContext } from 'koa-router'
import { createUser, findUser } from './service'
// import { Account } from '../../type/index'
import debug from 'debug'

const log = debug('my:user')

export default class User {
  private validate(data: any, schema: any) {
    const validateFn = valid(schema)
    const state = validateFn(data)
    return {
      valid: state,
      errors: validateFn.errors
    }
  }

  async login(this: User, ctx: RouterContext) {
    const data = ctx.request.body as Account
    const schema = {
      type: 'object',
      propertice: {
        userName: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      }
    }
    const state = this.validate(data, schema)

    if (!state.valid) {
      log('登录信息有误：%O', state.errors)
      ctx.throw(400, '客户端参数错误')
    }
    findUser(data)
      .then(res => {
        ctx.body = '登录成功'
      })
      .catch(err => {
        ctx.body = '密码错误'
      })
  }

  async register(this: User, ctx: RouterContext) {
    const data = ctx.request.body
    const schema = {
      type: 'object',
      propertice: {
        userName: {
          type: 'string'
        },
        password: {
          type: 'string'
        },
        email: {
          type: 'string'
        }
      }
    }
    const state = this.validate(data, schema)
    if (!state.valid) {
      log('注册信息有误：%O', state.errors)
      ctx.throw(400, '客户端参数错误')
    }
    createUser(data)
      .then(res => {
        if (res) {
          ctx.body = '注册成功'
        }
      })
      .catch(err => {
        ctx.throw(500, '服务器错误')
      })
  }
}
