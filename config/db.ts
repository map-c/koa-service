// const env = process.env.NODE_ENV

interface MongodbConf {
  host: string
  port: number
  dbName: string
}

const mongoseConf: MongodbConf = {
  dbName: 'myWeb',
  host: 'localhost',
  port: 27017
}

export {
  mongoseConf
}
