import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
const mongod = new MongoMemoryServer()

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
