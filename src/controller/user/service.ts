import UserModel from './model'
import { Document, CallbackError } from 'mongoose'
import debug from 'debug'

const log = debug('my:db')

interface UserInfo {
  userName: string
  password: string
}

export function createUser(data: UserInfo) {
  return new Promise<boolean>((resolve, reject) => {
    log('新增用户数据：%O', data)
    const instance = new UserModel(data)
    instance.save((err: CallbackError, doc: Document) => {
      if (err) {
        log('存储数据出错了')
        log('存储数据错误', err)
        reject(false)
      } else {
        resolve(true)
      }
    })
  })
}

export function findUser(data: UserInfo) {
  return new Promise<Document>((resolve, reject) => {
    UserModel.findOne(data, (err: CallbackError, doc: Document) => {
      if (err) {
        reject(err)
      } else {
        resolve(doc)
      }
    })
  })
}

export function deleteUser(id: string) {
  return new Promise<boolean>((resolve, reject) => {
    UserModel.remove({ _id: id }, (err: CallbackError) => {
      if (err) {
        reject(false)
      } else {
        resolve(true)
      }
    })
  })
}
