import test from 'ava'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { addBlog } from './service'
import { BlogType } from './model'
mongoose.Promise = require('bluebird')

const mongod = new MongoMemoryServer()

const blogInfo: BlogType = {
  authorId: '100',
  authorName: 'cola',
  title: '文章标题',
  article: '文章内容',
  tabs: ['ts']
}

test.before(async () => {
  const uri = await mongod.getUri()
  await mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
})

test.serial('新增博客', async t => {
  const res = await addBlog(blogInfo)
  console.log('res is', res)
  t.true(typeof res.createTime === 'number')
})

test('错误', t => {
  t.true(true)
})
test('测试', t => {
  t.pass('ceshi')
})

test.after(async () => {
  await mongod.stop()
})
