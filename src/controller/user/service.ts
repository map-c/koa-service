import UserModel from './model'
import { Document, CallbackError } from 'mongoose'
import debug from 'debug'

const log = debug('my:db')

interface UserInfo {
  userName: string
  password: string
  nickName: string
  email: string
  phone: string
  auth: string[]
  createTime?: number
  _id?: string
}

export function createUser(data: UserInfo) {
  return new Promise<UserInfo>((resolve, reject) => {
    const instance = new UserModel(data)
    instance.save((err: CallbackError, doc: Document) => {
      if (err) {
        log('存储数据错误', err)
        reject(false)
      } else {
        resolve((doc as unknown) as UserInfo)
      }
    })
  })
}

export function findUser(data: UserInfo) {
  return new Promise<UserInfo>((resolve, reject) => {
    UserModel.findOne(data, (err: CallbackError, doc: Document) => {
      if (err) {
        reject(err)
      } else {
        resolve((doc as unknown) as UserInfo)
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
