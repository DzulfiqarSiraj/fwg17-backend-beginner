const productRatingsRouter = require('express').Router()

const productRatingsController = require('../../controllers/admin/productRatings.controller')

productRatingsRouter.get('/', productRatingsController.getAllProductRatings)
productRatingsRouter.get('/:id', productRatingsController.getDetailProductRating)
productRatingsRouter.post('/', productRatingsController.createProductRating)
productRatingsRouter.patch('/:id', productRatingsController.updateProductRating)
productRatingsRouter.delete('/:id', productRatingsController.deleteProductRating)


module.exports = productRatingsRouter