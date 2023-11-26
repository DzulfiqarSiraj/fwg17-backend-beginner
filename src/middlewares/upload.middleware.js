const multer = require('multer')
const path = require('path')

const storage = (dest, filename) => multer.diskStorage({
  destination: (req,file, cb) => {
    cb(null, path.join('uploads',dest))
  },
  filename: (req,file,cb) => {
    const extension = {
      'image/png' : '.png',
      'image/jpg' : '.jpg',
    }
    if(!filename){
      filename = req.params.id
    }
    cb(null,`${filename}${extension[file.mimetype]}`)
  }
})

const uploadMiddleware = (type, file) => {
  const processUpload = multer({
    storage: storage(type,file)
  })
  return processUpload
}

module.exports = uploadMiddleware