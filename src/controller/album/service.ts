import albumModel from './model'
import debug from 'debug'
import { CallbackError, Document } from 'mongoose'

const log = debug('my:album')

export default class Album {
  static getAlbumList(pageNumber: number, skip: number) {
    return new Promise<Document[]>((resolve, reject) => {
      albumModel.find((err, doc) => {
        if (err) {
          throw new Error('过去相册数据出错了')
        }
        resolve(doc)
      })
    })
  }

  static getCount() {
    return new Promise<number>((resolve, reject) => {
      albumModel.count((err: CallbackError, count: number) => {
        if (err) {
          log('获取列表总数出错了：%O', err)
          throw new Error('获取列表总数出错了')
        }
        resolve(count)
      })
    })
  }

  static create(userId: string, name: string): Promise<boolean> {
    log('userId is %s', userId)
    log('name is %s', name)
    const instance = new albumModel({
      userId,
      name
    })
    return new Promise((resolve, reject) => {
      instance.save((err, doc) => {
        if (err) {
          log('存储数据出错了： %O', err)
          throw new Error('存储数据出错了')
        }
        log('doc is %O', doc)
        resolve(true)
      })
    })
  }

  static updateName(oldName: string, newName: string): Promise<Document> {
    return new Promise<Document>((resolve, reject) => {
      albumModel.findOneAndUpdate(
        {
          name: oldName
        },
        {
          name: newName
        },
        {},
        (err: CallbackError, doc: any) => {
          if (err) {
            log('更新相册名称出错： %O', err)
            throw new Error('更新相册数据出错了')
          }
          resolve(doc)
        }
      )
    })
  }

  /**
   *
   * @param id 相册 id
   * @param userId 用户 id
   */
  static delete(id: string, userId: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      // TODO: 判断当前用户或管理员
      albumModel.remove(
        {
          _id: id
        },
        err => {
          if (err) {
            throw new Error('删除相册出错了')
          }
          resolve(true)
        }
      )
    })
  }
}
