import Application from 'koa'
import userRouter from './user'
import photoRouter from './photo'

export default function (app: Application) {
  app.use(userRouter.routes()).use(userRouter.allowedMethods())
  app.use(photoRouter.routes()).use(photoRouter.allowedMethods())
}
