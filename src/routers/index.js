const router = require('express').Router()

const authMiddleware = require('../middlewares/auth.middleware')
const roleCheckMiddleWare = require('../middlewares/roleCheck.middleware')


router.use('/admin', authMiddleware, roleCheckMiddleWare('Super Administrator'), require('./admin'))
router.use('/customer', authMiddleware, roleCheckMiddleWare('Customer'), require('./customer'))
router.use('/auth',require('./auth.router'))
router.use('/products',require('./products.router'))

module.exports = router