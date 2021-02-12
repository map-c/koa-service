import { Next } from 'koa'
import { RouterContext } from 'koa-router'
import { SuccessModel } from '../../utils/resModel'
import Service from './service'

export default class Photo {
  static async add(ctx: RouterContext, next: Next) {
    const fieldName = ctx.request.body
    const url = `http://localhost:9527/uploads/${fieldName}`
    const id = ctx.state.user.id
    const res = await Service.add(url, id)
    if (res) {
      ctx.body = new SuccessModel(res, '')
    }
  }
  static delete(ctx: RouterContext, next: Next) {}
}
