// const env = process.env.NODE_ENV

interface MongodbConf {
  host: string
  port: number
  dbName: string
  userName: string
  pwd: string
}

const mongoseConf: MongodbConf = {
  dbName: 'myWeb',
  host: 'localhost',
  port: 27017,
  userName: 'cola',
  pwd: '123qwe'
}

export { mongoseConf }
