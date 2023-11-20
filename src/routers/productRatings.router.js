const productRatingRouter = require('express').Router()

const productRatingController = require('../controllers/productRatings.controller')

productRatingRouter.get('/', productRatingController.getAllProductRatings)
productRatingRouter.get('/:id', productRatingController.getDetailProductRating)
productRatingRouter.post('/', productRatingController.createProductRating)
productRatingRouter.patch('/:id', productRatingController.updateProductRating)
productRatingRouter.delete('/:id', productRatingController.deleteProductRating)


module.exports = productRatingRouter