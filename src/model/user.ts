import Mongoose from 'mongoose'

const userSchema = new Mongoose.Schema({
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
  auth: {
    type: Array
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})
const UserModel = Mongoose.model('Users', userSchema)

export default UserModel
