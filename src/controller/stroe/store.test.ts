import { MongoMemoryServer } from 'mongodb-memory-server'
import test from 'ava'
import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')

import StoreModel from './service'

const storeInfo = {
  storeName: 'colaStore',
  userId: '111',
  address: '河南洛阳',
  phone: '110',
  bankCard: '32323233232',
  remaek: '备注'
}

// 启动 mongoDB 实例
const mongod = new MongoMemoryServer()

test.before(async () => {
  const uri = await mongod.getUri()
  console.log('uri is', uri)
  await mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  mongoose.connection.on('open', () => {
    console.log('链接成功')
  })
})

test.serial('新增店铺', async t => {
  const res = await StoreModel.createStore(storeInfo)
  t.true('storeName' in (res as any))
})

test.serial('查询店铺', async t => {
  const res = await StoreModel.getStoreByName('colaStore')
  t.true(res[0].storeName === 'colaStore')
})

test.serial('删除店铺', async t => {
  const res = await StoreModel.removeStore()
  t.true(res)
})
