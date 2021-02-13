import photoModel from './model'
import debug from 'debug'
const log = debug('my:photo')

interface PhototInfo {
  userId: string
  albumId: string
  url: string
}

export default class PhotoService {
  static getList() {}
  /**
   * 新增 photo
   * @param param object
   * @param param.userId 用户id
   * @param param.albumId 相册 id
   * @param param.url url
   */
  static add(param: PhototInfo) {
    return new Promise<boolean>((resolve, rejcet) => {
      const instance = new photoModel(param)
      instance.save((err, doc) => {
        if (err) {
          log('出错了 %O', err)
          throw new Error('出错了')
        }
        resolve(true)
      })
    })
  }
  static delete() {}
}
