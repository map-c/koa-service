import { valid } from '../../utils/validate'
import { RouterContext } from 'koa-router'
import { createUser, findUser } from './service'
import { SuccessModel } from '../../utils/resModel'
import debug from 'debug'
import { Next } from 'koa'
// import { getTokens } from '../../utils/jwt'
import { sign } from 'jsonwebtoken'

const log = debug('my:user')

export default class User {
  constructor() {}

  private validate(data: any, schema: any) {
    const validateFn = valid(schema)
    const state = validateFn(data)
    return {
      valid: state,
      errors: validateFn.errors
    }
  }

  async login(this: User, ctx: RouterContext) {
    const data = ctx.request.body
    const schema = {
      type: 'object',
      properties: {
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
    const res = await findUser(data)
    log('用户信息 %O', res)
    if (res) {
      const token = sign({ user: res }, 'cola-code', { expiresIn: '24h' })
      const result = {
        userName: res,
        token: token
      }
      ctx.body = new SuccessModel(result, '登录成功')
    }
  }

  async register(this: User, ctx: RouterContext, next: Next) {
    const data = ctx.request.body
    const schema = {
      type: 'object',
      required: ['userName', 'password'],
      properties: {
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
      ctx.throw(400, '客户端参数错误')
    }
    const res = await createUser(data)

    if (res) {
      const result = new SuccessModel(true, '注册成功')
      ctx.body = result
    }
  }
}
