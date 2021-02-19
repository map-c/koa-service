import {
  getProductByStoreId,
  addProduct,
  updateProduct,
  removeById
} from './service'
import debug from 'debug'
import { RouterContext } from 'koa-router'
import { SuccessModel } from '../../utils/resModel'

const log = debug('my:product')

// 602e1f77f0b0852b04e0072d 店铺id

export default class Product {
  static async createProduct(ctx: RouterContext) {
    const product = ctx.request.body
    log('新增数据 %O', product)
    const res = await addProduct(product)
    if (res) {
      ctx.body = new SuccessModel(res)
    }
  }

  static async getProductlist(ctx: RouterContext) {
    const storeId = ctx.params.id
    log('店铺 Id %s', storeId)
    const res = await getProductByStoreId(storeId)
    if (res) {
      ctx.body = new SuccessModel(res)
    }
  }

  static async updateProductInfo(ctx: RouterContext) {
    const info = ctx.request.body
    const id = ctx.request.body.productId
    const res = await updateProduct(id, info)
    if (res) {
      ctx.body = new SuccessModel(res)
    }
  }

  static async delete(ctx: RouterContext) {
    const id = ctx.params.id
    const res = await removeById(id)
    if (res) {
      ctx.body = new SuccessModel(res)
    }
  }
}
