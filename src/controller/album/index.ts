import { Next } from 'koa'
import { RouterContext } from 'koa-router'
import { ErrorModel, SuccessModel } from '../../utils/resModel'
import Serviec from './service'

export default class Album {
  static async create(ctx: RouterContext, next: Next) {
    console.log(ctx.state)
    const userId = ctx.state.user._id
    console.log('user id', userId)
    const name = ctx.request.body.name
    const res = await Serviec.create(userId, name)
    if (res) {
      ctx.body = new SuccessModel(res, '')
    } else {
      ctx.body = new ErrorModel('出错了')
    }
  }

  static async del(ctx: RouterContext, next: Next) {
    const userId = ctx.state.user.suerId
    const id = ctx.query.id
    const res = await Serviec.delete(id)
    if (res) {
    }
  }

  static async getAlbum(ctx: RouterContext, next: Next) {
    const userId = ctx.state.user.userId
    const pageSize = ctx.request.body.pageSize
    const pageNum = ctx.request.body.pageNum
    const res = await Serviec.getAlbumList(pageSize, pageSize * pageNum)
    if (res) {
      ctx.body = new SuccessModel(res, '')
    }
  }
}
