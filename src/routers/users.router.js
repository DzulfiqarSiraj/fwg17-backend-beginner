const userRouter = require('express').Router()

const userController = require('../controllers/users.controller')

// Mendefinisikan end point untuk LIST ALL USER dengan callback yang diimport dari file userController dengan fungsi getAllUsers menggunakan fungsi get pada object userRouter
userRouter.get('/', userController.getAllUsers)

// Mendefinisikan end point untuk DETAIL USER dengan callback yang diimport dari file userController dengan fungsi getDetailUser menggunakan fungsi get pada object userRouter
userRouter.get('/:id', userController.getDetailUser)

// Mendefinisikan end point untuk CREATE USER dengan callback yang diimport dari file userController dengan fungsi createUser menggunakan fungsi post pada object userRouter
userRouter.post('/', userController.createUser)

userRouter.patch('/:id', userController.updateUser)
userRouter.delete('/remove', userController.removeUser)

module.exports = userRouter