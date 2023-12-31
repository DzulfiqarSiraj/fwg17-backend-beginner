const router = require('express').Router()

const authMiddleware = require('../middlewares/auth.middleware')
const roleCheckMiddleWare = require('../middlewares/roleCheck.middleware')


router.use('/',require('./public'))
router.use('/auth',require('./auth.router'))
router.use('/admin', authMiddleware, roleCheckMiddleWare('Super Administrator'), require('./admin'))
router.use('/profile', authMiddleware, require('./profile.router'))



module.exports = router