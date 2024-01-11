const publicRouter = require('express').Router()

publicRouter.use('/products',require('./products.router'))
publicRouter.use('/product-size',require('./productSize.router'))
publicRouter.use('/product-variant',require('./productVariant.router'))


// Mengekspor router agar dapat digunakan oleh file lain
module.exports = publicRouter