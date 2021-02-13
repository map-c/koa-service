import { Next } from 'koa'
import Router, { RouterContext } from 'koa-router'
import upload from '../utils/upload'
import Photo from '../controller/photo/index'
import debug from 'debug'

const log = debug('my:photo')

const photoRouter = new Router({
  prefix: '/api/photo'
})

// 602721317da4d9575407fcf0

photoRouter
  .get('/list', async (ctx: RouterContext, next: Next) => {
    await next()
  })
  .post(
    '/',
    upload.single('file'),
    async (ctx: any, next: Next) => {
      log('filename %O', ctx.req.file as any)
      log('data is %O', ctx.request.body)
      // log('ctx %O', ctx as any)
      ctx.body = ctx
      // await next()
    },
    Photo.add
  )

export default photoRouter
