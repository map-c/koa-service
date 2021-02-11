import Koa from 'koa'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
// import session from 'koa-session'
import logger from 'koa-logger'
import fileServe from 'koa-static'
import path from 'path'
const chalk = require('chalk')
import jwt from 'koa-jwt'
import log from 'debug'

const debug = log('my:app')

import router from './route/index'

// 链接数据库
import './db/mongoose'

const app = new Koa()

// cookie 签名
app.keys = ['I like coding']

// 添加会话
// app.use(session(app))

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
  const start = new Date()
  await next()
  const ms = Date.now() - start.getTime()
  console.log(`${ctx.method} ${ctx.url} - ${ms} ms`)
})
// app.use(function (ctx, next) {
//   return next().catch(err => {
//     if (401 === err.status) {
//       ctx.status = 401
//       ctx.body = 'Protected resource, use Authhorization header to get'
//     } else {
//       throw err
//     }
//   })
// })

// jwt
// app.use(jwt({ secret: 'cola-code' }))

// 静态资源服务
const filepath = path.resolve('public/dist')
app.use(fileServe(filepath))

// router
router(app)
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
