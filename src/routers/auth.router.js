// Membuat object authRouter dengan mengimpor dari express
const authRouter = require('express').Router()

// Membuat variabel authController dengan mengimpor dari file auth.controller
const authController = require('../controllers/auth.controller')

// Mendefinisikan end point untuk LOGIN dengan callback yang diimport dari file authController.login dengan fungsi login menggunakan fungsi post pada object authRouter
authRouter.post('/login', authController.login)

authRouter.post('/register', authController.register)

// Mengekspor authRouter agar dapat digunakan oleh
module.exports = authRouter