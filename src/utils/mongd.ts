import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
const mongod = new MongoMemoryServer()
mongoose.set('debug', true)

export async function connectMongodb() {
  await mongod.start()
  const uri = await mongod.getUri()
  await mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
}

export async function stopMongodb() {
  await mongod.stop()
}
