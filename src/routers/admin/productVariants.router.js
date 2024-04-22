const productVariantsRouter = require('express').Router()

const productVariantsController = require('../../controllers/admin/productVariants.controller')

productVariantsRouter.get('/', productVariantsController.getAllProductVariants)
productVariantsRouter.get('/:id', productVariantsController.getDetailProductVariant)
productVariantsRouter.post('/', productVariantsController.createProductVariant)
productVariantsRouter.patch('/:id', productVariantsController.updateProductVariant)
productVariantsRouter.delete('/:id', productVariantsController.deleteProductVariant)

module.exports = productVariantsRouter
