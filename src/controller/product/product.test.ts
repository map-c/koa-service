import test from 'ava'
import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')

import {
  addProduct,
  getProductByStoreId,
  ProductInfo,
  removeById,
  updateProduct
} from './service'
import { connectMongodb, stopMongodb } from '../../utils/mongd'

const productMap: ProductInfo = {
  name: 'phone',
  order: 20,
  storeId: '5000',
  price: 120,
  photo: ['http://test.com']
}

let id = ''

test.before(connectMongodb)

test.serial('新增产品', async t => {
  const res = await addProduct(productMap)
  if (res._id) {
    id = res._id
    t.pass()
  } else {
    t.fail('存储失败')
  }
})

test.serial('获取商品总数', async t => {
  const res = await getProductByStoreId('5000')
  if (res.length) {
    t.pass()
  } else {
    t.fail()
  }
})

test.serial('更新商品数据', async t => {
  const res = await updateProduct(id, { $set: { name: 'cola' } })
  if (res && (res as any).ok === 1) {
    t.pass()
  } else {
    t.fail()
  }
})

test.serial('删除数据', async t => {
  const res = await removeById(id)
  t.true(res)
})

test.after(stopMongodb)
