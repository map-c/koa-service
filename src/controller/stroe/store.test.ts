import test from 'ava'
import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')

import StoreModel from './service'
import { connectMongodb, stopMongodb } from '../../utils/mongd'

const storeInfo = {
  storeName: 'colaStore',
  userId: '111',
  address: '河南洛阳',
  phone: '110',
  bankCard: '32323233232',
  remaek: '备注'
}

// 启动 mongoDB 实例

test.before(connectMongodb)

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

test.after(stopMongodb)
