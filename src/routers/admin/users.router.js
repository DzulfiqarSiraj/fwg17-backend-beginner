const userRouter = require('express').Router()

const userController = require('../../controllers/admin/users.controller')

const uploadMiddleware = require('../../middlewares/upload.middleware')

userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', userController.getDetailUser)
userRouter.post('/', uploadMiddleware('users').single('pictures'), userController.createUser)
userRouter.patch('/:id', uploadMiddleware('users').single('pictures'), userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)


module.exports = userRouter