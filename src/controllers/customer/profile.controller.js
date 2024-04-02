const usersModel = require('../../models/users.model')
const uploadMiddleware = require('../../middlewares/upload.middleware')
const upload = uploadMiddleware('users').single('pictures')
const {resFalse, resTrue, pageHandler} = require('../../utils/handler')
const cloudinary = require('../../utils/cloudinary')
const fsPromises = require('fs/promises')
const path = require('path')
const argon = require('argon2')

exports.getProfile = async (req, res) => {
    const {id} = req.user

    const user = await usersModel.selectOne(id)

    if(user.password){
        delete user.password
    }

    return resTrue(res, 'Current User Profile',false,true,null,user)
}

exports.updateProfile = async (req, res) => {
    upload(req, res, async(err) => {
        try {
            if(err){
                throw err
            }

            const id = req.user.id
            
            const existUser = await usersModel.selectOne(id)

            if(req.body.password){
                req.body.password = await argon.hash(req.body.password)
            }

            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path, {
					folder : 'cov-shop/users'
				});
				req.body.pictures = result.secure_url
                // if(existUser.pictures){
                //     const currentFilePath = path.join(global.path,'uploads','users',existUser.pictures)
                //     fsPromises.access(currentFilePath, fsPromises.constants.R_OK).then(()=>{
                //         fsPromises.rm(currentFilePath)
                //     }).catch(() => {})
                // }
                // req.body.pictures = req.file.filename
            }
            

            let user = await usersModel.update(id, req.body)

            // if(req.file){
            //     const ext = {
			// 		'image/png'	: '.png',
			// 		'image/jpg'	: '.jpg',
			// 		'image/jpeg': '.jpeg'
			// 	}

			// 	const pathDestination = path.join(global.path, 'uploads','users')
			// 	const fileTarget = path.join(pathDestination, req.file.filename)
			// 	const filename = `${user.id}_${user.fullName.split(' ').join('_')}${ext[req.file.mimetype]}`
			// 	const newPathDestination = path.join(pathDestination, filename)

			// 	await fsPromises.rename(fileTarget, newPathDestination)
			// 	const newUser = await usersModel.update(user.id, {
			// 		pictures : filename
			// 	});

			// 	return resTrue(res, 'Update Profile Successfully', false, true, null, newUser)
            // }

            if(user.password){
                delete user.password
            }

            return resTrue(res, 'Update Profile Successfully',false,true,null,user)
            
        } catch (error) {
            console.log(error)
			return resFalse(error, res, error.message, 'Profile')
        }
    })
    
}

