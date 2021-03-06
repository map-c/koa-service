import {
  addBlog,
  findblog,
  updateBlog,
  findCount,
  findBlogInfoById
} from './service'
import { RouterContext } from 'koa-router'
import { Next } from 'koa'
import { SuccessModel } from '../../utils/resModel'

export default class Blog {
  /**
   * 新增博客
   * @param ctx
   * @param next
   */
  static async addBlog(ctx: RouterContext, next: Next) {
    const userId = ctx.state.user.userId
    const authorName = ctx.state.user.userName
    const blogInfo = ctx.request.body
    blogInfo.authorId = userId
    blogInfo.authorName = authorName
    console.log('blogInfo is', blogInfo)
    // TODO 校验 blogInfo
    const res = await addBlog(blogInfo)
    if (res) {
      ctx.body = new SuccessModel(res)
    }
  }

  /**
   * 查询博客
   * @param ctx
   * @param next
   */
  static async findBlog(ctx: RouterContext, next: Next) {
    const query = ctx.request.query || {}
    const articleId = ctx.params.id
    console.log('articalid is', articleId)
    if (articleId) {
      const res = await findBlogInfoById(articleId)
      if (res) {
        ctx.body = new SuccessModel(res)
      }
    }
    // TODO 校验 query
    const blogMap = await findblog(query, 0, 10)
    const count = await findCount()
    const res = {
      total: count,
      items: blogMap
    }
    console.log('博客列表', res)
    if (res) {
      ctx.body = new SuccessModel(res)
    }
  }

  static async findBlogById(ctx: RouterContext, next: Next) {
    const articleId = ctx.params.id
    console.log('articalid is', articleId)
    if (articleId) {
      const res = await findBlogInfoById(articleId)
      if (res) {
        ctx.body = new SuccessModel(res)
      }
    }
  }

  /**
   * 更新博客
   * @param ctx
   * @param next
   */
  static async updateBlog(ctx: RouterContext, next: Next) {
    const info = ctx.request.body
    // TODO: 校验 info
    const id = info.id
    delete info.id
    const res = await updateBlog(id, info)
    if (res) {
      ctx.body = new SuccessModel(res)
    }
  }
}
