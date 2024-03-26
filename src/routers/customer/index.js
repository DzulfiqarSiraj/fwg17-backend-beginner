const customerRouter = require('express').Router()

customerRouter.use('/profile',require('./profile.router'))

module.exports = customerRouter