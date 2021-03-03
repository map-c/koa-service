import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
const mongod = new MongoMemoryServer()
mongoose.set('debug', true)

/**
 * 启用并链接数据库
 */
export async function connectMongodb() {
  await mongod.start()
  const uri = await mongod.getUri()
  await mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  mongoose.connection.on('open', () => {
    console.log('数据库已连接')
  })
}

/**
 * 关闭数据库链接
 * 关闭数据库
 */
export async function stopMongodb() {
  await mongoose.connection.close(err => {
    if (err) {
      console.error(err)
      return
    } else {
      console.log('数据库链接以关闭')
    }
  })
  await mongod.stop()
}
