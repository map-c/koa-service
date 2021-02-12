import { Next } from 'koa'
import Router, { RouterContext } from 'koa-router'

const instance = new Router({})

instance.get('/', async (ctx: any, next: Next) => {
  console.log(ctx)
  ctx.state = { title: 'cola' }
  await ctx.render('index')
})

export default instance
