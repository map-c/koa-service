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

export async function updateBlog(id: string, updateInfo: any) {
  try {
    const res = await blogModel.findByIdAndUpdate(id, updateInfo)
    return res
  } catch (err) {
    console.error(err)
    throw new Error('更新博客失败')
  }
}

export async function deleteBlog(id: string) {
  try {
    const res = await blogModel.deleteOne({ _id: id })
  } catch (err) {
    console.error(err)
    throw new Error('删除博客失败')
  }
}

export function findblog(query: any) {
  return blogModel.find(query)
}
