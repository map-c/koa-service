import { MongoMemoryServer } from 'mongodb-memory-server'

export async function getUri() {
  const mongod = new MongoMemoryServer()
  const uri = await mongod.getUri()
  return uri
}
