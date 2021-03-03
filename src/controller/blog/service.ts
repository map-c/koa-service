import blogModel, { BlogType } from './model'

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
      console.log('更新结果', doc)
      resolve((doc as unknown) as UpdateRes)
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

export function findblog(query: any, skip: number, limit: number) {
  const promise = new Promise<BlogType[]>((resolve, reject) => {
    blogModel.find(
      query,
      { title: 1, authorName: 1, _id: 0 },
      { skip: skip, limit: limit },
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
