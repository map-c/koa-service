import { Next } from 'koa'
import { RouterContext } from 'koa-router'
import { ErrorModel, SuccessModel } from '../../utils/resModel'
import Serviec from './service'
import debug from 'debug'

const log = debug('my:album')

export default class Album {
  static async create(ctx: RouterContext, next: Next) {
    const userId = ctx.state.user.userId
    log('user id %s', userId)
    const name = ctx.request.body.name
    log('相册名称: %s', name)
    // TODO: 入参校验：用户名称和相册名称不能为空

    const res = await Serviec.create(userId, name)
    log('创建状态：%O', res)
    if (res) {
      ctx.body = new SuccessModel(res, '')
    } else {
      ctx.body = new ErrorModel('出错了')
    }
  }

  static async del(ctx: RouterContext, next: Next) {
    const userId = ctx.state.user.suerId
    const id = ctx.params.id
    log('将删除的相册 Id %s', id)
    const res = await Serviec.delete(id, userId)
    log('被删除的数据：%s', res)
    if (res) {
      ctx.body = new SuccessModel(res, '删除成功')
    } else {
      ctx.body = new ErrorModel('删除相册失败')
    }
  }

  static async getAlbum(ctx: RouterContext) {
    const userId = ctx.state.user.userId
    const pageSize = ctx.request.body.pageSize
    const pageNum = ctx.request.body.pageNum
    const res = await Serviec.getAlbumList(pageSize, pageSize * pageNum)
    if (res) {
      ctx.body = new SuccessModel(res)
    } else {
      ctx.throw(500, '服务端错误')
    }
  }
}
