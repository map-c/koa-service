import { valid } from '../../utils/validate'
import { RouterContext } from 'koa-router'
import { createUser, findUser } from './service'
import { ErrorModel, SuccessModel } from '../../utils/resModel'
import debug from 'debug'
import { Next } from 'koa'
import { sign } from 'jsonwebtoken'
import { SECRET } from '../../config/constant'

const log = debug('my:user')

export default class User {
  constructor() {}
  /**
   * 校验接口数据
   * @param data 待检测的数据
   * @param schema 数据的校验规则
   */
  private validate(data: any, schema: any) {
    const validateFn = valid(schema)
    const state = validateFn(data)
    return {
      valid: state,
      errors: validateFn.errors
    }
  }

  /**
   * 用户登录
   * @param this
   * @param ctx
   */
  async login(this: User, ctx: RouterContext) {
    const data = ctx.request.body
    log('用户名称： %s', data.userName)
    log('密码： %s', data.password)
    const schema = {
      type: 'object',
      required: ['userName', 'password'],
      properties: {
        userName: {
          type: 'string',
          minLength: 6
        },
        password: {
          type: 'string',
          minLength: 6
        }
      }
    }
    const state = this.validate(data, schema)
    log('参数校验结果：%O', state)
    if (!state.valid) {
      log('登录信息有误：%O', state.errors) // 处理错误数据结构并输出到前端
      ctx.throw(400, '客户端参数错误')
    }
    const res = await findUser(data)
    log('用户信息： %O', res)
    if (res) {
      const info = {
        userName: (res as any).userName,
        userId: (res as any)._id,
        nickName: (res as any).nickName,
        auth: (res as any).auth
      }
      const token = sign(info, SECRET, { expiresIn: '24h' })

      const result = {
        userName: info.userName,
        token: token
      }
      ctx.body = new SuccessModel(result, '登录成功')
    } else {
      ctx.body = new ErrorModel('密码错误')
    }
  }

  async register(this: User, ctx: RouterContext, next: Next) {
    const data = ctx.request.body
    const schema = {
      type: 'object',
      required: ['userName', 'password', 'email'],
      properties: {
        userName: {
          type: 'string',
          minLength: 6
        },
        password: {
          type: 'string',
          minLength: 6
        },
        email: {
          type: 'string',
          format: 'email'
        }
      }
    }
    const param = {
      userName: data.userName,
      password: data.password,
      email: data.email
    }
    const state = this.validate(param, schema)
    if (!state.valid) {
      ctx.throw(400, '客户端参数错误')
    }
    const res = await createUser(param)
    log('存储结果：%O', res)
    if (res) {
      const result = new SuccessModel(true, '注册成功')
      ctx.body = result
    }
  }
}
