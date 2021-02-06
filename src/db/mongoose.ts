import mongoose from 'mongoose'
import { mongoseConf } from '../config/db'
const chalk = require('chalk')

const url = `mongodb://${mongoseConf.userName}:${mongoseConf.pwd}@${mongoseConf.host}:${mongoseConf.port}/${mongoseConf.dbName}`

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

const db = mongoose.connection

db.on(
  'error',
  console.error.bind(console, chalk.red('database connection is error'))
)

db.once('open', () => {
  console.log(chalk.green('database connected success'))
})
