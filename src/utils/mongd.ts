import { MongoMemoryServer } from 'mongodb-memory-server'
const mongod = new MongoMemoryServer()

export async function getUri() {
  const uri = await mongod.getUri()
  return uri
}

export async function stop() {
  await mongod.stop()
}
