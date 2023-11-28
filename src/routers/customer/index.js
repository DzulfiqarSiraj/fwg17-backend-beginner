const customerRouter = require('express').Router()

customerRouter.use('/orders',require('./orders.router'))



// Mengekspor router agar dapat digunakan oleh file lain
module.exports = customerRouter