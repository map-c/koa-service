import Application from 'koa'
import userRouter from './user'
import photoRouter from './photo'
import html from './tmp'

export default function (app: Application) {
  app.use(html.routes()).use(html.allowedMethods())
  app.use(userRouter.routes()).use(userRouter.allowedMethods())
  app.use(photoRouter.routes()).use(photoRouter.allowedMethods())
}
