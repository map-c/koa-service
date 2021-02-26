import Mongoose from 'mongoose'
import User from '.'

const userschema = new Mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nickName: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  auth: {
    type: Array
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})

// 保存 hook
userschema.pre('save', next => {
  console.log('保存数据前执行的操作')
  console.log('this', this)
  next()
})

const UserModel = Mongoose.model('Users', userschema)

export default UserModel
