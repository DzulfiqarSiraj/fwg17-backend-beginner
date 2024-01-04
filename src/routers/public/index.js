const publicRouter = require('express').Router()

publicRouter.use('/products',require('./products.router'))


// Mengekspor router agar dapat digunakan oleh file lain
module.exports = publicRouter