import mongoose from 'mongoose'

const StoreSchema = new mongoose.Schema({
  stroeName: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  bankCard: {
    type: String,
    required: true
  },
  remark: {
    type: String
  }
})

const storeModel = mongoose.model('stores', StoreSchema)

export default storeModel
