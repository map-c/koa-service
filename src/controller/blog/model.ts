import mongoose from 'mongoose'

export interface BlogType {
  authorId: string
  authorName: string
  title: string
  article: string
  tabs: string[]
  createTime?: number
  updateTime?: number
}

const BlogSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  article: {
    type: String
  },
  tabs: [String],
  createTime: {
    type: Date,
    default: Date.now()
  },
  updateTime: {
    type: Date
  }
})

// 前置钩子
BlogSchema.pre('save', function (next) {
  const that = (this as unknown) as BlogType
  if (!that.createTime) {
    that.createTime = Date.now()
  }
  next()
})

const blogModel = mongoose.model('blogs', BlogSchema)

export default blogModel
