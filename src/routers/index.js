const router = require('express').Router()


router.use('/auth',require('./auth.router'))


router.use('/admin/',require('./admin'))

// Mengekspor router agar dapat digunakan oleh file lain
module.exports = router