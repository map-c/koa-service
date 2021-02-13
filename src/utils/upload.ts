import multer from 'koa-multer'
import path from 'path'

const savePath = path.resolve(__dirname, '../../uploads')
// console.log('savepath is', savePath)

const storage = multer.diskStorage({
  destination: savePath,
  filename(req, file, cb) {
    const ext = path.extname(file.originalname)
    console.log('文件后缀：', ext)
    cb(null, Date.now() + ext)
  }
})

const limits = {
  fields: 10,
  fileSize: 500 * 1024,
  files: 1
}

const fn = multer({
  storage,
  limits
})

console.log(fn)

export default fn
