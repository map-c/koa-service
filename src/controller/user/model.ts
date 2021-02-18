import Mongoose from 'mongoose'

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

const UserModel = Mongoose.model('Users', userschema)

export default UserModel
