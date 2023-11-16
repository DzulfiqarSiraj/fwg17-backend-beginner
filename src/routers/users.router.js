// Membuat object userRouter dengan mengimpor dari express
const userRouter = require('express').Router()

// Membuat variabel userController dengan mengimpor dari file users.controller
const userController = require('../controllers/users.controller')

// Mendefinisikan end point untuk LIST ALL USER dengan callback yang diimport dari file userController dengan fungsi getAllUsers menggunakan fungsi get pada object userRouter
userRouter.get('/', userController.getAllUsers)

// Mendefinisikan end point untuk DETAIL USER dengan callback yang diimport dari file userController dengan fungsi getDetailUser menggunakan fungsi get pada object userRouter
userRouter.get('/:id', userController.getDetailUser)

// Mendefinisikan end point untuk CREATE USER dengan callback yang diimport dari file userController dengan fungsi createUser menggunakan fungsi post pada object userRouter
userRouter.post('/', userController.createUser)

// Mendefinisikan end point untuk UPDATE USER dengan callback yang diimport dari file userController dengan fungsi updateUser menggunakan fungsi patch pada object userRouter
userRouter.patch('/:id', userController.updateUser)

// Mendefinisikan end point untuk DELETE USER dengan callback yang diimport dari file userController dengan fungsi deleteUser menggunakan fungsi delete pada object userRouter
userRouter.delete('/:id', userController.deleteUser)

// Mengekspor userRouter agar dapat digunakan oleh file lain
module.exports = userRouter