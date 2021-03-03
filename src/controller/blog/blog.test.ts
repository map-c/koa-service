import test from 'ava'
import mongoose from 'mongoose'
import { addBlog, updateBlog, findblog } from './service'
import { BlogType } from './model'
import { connectMongodb, stopMongodb } from '../../utils/mongd'
mongoose.Promise = require('bluebird')

const blogInfo: BlogType = {
  authorId: '100',
  authorName: 'cola',
  title: '文章标题',
  article: '文章内容',
  tabs: ['ts']
}

let id = ''

test.before(connectMongodb)

test.serial('新增博客', async t => {
  const res = await addBlog(blogInfo)
  console.log('res is', res)
  id = (res as any)._id
  t.is(typeof res.createTime, 'object')
})

test.serial('查询博客', async t => {
  const res = await findblog({}, 0, 10)
  console.log('查询博客', res)
  t.pass()
})

test.serial('更新博客', async t => {
  const res = await updateBlog(id, { title: '文章标题1' })
  t.truthy(res)

  // const query = findblog({ _id: id })
  // query.exec((err, doc) => {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     console.log(doc)
  //   }
  // })
})

test.after(stopMongodb)
