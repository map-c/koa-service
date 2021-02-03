import UserModel from '../model/user'
import { RouterContext } from 'koa-router'
import { Next } from 'koa'
import debug from 'debug'

const log = debug('my:userManage')

export async function createUser(ctx: RouterContext, next: Next) {
  const userInfo = ctx.request.body
  log('用户信息：%o', userInfo)
  const instance = new UserModel(userInfo)
  instance.save((err, dco) => {
    if (err) {
      log('储存用户数据出错了：%o', err)
      return
    }
    ctx.body = true
  })
}
