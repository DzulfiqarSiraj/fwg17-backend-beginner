const multer = require('multer');
const uuidv4 = require('uuid').v4;
const path = require('path');

const extension = {
	'image/png' : '.png',
	'image/jpg' : '.jpg',
	'image/jpeg' : '.jpeg',
}

const storage = (dest, filename) => multer.diskStorage({
	filename: (req,file,cb) => {
		const filename = uuidv4()
		cb(null,`${filename}${extension[file.mimetype]}`)
	}
})

// const storage = (dest, filename) => multer.diskStorage({
// 	destination: (req,file, cb) => {
// 		cb(null, path.join('uploads',dest))
// 	},
// 	filename: (req,file,cb) => {
// 		const filename = uuidv4()
// 		cb(null,`${filename}${extension[file.mimetype]}`)
// 	}
// })

const fileFilter = (req, file, cb) => {
	const allowedExt = Object.keys(extension)
	if(!allowedExt.includes(file.mimetype)){
	cb(new Error('Extension issue'), false)
	}else{
	cb(null, true)
	}
}

const maxSize = 1 * 1024 * 1024

const uploadMiddleware = (type, file) => {
	const uploadProcess = multer({
		storage: storage(type,file),
		fileFilter,
		limits: {fileSize: maxSize}
	})
	return uploadProcess
}

module.exports = uploadMiddleware