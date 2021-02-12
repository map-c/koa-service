import multer from 'koa-multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename(req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
})

export default multer({
  storage: storage
})
