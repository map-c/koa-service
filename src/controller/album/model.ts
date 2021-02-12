import mongoose from 'mongoose'

const albumSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  name: {
    type: String
  }
})

const albumModel = mongoose.model('albums', albumSchema)

export default albumModel
