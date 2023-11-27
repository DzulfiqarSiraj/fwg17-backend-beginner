const publicRouter = require('express').Router()

publicRouter.use('/products',require('./productsPublic.router'))


// Mengekspor router agar dapat digunakan oleh file lain
module.exports = publicRouter