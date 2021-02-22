import Model from './model'
import debug from 'debug'
const log = debug('my:product')

export interface ProductInfo {
  name: string
  order: number
  price: number
  photo: string[]
  storeId?: string
  _id?: string
}

/**
 * 新增商品;返回新增至数据库的信息
 * @param params
 * @returns production
 */
export function addProduct(params: ProductInfo) {
  log('新增商品: %O', params)
  const instance = new Model(params)
  const promise = new Promise<ProductInfo>((resolve, reject) => {
    instance.save((err, doc) => {
      if (err) {
        console.log(err)
        throw new Error('存储数据出错')
      }
      resolve((doc as unknown) as ProductInfo)
    })
  })
  return promise
}

/**
 * 根据店铺 id 获取商品列表
 * @param id 店铺 id
 */
export async function getProductByStoreId(id: string) {
  try {
    const res = await Model.find({ storeId: id })
    return (res as unknown) as ProductInfo[]
  } catch (err) {
    console.log(err)
    throw new Error('获取列表数据')
  }
}

export async function getProduct() {}

/**
 *
 * @param id 商品 id
 * @param newInfo 需要更新的数据
 */
export async function updateProduct(id: string, newInfo: any) {
  return new Promise<ProductInfo>((resolve, reject) => {
    Model.update({ _id: id }, newInfo, null, (err, doc: any) => {
      if (err) {
        console.log(err)
        throw new Error('查询出错了')
      }
      console.log('res  is ::', doc)
      if (doc) {
        resolve((doc as unknown) as ProductInfo)
      }
    })
  })
}

export async function removeById(id: string) {
  try {
    const res = await Model.remove({ _id: id })
    return (res as any).deletedCount === 1
  } catch (err) {
    console.log(err)
    throw new Error('')
  }
}
