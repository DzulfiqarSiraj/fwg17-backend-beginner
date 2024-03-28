const customerRouter = require('express').Router()

customerRouter.use('/profile',require('./profile.router'))
customerRouter.use('/orders',require('./orders.router'))

module.exports = customerRouter