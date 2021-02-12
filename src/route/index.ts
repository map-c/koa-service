import Application from 'koa'
import jwt from 'koa-jwt'
import userRouter from './user'
import photoRouter from './photo'
import html from './tmp'
import albumRouter from './album'

export default function (app: Application) {
  // 路由权限设置 jwt
  const auth = jwt({ secret: 'cola-code' }).unless({
    path: ['/^/api/user/login']
  })
  app.use(auth)
  app.use(html.routes()).use(html.allowedMethods())
  app.use(userRouter.routes()).use(userRouter.allowedMethods())
  app.use(photoRouter.routes()).use(photoRouter.allowedMethods())
  app.use(albumRouter.routes()).use(albumRouter.allowedMethods())
}
