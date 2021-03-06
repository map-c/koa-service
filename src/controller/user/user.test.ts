import test from 'ava'
import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')
import { connectMongodb, stopMongodb } from '../../utils/mongd'
import { createUser, deleteUser } from './service'

const user = {
  userName: 'cola',
  password: '123qwe',
  nickName: 'cola1',
  email: 'cola.coding@qq.com',
  phone: '1234567',
  auth: ['asss'],
  createTime: Date.now()
}

let id = ''

test.before(connectMongodb)

test.serial('新增用户', async t => {
  const res = await createUser(user)
  if ((res as any)._id) {
    id = (res as any)._id
    t.pass()
  }
})

test.serial('删除用户', async t => {
  const res = await deleteUser(id)
  t.true(res)
})

test.after(stopMongodb)
