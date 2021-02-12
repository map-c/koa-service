import { Next } from 'koa'
import Router, { RouterContext } from 'koa-router'
import upload from '../utils/upload'
import Photo from '../controller/photo/index'
import debug from 'debug'

const log = debug('my:photo')

const photoRouter = new Router({
  prefix: '/api/service/photo'
})

photoRouter
  .get('/list', async (ctx: RouterContext, next: Next) => {
    await next()
  })
  .post(
    '/photo',
    upload.single('file'),
    async (ctx: any, next: Next) => {
      log('filename %O', ctx.file as any)
      await next()
    },
    Photo.add
  )

export default photoRouter
