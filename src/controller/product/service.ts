import Model from './model'
import debug from 'debug'
const log = debug('my:product')

export interface ProductInfo {
  name: string
  order: number
  price: number
  photo: string[]
}

/**
 * 新增商品
 * @param params
 */
export function addProduct(params: ProductInfo) {
  log('新增商品: %O', params)
  const instance = new Model(params)
  const promise = new Promise((resolve, reject) => {
    instance.save(err => {
      if (err) {
        console.log(err)
        throw new Error('存储数据出错')
      }
      resolve(true)
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
    return res
  } catch (err) {
    console.log(err)
    throw new Error('获取列表数据')
  }
}

/**
 *
 * @param id 商品 id
 * @param newInfo 需要更新的数据
 */
export async function updateProduct(id: string, newInfo: any) {
  try {
    const res = await Model.findByIdAndUpdate(id, newInfo, null)
    if (res) {
      return res
    }
  } catch (err) {
    console.log(err)
    throw new Error('查询出错了')
  }
}

export async function removeById(id: string) {
  try {
    const res = await Model.remove({ _id: id })
    return res
  } catch (err) {
    console.log(err)
    throw new Error('')
  }
}
