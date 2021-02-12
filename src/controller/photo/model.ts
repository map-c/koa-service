import mongoose from 'mongoose'

const photoSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  url: {
    type: String
  },
  albumId: {
    type: mongoose.Schema.Types.ObjectId
  },
  isApproved: {
    type: Boolean,
    default: null
  },
  created: {
    type: Date,
    default: Date.now
  },
  isDelete: {
    type: Boolean,
    default: false
  }
})

const photoModel = mongoose.model('photos', photoSchema)

export default photoModel
