const multer = require('multer')
const path = require('path')

const extension = {
  'image/png' : '.png',
  'image/jpg' : '.jpg',
  'image/jpeg' : '.jpeg',
}

const storage = (dest, filename) => multer.diskStorage({
  destination: (req,file, cb) => {
    cb(null, path.join('uploads',dest))
  },
  filename: (req,file,cb) => {
    if(!filename){
      filename = req.params.id
    }
    cb(null,`${filename}${extension[file.mimetype]}`)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedExt = Object.keys(extension)
  if(!allowedExt.includes(file.mimetype)){
    return cb({message: 'error'}, false)
  }
  cb(null, true)
}

const maxSize = 1 * 1024 * 1024

const uploadMiddleware = (type, file) => {
  const processUpload = multer({
    storage: storage(type,file),
    fileFilter,
    limits: {fileSize: maxSize}
  })
  return processUpload
}

module.exports = uploadMiddleware