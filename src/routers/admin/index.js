const adminRouter = require('express').Router()

adminRouter.use('/users',require('./users.router'))
adminRouter.use('/products',require('./products.router'))
adminRouter.use('/product-size',require('./productSize.router'))
adminRouter.use('/product-variant',require('./productVariant.router'))
adminRouter.use('/tags',require('./tags.router'))
adminRouter.use('/product-tags',require('./productTags.router'))
adminRouter.use('/product-ratings',require('./productRatings.router'))
adminRouter.use('/categories',require('./categories.router'))
adminRouter.use('/product-categories',require('./productCategories.router'))
adminRouter.use('/promo',require('./promo.router'))
adminRouter.use('/orders',require('./orders.router'))
adminRouter.use('/order-details',require('./orderDetails.router'))
adminRouter.use('/messages',require('./messages.router'))

// Mengekspor router agar dapat digunakan oleh file lain
module.exports = adminRouter