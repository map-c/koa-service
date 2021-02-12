import photoModel from './model'
import debug from 'debug'
const log = debug('my:photo')

export default class PhotoService {
  static getList() {}
  static add(url: string, id: string) {
    return new Promise<boolean>((resolve, rejcet) => {
      const instance = new photoModel({
        url,
        id
      })
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
