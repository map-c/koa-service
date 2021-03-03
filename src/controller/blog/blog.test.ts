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

test.serial('blog add', async t => {
  const res = await addBlog(blogInfo)
  id = (res as any)._id
  t.is(typeof res.createTime, 'object')
})

test.serial('blog find', async t => {
  const res = await findblog({}, 0, 10)
  t.is(Array.isArray(res), true)
})

test.serial('blog update', async t => {
  const res = await updateBlog(id, { title: '文章标题1' })
  t.is(res.n, 1)
  t.is(res.ok, 1)

  const query = await findblog({ _id: id }, 0, 10)
  t.is(query[0].title, '文章标题1')
})

test.after(stopMongodb)
