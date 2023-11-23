const router = require('express').Router()

const authMiddleware = require('../middlewares/auth.middleware')


router.use('/auth',require('./auth.router'))
router.use('/admin/', authMiddleware, require('./admin'))


module.exports = router