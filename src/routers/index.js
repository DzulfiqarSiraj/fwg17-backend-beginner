const router = require('express').Router()


router.use('/auth',require('./auth.router'))


router.use('/users',require('./users.router'))
router.use('/products',require('./products.router'))
router.use('/product-size',require('./productSize.router'))
router.use('/product-variant',require('./productVariant.router'))
router.use('/tags',require('./tags.router'))
router.use('/product-tags',require('./productTags.router'))
router.use('/product-ratings',require('./productRatings.router'))
router.use('/categories',require('./categories.router'))
router.use('/product-categories',require('./productCategories.router'))
router.use('/promo',require('./promo.router'))
router.use('/orders',require('./orders.router'))
router.use('/order-details',require('./orderDetails.router'))
router.use('/messages',require('./messages.router'))

// Mengekspor router agar dapat digunakan oleh file lain
module.exports = router