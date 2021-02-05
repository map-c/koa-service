import { valid } from '../utils/validate'
import { RouterContext } from 'koa-router'
import { Next } from 'koa'
import debug from 'debug'
const log = debug('my:check')

export class CheckInput {
  schema: any
  data: any
  constructor(schema: any, data: any) {
    this.schema = schema
    this.data = data
  }

  async validate(ctx: RouterContext, next: Next) {
    const validFn = valid(this.schema)
    const state = validFn(this.data)
    if (!state) {
      log('参数有误：%O', validFn.errors)
    }
    await next()
  }
}
