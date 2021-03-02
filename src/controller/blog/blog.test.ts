import test from 'ava'
import mongoose from 'mongoose'
import { addBlog } from './service'
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

test.before(connectMongodb)

test.serial('新增博客', async t => {
  const res = await addBlog(blogInfo)
  console.log('res is', res)
  t.is(typeof res.createTime, 'object')
})

test('错误', t => {
  t.true(true)
})
test('测试', t => {
  t.pass('ceshi')
})

test.after(stopMongodb)
