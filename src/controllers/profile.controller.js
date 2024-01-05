const userModel = require('../models/users.model')
const uploadMiddleware = require('../middlewares/upload.middleware')
const fsPromises = require('fs/promises')
const path = require('path')
const upload = uploadMiddleware('users').single('pictures')
const argon = require('argon2')

exports.getProfile = async (req, res) => {
    const {id} = req.user
    const user = await userModel.findOne(id)
    if(user.password){
        delete user.password
    }
    return res.json({
        success: true,
        message: 'Current User Profile',
        results: user
    })
}

exports.updateProfile = async (req, res) => {
    upload(req, res, async(err) => {
        try {
            if(err){
                throw err
            }
            const {id} = req.user
            
            if(req.file){
                const currentUser = await userModel.findOne(id)
                if(currentUser.pictures){
                    const currentFilePath = path.join(global.path,'uploads','users',currentUser.pictures)
                    fsPromises.access(currentFilePath, fsPromises.constants.R_OK).then(()=>{
                        fsPromises.rm(currentFilePath)
                    }).catch(() => {})
                }
                req.body.pictures = req.file.filename
            }
            
            // password perlu hashing
            if(req.body.password){
                req.body.password = await argon.hash(req.body.password)
            }

            let user = await userModel.update(id, req.body)
            if(req.file){
                const uploadLocation = path.join(global.path,'uploads','users')
                const fileLocation = path.join(uploadLocation, req.file.filename)
                const filename = `${user.id}_${user.fullName.split(' ').join('_')}_${req.file.filename}`
                const newLocation = path.join(uploadLocation, filename)
            
                await fsPromises.rename(fileLocation, newLocation)
                user = await userModel.update(user.id, {pictures: filename})
            }

            if(user.password){
                delete user.password
            }
        
            return res.json({
                success: true,
                message: 'Update Success',
                results: user
            })
        } catch (err) {
            if(err.message === 'File too large. Max. Upload Size 1MB'){
                return res.status(400).json({
                  success: false,
                  message: err.message
                })
              }
              if(err.message === 'extension_issue'){
                return res.status(400).json({
                  success: false,
                  message: 'Unsupported File Extension. File Extension Should be(PNG/JPG/JPEG)'
                })
              }
              console.log(err)
              return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
              })
        }
    })
    
}

