import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  storeId: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  photo: {
    type: Array
  }
})

const ProductModel = mongoose.model('product', ProductSchema)

export default ProductModel
