import { parseHeader } from '../utils/jwt'
import { RouterContext } from 'koa-router'
import { Next } from 'koa'

export async function checkAuth(ctx: RouterContext, next: Next) {
  parseHeader(ctx)
  await next()
}
