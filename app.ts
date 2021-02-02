import Koa from 'koa'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import session from 'koa-session'
import logger from 'koa-logger'
import fileServe from 'koa-static'
import path from 'path'
import chalk from 'chalk'
import log from 'debug'

const debug = log('my:app')

debug('aaaa')

import user from './route/user'

// 链接数据库
import './db/mongoose'

const app = new Koa()

// cookie 签名
app.keys = ['I like coding']

// 添加会话
app.use(session(app))

// 解析 body
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)

// 解析 json
app.use(json())

// 日志处理
app.use(logger())

// logger
app.use(async (ctx, next) => {
  console.log(ctx.session)
  let n = 0
  // ctx.session.views = n++
  // console.log('views is', ctx.session.views)
  const start = new Date()
  await next()
  const ms = Date.now() - start.getTime()
  console.log(`${ctx.method} ${ctx.url} - ${ms} ms`)
})

// 静态资源服务
const filepath = path.resolve('public/dist')
app.use(fileServe(filepath))

// router
app.use(user.routes()).use(user.allowedMethods())

// 404
app.use(async ctx => {
  ctx.body = ctx.session
})

// error-handling
app.on('error', (err, ctx) => {
  console.log(chalk.red(`error info ${err}`))
  console.error('server error', err, ctx)
})

app.listen(9527, () => {
  console.log('server is running')
})
