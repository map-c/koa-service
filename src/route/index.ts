import Application from 'koa'
import jwt from 'koa-jwt'
import userRouter from './user'
import photoRouter from './photo'
import html from './tmp'
import albumRouter from './album'
import { SECRET } from '../config/constant'
import storeRouter from './store'
import productRouter from './production'
import blogRouter from './blog'
import debug from 'debug'

const log = debug('auth')

export default function (app: Application) {
  // 路由权限设置 jwt
  const auth = jwt({ secret: SECRET }).unless({
    path: [/^\/api\/.\/public./]
  })
  app.use(auth)
  app.use(html.routes()).use(html.allowedMethods())
  app.use(userRouter.routes()).use(userRouter.allowedMethods())
  app.use(photoRouter.routes()).use(photoRouter.allowedMethods())
  app.use(albumRouter.routes()).use(albumRouter.allowedMethods())
  app.use(storeRouter.routes()).use(storeRouter.allowedMethods())
  app.use(productRouter.routes()).use(productRouter.allowedMethods())
  app.use(blogRouter.routes()).use(blogRouter.allowedMethods())
}
