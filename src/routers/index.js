// Membuat Object router dengan mengimpor dari module express
const router = require('express').Router()

// Membuat rute end point '/auth' melalui auth.router.js
router.use('/auth',require('./auth.router'))

// Membuat rute end point '/users' melalui users.router.js 
router.use('/users',require('./users.router'))

// Mengekspor router agar dapat digunakan oleh file lain
module.exports = router