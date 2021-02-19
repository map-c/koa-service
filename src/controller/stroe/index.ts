import Service, { StoreInfo } from './service'
import { RouterContext } from 'koa-router'
import { SuccessModel } from '../../utils/resModel'
import debug from 'debug'

const log = debug('my:store')

export default class Store {
  /**
   * 新增店铺
   * @param ctx
   */
  static async createStore(ctx: RouterContext) {
    const userId = ctx.state.user.userId
    const params = (ctx.request.body as unknown) as StoreInfo
    params.userId = userId
    // TODO: 入参校验
    const res = await Service.createStore(params)
    if (res) {
      ctx.body = new SuccessModel(res)
    }
  }

  /**
   * 更新店铺信息
   * @param ctx
   */
  static async updateStore(ctx: RouterContext) {
    const userId = ctx.state.user.userId
    const storeId = ctx.request.body.userId
    const info = ctx.request.body
    const res = await Service.updateStoreInfo(storeId, info)
    if (res) {
      ctx.body = new SuccessModel(res)
    }
  }

  /**
   * 根据用户 id 获取店铺信息
   * @param ctx
   */
  static async getStoreByUserId(ctx: RouterContext) {
    const userId = ctx.state.user.userId
    const res = await Service.getStoreByUserId(userId)
    if (res) {
      ctx.body = new SuccessModel(res)
    }
  }
}
