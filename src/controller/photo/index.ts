import { Next } from 'koa'
import { RouterContext } from 'koa-router'

// type Ctx = RouterContext & {
//   fiel: any
// }

export default class Photo {
  static add(ctx: RouterContext, next: Next) {}
  static delete(ctx: RouterContext, next: Next) {}
}
