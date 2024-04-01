const customerRouter = require('express').Router()

customerRouter.use('/profile',require('./profile.router'))
customerRouter.use('/orders',require('./orders.router'))
customerRouter.use('/order-details',require('./orderDetails.router'))

module.exports = customerRouter