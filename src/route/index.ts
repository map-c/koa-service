import Application from 'koa'
import userRouter from './user'

export default function (app: Application) {
  app.use(userRouter.routes()).use(userRouter.allowedMethods())
}
