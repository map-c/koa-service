import UserModel from '../model/user'
import { RouterContext } from 'koa-router'
import debug from 'debug'
import { valid } from '../utils/validate'

const log = debug('my:userManage')

export class User {
  constructor() {}

  validate(schema: any, data: any) {
    const validFn = valid(schema)
    const state = validFn(data)
    if (!state) {
      log('参数出错了：%O', validFn.errors)
    }
    return {
      valid: state,
      errors: validFn.errors
    }
  }

  async createUser(ctx: RouterContext) {
    const data = ctx.request.body
    log('this is', this)
    const schema = {
      type: 'object',
      proprties: {
        userName: {
          type: 'string'
        },
        password: {
          type: 'string',
          minlength: 6
        },
        nickName: {
          type: 'string'
        },
        email: {
          type: 'string',
          format: 'email'
        },
        auth: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }
    }
    const res = this.validate(schema, data) // 参数校验
    if (!res.valid) {
      ctx.throw(400, '参数有误') // 错误处理
    }
    const instance = new UserModel(data) // 数据库存储数据
    instance.save((err, doc) => {
      if (err) {
        ctx.throw('500', '保存用户信息出错了') // 错误处理
      }
      if (doc) {
        ctx.body = 'success'
      }
    })
  }
}
