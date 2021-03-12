import { RouterContext } from 'koa-router'
import { SuccessModel } from '../../utils/resModel'
import Service from './service'
import debug from 'debug'

const log = debug('my:photo')

export default class Photo {
  static async getList(ctx: RouterContext) {
    const list = await Service.getList()
    if (list) {
      ctx.body = new SuccessModel(list)
    }
  }

  static async add(ctx: RouterContext) {
    const data = ctx.request.body
    console.log((ctx.req as any).file)
    const fieldName = (ctx.req as any).file.filename
    const url = `http://localhost:9527/img/${fieldName}`
    const userId = ctx.state.user.userId
    const param = {
      userId: userId,
      albumId: data.albumId,
      url: url
    }
    log('图片信息 %O', param)
    const res = await Service.add(param)
    if (res) {
      ctx.body = new SuccessModel(res)
    }
  }
  static delete(ctx: RouterContext) {}
}
