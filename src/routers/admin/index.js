const adminRouter = require('express').Router()

adminRouter.use('/users',require('./users.router'))
adminRouter.use('/variants',require('./variants.router'))
adminRouter.use('/sizes',require('./sizes.router'))
adminRouter.use('/categories',require('./categories.router'))
adminRouter.use('/tags',require('./tags.router'))
adminRouter.use('/promos',require('./promos.router'))
adminRouter.use('/messages',require('./messages.router'))
adminRouter.use('/product-categories',require('./productCategories.router'))
adminRouter.use('/product-sizes',require('./productSizes.router'))
adminRouter.use('/product-variants',require('./productVariants.router'))
adminRouter.use('/product-tags',require('./productTags.router'))
adminRouter.use('/product-ratings',require('./productRatings.router'))
adminRouter.use('/products',require('./products.router'))
adminRouter.use('/orders',require('./orders.router'))
adminRouter.use('/order-details',require('./orderDetails.router'))

module.exports = adminRouter