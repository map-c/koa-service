import mongoose from 'mongoose'

const StoreSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  bankCard: {
    type: String
  },
  remark: {
    type: String
  }
})

const storeModel = mongoose.model('stores', StoreSchema)

export default storeModel
