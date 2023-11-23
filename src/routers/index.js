const router = require('express').Router()

const authMiddleware = require('../middlewares/auth.middleware')
const roleCheckMiddleWare = require('../middlewares/roleCheck.middleware')


router.use('/auth',require('./auth.router'))
router.use('/admin/', authMiddleware, roleCheckMiddleWare('Super Administrator'), require('./admin'))



module.exports = router