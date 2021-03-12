import blogModel, { BlogType } from './model'
/**
 * 新增博客
 * @param blogInfo
 * @returns
 */
export async function addBlog(blogInfo: BlogType) {
  const promise = new Promise<BlogType>((resolve, reject) => {
    const instance = new blogModel(blogInfo)
    instance.save((err, doc) => {
      if (err) {
        console.error(err)
        throw new Error('存储博客失败')
      } else {
        resolve((doc as unknown) as BlogType)
      }
    })
  })

  return promise
}

interface UpdateRes {
  n: number
  nModified: number
  ok: number
}

export function updateBlog(id: string, updateInfo: any) {
  const promise = new Promise<UpdateRes>((resolve, reject) => {
    blogModel.updateOne({ _id: id }, updateInfo, null, (err, doc) => {
      if (err) {
        console.error(err)
        throw new Error('更新博客失败')
      }
      resolve((doc as unknown) as UpdateRes)
    })
  })
  return promise
}

/**
 * 根据 id 更新
 */
export function updateById(id: string, info: any) {
  const promise = new Promise((resolve, reject) => {
    blogModel.findByIdAndUpdate(id, { $set: info }, null, (err, res) => {
      if (err) {
        throw new Error('更新出错了')
      }
      resolve(res)
    })
  })
  return promise
}

export async function deleteBlog(id: string) {
  try {
    const res = await blogModel.deleteOne({ _id: id })
  } catch (err) {
    console.error(err)
    throw new Error('删除博客失败')
  }
}
/**
 *
 * @param query 查询条件
 * @param skip 跳过条数
 * @param limit 查询条数
 * @returns doc[]
 */
export function findblog(query: any, skip: number, limit: number) {
  const promise = new Promise<BlogType[]>((resolve, reject) => {
    blogModel.find(
      query,
      { title: 1, authorName: 1, createTime: 1 },
      { skip: skip, limit: limit, sort: { createTime: -1 } },
      (err, doc) => {
        if (err) {
          console.error(err)
          throw new Error('查询博客出错了')
        }
        resolve((doc as unknown) as BlogType[])
      }
    )
  })
  return promise
}

/**
 * 根据文章 id 获取文章详情
 * @param id 文章 id
 * @returns blog 对象
 */
export async function findBlogInfoById(id: string) {
  const res = await blogModel.findById(id, { article: 1, createTime: 1 })
  return res
}
/**
 * 获取博客总条数
 * @returns count - 博客总条数
 */
export async function findCount() {
  const count = await blogModel.count()
  return count
}
