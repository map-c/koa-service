import { valid } from '../../utils/validate'
import { RouterContext } from 'koa-router'
import { createUser, findUser } from './service'
import { SuccessModel } from '../../utils/resModel'
import debug from 'debug'
import { Next } from 'koa'

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

  async register(this: User, ctx: RouterContext, next: Next) {
    const data = ctx.request.body as UserInfo
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
      // log('注册信息有误：%O', state.errors)
      ctx.throw(400, '客户端参数错误')
    }
    log('ctx is %O', ctx)
    const res = await createUser(data)

    // log('存储成功：', res)
    if (res) {
      log('响应客户端 %O', ctx)
      // log('响应客户端 %O', ctx.body)
      const result = new SuccessModel(true, '注册成功')
      log('res is %O', result)
      ctx.body = result
    }
  }
}
