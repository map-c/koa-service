import mongoose from 'mongoose'
import { mongoseConf } from '../config/db'
import chalk from 'chalk'

const url = `mongodb://${mongoseConf.host}:${mongoseConf.port}/${mongoseConf.dbName}`

mongoose.connect(url)

const db = mongoose.connection

db.on('error', console.error.bind(console, chalk.red('database connection is error')))

db.once('open', () => {
  // connected success
  console.log(chalk.green('database connected success'))
})
