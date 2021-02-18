import { CallbackError } from 'mongoose'
import storeModel from './model'

export interface StoreInfo {
  storeName: string
  userId: string
  address: string
  phone: string
  bankCard: string
  remark?: string
}

export default class Service {
  static createStore(params: StoreInfo) {
    const instance = new storeModel(params)
    const promis = new Promise((resolve, reject) => {
      instance.save((err, doc) => {
        if (err) {
          console.log(err)
          throw new Error('新增店铺出错误')
        }
        resolve(doc)
      })
    })
    return promis
  }

  static updateStoreInfo(id: string, params: any) {
    return new Promise((resolve, reject) => {
      storeModel.findByIdAndUpdate(id, params, null, (err, doc) => {
        if (err) {
          console.log(err)
          throw new Error('更新店铺信息出错')
        }
        resolve(doc)
      })
    })
  }

  static getStoreByUserId(userId: string) {
    return new Promise((resolve, reject) => {
      storeModel.find(
        {
          userId: userId
        },
        (err, doc) => {
          if (err) {
            reject(err)
          }
          resolve(doc)
        }
      )
    })
  }
}
