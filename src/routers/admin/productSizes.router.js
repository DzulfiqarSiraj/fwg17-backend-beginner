const productSizesRouter = require('express').Router()

const productSizesController = require('../../controllers/admin/productSizes.controller')

productSizesRouter.get('/', productSizesController.getAllProductSizes)
productSizesRouter.get('/:id', productSizesController.getDetailProductSize)
productSizesRouter.post('/', productSizesController.createProductSize)
productSizesRouter.patch('/:id', productSizesController.updateProductSize)
productSizesRouter.delete('/:id', productSizesController.deleteProductSize)

module.exports = productSizesRouter
